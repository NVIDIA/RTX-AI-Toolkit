# RTX AI Toolkit

RTX AI Toolkit provides a seamless developer workflow designed for fine-tuning AI models, including Large Language Models (LLMs), directly on your local Windows RTX PC. This streamlined process supports not only local deployment but also the ability to deploy as cloud endpoints, offering flexibility and scalability to meet diverse deployment needs.

<illustration>

### Workflow Overview

The RTX AI Toolkit workflow is structured into two main phases: the Model Building Phase and the Deployment Phase. Each phase is tailored to guide you through the necessary steps to effectively fine-tune and deploy your AI models.

Currently, we support an end-to-end workflow for fine-tuning LLMs using PEFT (Parameter Efficient Fine-Tuning) techniques such as LoRA and(Low-Rank Adaptation of Large Language Models) and QLoRA on your RTX PC and deploying using NVIDIA AI Inference Manager (NvAIM) SDK, ONNX-Runtime, or as NIM endpoints in the cloud.



## Getting started


### 1. Model Building Phase

#### NVIDIA AI Workbench 
RTX AI Toolkit leverages NVIDIA AI Workbench to streamline dependency management. AI Workbench offers a WSL-based container environment that is lightweight and easy to use, significantly enhancing the setup process for AI model development and deployment.

To learn more about NVIDIA AI Workbench Desktop and to download it, please visit [here](https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/workbench/).

#### LLaMA-Factory Project
For fine-tuning Large Language Models (LLMs), we have integrated the popular [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) as an AI Workbench project. LLaMa-Factory provides a user-friendly graphical interface (GUI) that simplifies the model tuning process, making it accessible even to those new to AI development. Our Workbnench project enables rapid deployment of LLaMA-Factory on Windows PCs with an RTX GPU simplifying dependency management.

Get started with LlamaFactory on your RTX PC today by visiting here.

### 2. Model Deployment Phase
Models fine-tuned using RTX AI Toolkit can be deployed using multiple options: 
<ul>TensorRT-LLM</ul>

#### NVIDIA AI Workbench 
RTX AI Toolkit leverages NVI

## Sample Workflow



