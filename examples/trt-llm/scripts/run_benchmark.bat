@echo off

setlocal parse_args

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

:: Initialize default values for input_len and output_len
set INPUT_LEN=100
set OUTPUT_LEN=100
set BATCH_SIZE=8

:: Parse command-line arguments
:parse_args
if "%1"=="" goto end_parse_args
if "%1"=="--input_len" set "TEMP=%2" & call set "INPUT_LEN=%%TEMP: =%%" & shift & shift & goto parse_args
if "%1"=="--output_len" set "TEMP=%2" & call set "OUTPUT_LEN=%%TEMP: =%%" & shift & shift & goto parse_args
if "%1"=="--batch_size" set "TEMP=%2" & call set "BATCH_SIZE=%%TEMP: =%%" & shift & shift & goto parse_args
shift
goto parse_args
:end_parse_args

:: Combine input_len and output_len into one variable
set INPUT_OUTPUT_LEN=%INPUT_LEN%,%OUTPUT_LEN%

echo %INPUT_OUTPUT_LEN%

:: Activate the environment
echo Activating environment '%CONDA_ENV_NAME%'...
call %CD%\Miniconda\Scripts\activate %CONDA_ENV_NAME%



cd "%TENSORRT_LLM_PATH%"

echo Running benchmark

python benchmarks\python\benchmark.py --engine_dir engine --mode plugin -m llama_7b --dtype float16 --log_level info --batch_size %BATCH_SIZE% --input_output_len %INPUT_OUTPUT_LEN% --num_beams 1 --warm_up 2 --num_runs 3 --duration 10 --csv
