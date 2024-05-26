
## TensorRT-LLM on Windows Deployment

### 0. Pre-requisites



trtllm-build --checkpoint_dir ./tllm_checkpoint_1gpu_awq_int8_kv_cache \
            --output_dir ./tmp/llama/7B/trt_engines/int8_kv_cache_int4_AWQ/1-gpu/ \
            --gemm_plugin float16 \
            --strongly_typed
 