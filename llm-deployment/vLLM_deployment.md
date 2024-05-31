

## vLLM Deployment

[vLLM](https://github.com/vllm-project/vllm) is an open-source library for LLM inference and serving, accelerated on NVIDIA GPUs using optimized CUDA kernels. It includes an OpenAI-compatible API server, enabling you to set up a web server for deploying your customized LLM. This allows you to use frameworks and libraries built for the OpenAI API specification, often with little to no code changes.

vLLM supports several models, including Llama, Mistral, Phi-3, and Gemma. See full list [here](https://docs.vllm.ai/en/latest/models/supported_models.html).

In this guide, we will demonstrate how to deploy a vLLM OpenAI-compatible API microservice using the merged checkpoint generated from the Workbench-LLaMa-Factory project. To achieve this, we will use the `vllm-openai` Docker container for rapid deployment with customized Hugging Face (HF) checkpoints.

### 0. Pre-requisites

- A Linux node with a [compatible NVIDIA GPU](https://docs.vllm.ai/en/latest/getting_started/installation.html). 
- Install [Docker](https://github.com/docker/docker-install) and [nvidia-container-toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html):


### 1. Pull vLLM-OpenAI Docker 

<pre>
docker pull vllm/vllm-openai
</pre>

### 2. Deploy microservice

Copy the merged HF checkpoint from the AI Workbench-LlamaFactory tutorial to your Linux host at a location that can be mounted in your Docker container. For example, you can use the directory `/home/nvidia/codealpaca`.

Then, run the following Docker command:

<pre>
    docker run --rm --gpus all -v <local-merged-ckpt-dir>:/model -p 8000:8000 --env "TRANSFORMERS_OFFLINE=1" --env "HF_DATASET_OFFLINE=1" --name vllm-openai --ipc=host vllm/vllm-openai:latest --model="/model"
</pre>

For example, in our case:
<pre>
    docker run --rm --gpus all -v /home/nvidia/codealpaca-merged:/model -p 8000:8000 --env "TRANSFORMERS_OFFLINE=1" --env "HF_DATASET_OFFLINE=1" --name vllm-openai --ipc=host vllm/vllm-openai:latest --model="/model"
</pre>

This starts the vLLM OpenAI web server on the Linux host and starts the inference server on port 8000. 

> You can also start the docker in a detached mode by using the `-d` flag in the `docker run` command to run the container in the background.
Check the status of the container by running the `docker ps` command and detailed logs can be accessed using `docker logs vllm-openai`.

### 2. Test inference

Note the IP address of your host with the vLLM OpenAI server and connect to the inference server using the OpenAI-Python library, either on the same host or remotely. We pass the IP address and port as the base_url for the OpenAI Python client to use.

<pre>
from openai import OpenAI

# create an openAI client with a random API key and the vLLM server base URL.
client = OpenAI(
    api_key="test",
    base_url="http://vllm-host-ip:8000/v1",
)

completion = client.completions.create(
    model="/model",
    prompt="Q: What does the cat say?.\n A:",
    echo=False,
    stream=False)

print(completion)

</pre>


### 3. Serving LoRA adapters

vLLM also lets you use LoRA adapters trained using the RTX AI Toolkit on top of the base model without merging weights. Follow this tutorial for more - ['Using LoRA adapters'](https://docs.vllm.ai/en/latest/models/lora.html).