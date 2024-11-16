
# RTX-AI-Toolkit Examples

  

This directory contains a variety of scripts and other resources to help developers deploy AI workflows on NVIDIA hardware running Windows. The technologies covered in these resources include ONNXRuntime-GenAI and TensorRT-LLM, and will expand to cover other projects in the future.

### node-llama-cpp-app
This subfolder contains source code for an example electron app built using TypeScript and [`node-llama-cpp`](https://github.com/withcatai/node-llama-cpp). It is showcases how to run inference on a large language model (LLM) running locally on your RTX PC through `node-llama-cpp's` prebuilt CUDA support for your NVIDIA GPUs. It also demonstrates how to integrate tool/function calling support in your LLM app.

### onnxruntime-genai

This subfolder contains resources for using the [ONNXRuntime-GenAI project](https://github.com/microsoft/onnxruntime-genai), a framework for deploying generative models using ONNXRuntime.

 - **ort-genai-dml-python.ipynb**: A introductory notebook for understanding and getting started with running ONNXRuntime-GenAI workflows on your DirectML-supported device.

### trt-llm

This subfolder contains resources for using [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM?tab=readme-ov-file#tensorrt-llm-overview), NVIDIA's library for high-performance LLM GPU inference, on Windows.

 - **scripts/**: This subfolder contains three batch scripts for quickly installing and benchmarking the Llama2-7B model with TensorRT-LLM: `setup.bat`, `prep_benchmark.bat`, and `run_benchmark.bat`. **If at any point a script is interrupted or errors occur, remove all folders created in the `scripts/` directory and re-run the scripts in order.** A quick description of each script:
	 - `setup.bat` requires approximately 10 GB and 15 minutes to complete, and performs four actions:
		 - **Environment Setup**: Installs Miniconda and sets up a new Conda environment with a specific Python version, without altering the system PATH or default Python installation.
		- **Dependencies Installation**: Installs CUDA Toolkit for GPU support and Git for version control within the Conda environment.
		- **TRT-LLM Python Package Installation**: Installs the TensorRT-LLM package.
		- **Repository Setup**: Clones the [TensorRT-LLM GitHub repository](https://github.com/NVIDIA/TensorRT-LLM), which contains scripts for building TRT engines for LLMs like Llama.
	- `prep_benchmark.bat` performs two important actions:
		- Downloads the [Llama2-7B model](https://catalog.ngc.nvidia.com/orgs/nvidia/models/llama2-7b) from NGC.
		- Generates a TensorRT-LLM engine specifically fit for the RTX GPU in the current system.
	- `run_benchmark.bat` will run an input through the new TensorRT-LLM engine and output a series of metrics. It has three arguments:
		- `--input_len`: Length of input sequence, defaults to 100.
		- `--output_len` Length of output sequence, defaults to 10.
		- `--batch_size` Batch size, defaults to 8.   
		
		The output of the benchmark will be a comma-seperated list representing:
		
		**`model_name, world_size, num_heads, num_kv_heads, num_layers, hidden_size, vocab_size, precision, batch_size, gpu_weights_percent, input_length, output_length, gpu_peak_mem(gb), build_time(s), tokens_per_sec, percentile95(ms), percentile99(ms), latency(ms), compute_cap, quantization, generation_time(ms), total_generated_tokens, generation_tokens_per_second`**

