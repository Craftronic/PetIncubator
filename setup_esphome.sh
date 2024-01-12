#!/bin/bash

# Check if venv exists, if not create it
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate the venv
source venv/bin/activate

# Check if requirements.txt exists, if so install requirements
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi