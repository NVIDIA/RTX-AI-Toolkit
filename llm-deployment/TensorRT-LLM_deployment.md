
## TensorRT-LLM on Windows Deployment

TensorRT-LLM is NVIDIA's

To deploy a quantized model using TensorRT-LLM, first need to quantize the model using NVIDIA's TensorRT Model Optimizer 

### 0. Pre-requisites
Install TensorRT-LLM for Windows by following the instructions [here](https://github.com/NVIDIA/TensorRT-LLM/tree/v0.10.0/windows). 

We offer Windows batch scripts to quickly setup a conda-based TensorRT-LLM development environment. These scripts enable 


```bash
trtllm-build --checkpoint_dir ./tllm_checkpoint_1gpu_awq_int8_kv_cache \
            --output_dir ./tmp/llama/7B/trt_engines/int8_kv_cache_int4_AWQ/1-gpu/ \
            --gemm_plugin float16 \
            --strongly_typed
 ```