# Pet Incubator: A Comprehensive DIY Solution for Small Animals

Welcome to the **Pet Incubator** project repository. This open-source initiative is dedicated to the development and refinement of a DIY incubator suitable for a variety of small animals, including cats, dogs, and other mammals.

## Features:
- **Temperature Regulation**: Utilizes a PID thermostat for precise temperature control within +/- 0.1°C.
- **Humidity Control**: Features a PID humidistat to maintain optimal environmental conditions.
- **CO2 Monitoring**: Equipped with a CO2 meter to ensure a safe atmosphere for the animals.
- **Visibility**: Clear plexiglass design for easy monitoring.
- **Safety Alerts**: Automated alerts for any critical changes in environmental conditions.
- **Multi-Interface Control**: Manage settings via an on-device screen, web GUI, or Home Assistant integration.
- **WiFi Capability**: Includes ESP32 for WiFi connectivity and remote monitoring.

The repository includes detailed build instructions, firmware code (ESPHome-based), and a list of necessary components. Contributions, suggestions, and feedback from the community are highly encouraged to enhance this project.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Python 3
- ESPHome
- Any additional tools or libraries listed in `requirements.txt`.

### Setting Up Your Development Environment
1. **Clone the Repository**:
   - Use `git clone` to clone this repository to your local machine.

2. **Initialize Virtual Environment**:
   - Navigate to the project directory.
   - Create a virtual environment by running `python -m venv venv`.
   - Activate the virtual environment:
     - Windows: `venv\Scripts\activate`
     - Unix/MacOS: `source venv/bin/activate`

3. **Install Dependencies**:
   - Install required Python packages with `pip install -r requirements.txt`.

### Using the Repository
- The `/src` folder contains the main source files for the project.
- Inside `/src/test_configs`, you'll find individual test configurations for various components. Use these to test each part before assembly.
- The `final_config.yaml` file in `/src` is the complete configuration for the Pet Incubator.

## Contributing
We welcome contributions and suggestions to improve this project. Please feel free to fork the repository, make changes, and submit pull requests. For major changes or new feature suggestions, please open an issue first to discuss your ideas.

## License
This project is licensed under the [LICENSE] - see the LICENSE file for details.
