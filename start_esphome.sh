#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 [<folder_name>]"
    echo "This script activates a Python virtual environment and runs the ESPHome dashboard."
    echo "You can optionally provide a folder name as an argument or select from a list."
}

# Check if the venv directory exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Please run setup_esphome.sh first."
    exit 1
fi

# Function to clean up and exit when Ctrl+C is pressed
cleanup() {
    echo "Caught interrupt signal. Exiting Esphome..."
    # Kill the ESPHome process
    kill $ESP_PID
    exit 0
}

# Activate the virtual environment
source venv/bin/activate

# Change to the src directory where ESPHome configurations are stored
cd src

# Check if port 6052 is already in use
if lsof -i:6052; then
    echo "Error: Port 6052 is already in use. There may already be an ESPHome instance running."
    exit 1
fi

if [ $# -eq 0 ]; then
    # List the directories and prompt the user to select one
    echo "Please select an ESPHome project to launch:"
    select dir in */; do
        if [ -n "$dir" ]; then
            FOLDER_NAME="$dir"
            break
        else
            echo "Invalid selection. Please try again."
        fi
    done
else
    # Use the provided folder name
    FOLDER_NAME=$1
    if [ ! -d "$FOLDER_NAME" ]; then
        echo "Error: Directory '$FOLDER_NAME' does not exist."
        exit 1
    fi
fi

# Set trap to handle Ctrl+C
trap 'cleanup' SIGINT

# Run ESPHome dashboard in the background and store its process ID
esphome dashboard "$FOLDER_NAME" &
ESP_PID=$!

# Wait for a few seconds to ensure the server starts
sleep 2

# Open the default browser at the ESPHome dashboard URL
open http://0.0.0.0:6052

# Wait for the ESPHome process to end
wait $ESP_PID