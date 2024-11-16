from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import tempfile
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MassSpectrumData(BaseModel):
    # Define the fields based on the mass spectrum results file structure
    data: str  # Replace with actual fields




def process_mass_spectrum(filepath: str) -> list[str]:
    HOST_USER = "your_username"       # Replace with your host username
    HOST_ADDRESS = "your_host_ip"     # Replace with your host's IP address
    SCRIPT_PATH = "/path/to/your/script.py"  # Absolute path on the host machine
    CONDA_ENV_NAME = "your_conda_env" # Replace with your conda environment name
    CONDA_BASE_PATH = "/path/to/conda"  # Base path of conda installation on host

    # Map container file path to host file path
    container_shared_dir = "/app/shared_directory"
    host_shared_dir = "/path/to/shared_directory"
    host_filepath = filepath.replace(container_shared_dir, host_shared_dir)

    try:
        # Construct the SSH command
        ssh_command = f"""
        ssh -o StrictHostKeyChecking=no {HOST_USER}@{HOST_ADDRESS} << 'ENDSSH'
        source {CONDA_BASE_PATH}/bin/activate {CONDA_ENV_NAME}
        python {SCRIPT_PATH} {host_filepath}
        ENDSSH
        """

        # Execute the SSH command
        result = subprocess.run(
            ssh_command,
            shell=True,
            capture_output=True,
            text=True,
            check=True
        )

        # Parse the output
        output = result.stdout.strip()
        # Assuming the script returns JSON output
        return json.loads(output)

    except subprocess.CalledProcessError as e:
        # Handle errors
        return {"error": f"Script failed with error: {e.stderr.strip()}"}
    


@app.get("/")
def root():
    return {"message": "Hello world!"}

@app.post("/analyse")
def analyse(data: MassSpectrumData):
    with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix=".txt") as temp_file:
        temp_file.write(data.data)
        temp_file_path = temp_file.name

    results = process_mass_spectrum(temp_file_path)
    return results