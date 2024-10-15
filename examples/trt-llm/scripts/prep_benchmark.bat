@echo off


:: Check for spaces in the current directory
echo Checking for spaces in the current directory...
echo "%~f0" | findstr " " > nul && (
    echo This script cannot be run from a directory with spaces.
    goto end
)

:: Continue with the rest of your script
echo No spaces found in the current directory.
:end


:: Configuration
set CONDA_ENV_NAME=trtllm10
set TENSORRT_LLM_PATH=%CD%\TensorRT-LLM
set LLAMA_DIR=%TENSORRT_LLM_PATH%\llama2-7b

:: Activate the environment




:: Create TENSORRT_LLM_PATH and LLAMA_DIR
if not exist "%TENSORRT_LLM_PATH%" mkdir "%TENSORRT_LLM_PATH%"
if not exist "%LLAMA_DIR%" mkdir "%LLAMA_DIR%"

:: Download LLaMA model and configuration into LAMA_DIR
cd "%LLAMA_DIR%"
echo Downloading LLaMA model...
curl -L "https://api.ngc.nvidia.com/v2/models/org/nvidia/llama2-7b/1.2/files?redirect=true&path=rank0.safetensors" > rank0.safetensors

echo Downloading LLaMA configuration...
curl -L "https://api.ngc.nvidia.com/v2/models/org/nvidia/llama2-7b/1.2/files?redirect=true&path=config.json" > config.json

echo Downloading LLaMa Tokenizer..
curl -L "https://api.ngc.nvidia.com/v2/models/org/nvidia/llama2-7b/1.2/files?redirect=true&path=llama2-7b-hf-tokenizer/tokenizer.json" > tokenizer.json

curl -L "https://api.ngc.nvidia.com/v2/models/org/nvidia/llama2-7b/1.2/files?redirect=true&path=llama2-7b-hf-tokenizer/tokenizer.model" > tokenizer.model
curl -L "https://api.ngc.nvidia.com/v2/models/org/nvidia/llama2-7b/1.2/files?redirect=true&path=llama2-7b-hf-tokenizer/tokenizer_config.json" > tokenizer_config.json

cd "%TENSORRT_LLM_PATH%\.."

echo Activating environment '%CONDA_ENV_NAME%'...
call %CD%\Miniconda\Scripts\activate %CONDA_ENV_NAME%

:: Install pre-reqs
pip install pydantic pynvml
cd "%TENSORRT_LLM_PATH%"

:: build engine 
trtllm-build --checkpoint_dir llama2-7b --output_dir engine --gemm_plugin float16 --max_input_len 2048 --max_batch_size 8 --max_output_len 512 --strongly_typed

cd ..

:end
echo Script completed. Press any key to continue using this environment, or close this shell.
pause > nul
