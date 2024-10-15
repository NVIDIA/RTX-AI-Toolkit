@echo off

:: Check for spaces in the current directory
echo Checking for spaces in the current directory...
echo "%CD%" | findstr " " > nul && (
    echo This script cannot be run from a directory with spaces.
    goto end
)

:: Continue with the rest of your script
echo No spaces found in the current directory.
:end


:: Configuration
set MINICONDA_INSTALLER=Miniconda3-latest-Windows-x86_64.exe
set MINICONDA_URL=https://repo.anaconda.com/miniconda/%MINICONDA_INSTALLER%
set CONDA_ENV_NAME=trtllm10
set PYTHON_VERSION=3.10
set REPO_URL=https://github.com/NVIDIA/TensorRT-LLM.git
set BRANCH=v0.10.0
set REPO_DIR=%CD%\TensorRT-LLM

:: Download Miniconda
echo Downloading Miniconda...
curl -L %MINICONDA_URL% -o %MINICONDA_INSTALLER%

:: Install Miniconda without adding to PATH
echo Installing Miniconda...
start /wait "" %MINICONDA_INSTALLER% /AddToPath=0 /RegisterPython=0 /S /D=%CD%\Miniconda

echo miniconda installed
:: Initialize conda for cmd.exe shell
:: call %CD%\Miniconda\Scripts\activate.bat

echo miniconda initialized
:: Update conda
:: call %CD%\Miniconda\Scripts\conda.exe update -n base -c defaults conda -y

:: conda deactivate

:: Create a new conda environment with Python 3.10
echo Creating conda environment '%CONDA_ENV_NAME%' with Python %PYTHON_VERSION%...
call %CD%\Miniconda\Scripts\conda.exe create -n %CONDA_ENV_NAME% python=%PYTHON_VERSION% -y

:: Install CUDA Toolkit 12.4 in the environment
echo Installing CUDA Toolkit 12.4 in environment '%CONDA_ENV_NAME%'...
call %CD%\Miniconda\Scripts\conda.exe install -n %CONDA_ENV_NAME% -c "nvidia/label/cuda-12.4.0" cuda-toolkit -y
echo Install Git 
call %CD%\Miniconda\Scripts\conda.exe install -n %CONDA_ENV_NAME% git -y
:: Activate the environment
call %CD%\Miniconda\Scripts\activate %CONDA_ENV_NAME%



:: Clean up the installer
del %MINICONDA_INSTALLER%
python -m pip install --upgrade pip
pip install tensorrt_llm==0.10.0 --extra-index-url https://pypi.nvidia.com
echo TensorRT-LLM Installed



set REPO_URL=https://github.com/NVIDIA/TensorRT-LLM.git
set REPO_DIR=%CD%\TensorRT-LLM
echo Cloning TRT-LLM repo
git clone -b v0.10.0 %REPO_URL% "%REPO_DIR%"
:: Clone the TensorRT-LLM repository


echo Installation and setup completed. Close this Command Prompt window.

:end
pause
