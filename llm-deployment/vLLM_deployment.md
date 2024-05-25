

## vLLM Deployment

vLLM provides an HTTP server that implements OpenAI’s Completions and Chat API.

In this guide, we will see how to deploy a vLLM OpenAI-compatible microservice.

### 0. Pre-requisites

A Linux instance with NVIDIA GPU and nvidia-container-toolkit:

<pre>
git clone https://github.com/vllm-project/vllm
</pre>

### 1. Pull vLLM-OpenAI Docker 

<>
See all supported models [here](https://docs.vllm.ai/en/latest/models/supported_models.html).


### 2. Deploy microservice

<pre>
docker run --runtime nvidia --gpus all \
    -v ~/.cache/huggingface:/root/.cache/huggingface \
    --env "HUGGING_FACE_HUB_TOKEN=<secret>" \
    -p 8000:8000 \
    --ipc=host \
    vllm/vllm-openai:latest \
    --model mistralai/Mistral-7B-v0.1
</pre>

