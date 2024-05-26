

## vLLM Deployment

vLLM provides an HTTP server that implements OpenAI’s Completions and Chat API.

In this guide, we will see how to deploy a vLLM OpenAI-compatible microservice.

### 0. Pre-requisites

A Linux instance with NVIDIA GPU and nvidia-container-toolkit:

<pre>
docker pull vllm/vllm-openai
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

    docker run -it --rm --gpus all -v /mnt/c/Users/kedar/Downloads/llama.cpp/codealpaca-merged:/model -p 8000:8000 --env "TRANSFORMERS_OFFLINE=1" --env "HUGGING_FACE_HUB_TOKEN=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" --env "HF_DATASET_OFFLINE=1" --ipc=host vllm/vllm-openai:latest --model="/model"
</pre>

