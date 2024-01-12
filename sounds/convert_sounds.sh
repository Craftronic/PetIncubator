#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for ffmpeg
if ! command_exists ffmpeg; then
    echo "ffmpeg is not installed. Please install it using Homebrew:"
    echo "brew install ffmpeg"
    exit 1
fi

# Check for xxd
if ! command_exists xxd; then
    echo "xxd is not installed."
    exit 1
fi

# Function to convert WAV to RAW, then to a C-style hex array in a header file
convert_to_header() {
    local wav_file=$1
    local raw_file="${wav_file%.*}.raw"
    local filename=$(basename "${wav_file%.*}")
    local header_file="${header_dir}/${filename}.h"

    # Convert WAV to RAW
    ffmpeg -loglevel error -i "$wav_file" -ac 1 -ar 16000 -f s16le "$raw_file"

    # Convert RAW to a C-style hex array and save as a header file
    xxd -i "$raw_file" > "$header_file"

    # Delete the raw file
    rm "$raw_file"
}

# Directory paths
wav_dir="wav"
header_dir="headers"

# Create header directory if it doesn't exist
mkdir -p "$header_dir"

# Process each audio file
for file_type in wav mp3; do
    for audio_file in "$wav_dir"/*.$file_type; do
        # Skip if no audio files are found
        [[ -e "$audio_file" ]] || continue

        echo "Processing: $audio_file"
        convert_to_header "$audio_file"
    done
done

echo "All conversions complete."
