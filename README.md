# NVIDIA RTX AI Toolkit



## Description
The NVIDIA RTX™ AI Toolkit is a suite of tools for Windows application developers to accelerate model customization, optimization, and deployment of AI models into applications running on Windows PC for RTX — across both cloud and PC. The Toolkit supports two primary workflows for model development and application deployment.



## Latest News
Follow the RTX AI Toolkit fine-tuning workflow with this tutorial - [LLaMaA3-8B QLoRA](tutorial-llama3-finetune.md)

[NVIDIA RTX AI Toolkit Launch Blog](NeedLink)

## Getting Started
NVIDIA RTX AI Toolkit includes 2 primary phases: Model Development and Application Deployment. Each phase is tailored to guide you through the necessary steps to effectively customize and deploy your AI models. 

Currently, we support an end-to-end workflow for customizing LLMs using PEFT (Parameter Efficient Fine-Tuning) techniques such as LoRA and(Low-Rank Adaptation of Large Language Models) and QLoRA on your RTX PC and deploying using NVIDIA TensorRT-LLM, ONNX-Runtime, llama.cpp, or as NIM endpoints in the cloud.

### 1. Model Development Phase - [TUTORIAL](tutorial-llama3-finetune.md): 
This portion of the workflow involves customizing and optimizing AI models for your particular use-case. This workflow can be accessed via NVIDIA AI Workbench, a tool for organizing and running model training, tuning, and optimization projects both on local RTX GPUs and in the cloud. NVIDIA AI Workbench streamlines dependency management, and offers a WSL-based container environment that is lightweight and easy-to-use for AI model development and deployment on Windows. To learn more about NVIDIA AI Workbench and to download it please visit [here](https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/workbench/).
            
1. #### Model Customization 
    ##### QLoRA Techniques on Windows RTX PCs:
    For fine-tuning Large Language Models (LLMs) on RTX PCs, we have integrated the popular [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) as an AI Workbench project. LLaMa-Factory provides a user-friendly graphical interface (GUI) that simplifies the model tuning process, making it accessible even to those new to AI development. Our AI Workbench project enables rapid deployment of LLaMA-Factory on Windows PCs with an RTX GPU simplifying dependency management.

    Get started with the AI Workbench Project for QLoRA customization on Windows RTX PCs [here](Need Link).

    ##### Full-Suite of Model Customization Techniques on Datacenter GPUs:
    For fine-tuning on large models or large datasets, [NVIDIA NeMo](https://github.com/NVIDIA/NeMo) provides a scalable framework for customizing Large Language Models (LLMs).

    Get started and learn more about NVIDIA NeMo [here](https://www.nvidia.com/en-us/ai-data-science/products/nemo/).
    For technical documentation, please see the [NeMo Framework User Guide](https://docs.nvidia.com/nemo-framework/user-guide/latest/playbooks/index.html).



2. #### Model Optimization
    ##### Model Quantization
    One of the primary challenges developers face is with limited memory and compute resources for running AI models on PCs. Developers need to ensure that models can fit efficiently within the VRAM of a PC system, while not sacrificing on performance. To help address this challenge, model quantization can help. The NVIDIA TensorRT Model Optimizer (referred to as Model Optimizer, or ModelOpt) is a library comprising state-of-the-art model optimization techniques including quantization. 

    Get started with the AI Workbench Project for model optimization on Windows RTX PCs [here](Need Link).

    For technical documentation, and to learn more about Model Optimizer click [here](https://github.com/NVIDIA/TensorRT-Model-Optimizer).


### 2. Application Deployment Phase
There are two paths to deploy AI models: On device, or in cloud. Models deployed to device can achieve lower latency and don't require calls to the cloud at runtime, but have certain hardware requirements. Models deployed to the cloud can support an application running on any hardware, but have an ongoing operating cost. Different applications will do either, or both. The RTX AI Toolkit provides tools for both paths. Primarily, both workflows can be accessed and orchestrated via [NVIDIA AI Inference Manager (AIM) SDK](NeedLink). 

AIM SDK offers developers a unified interface to orchestrate deployment of AI models across devices using multiple inference backends -  from cloud to local PC execution environments. This is currently available to certain early access customers, [apply now](NeedLink) to get access.


#### Windows RTX PC On-Device Deployments
The RTX AI Toolkit includes several additional paths to deploy on RTX PCs.

1. ##### Deploy using TensorRT-LLM
    NVIDIA TensorRT-LLM offers the latest features and optimizations offering best performance on NVIDIA native bare-metal Windows for single-GPU inference. Currently, GeForce 40-series GPUs are supported. 

    The release wheel for Windows can be installed with pip. Alternatively, you can build TensorRT-LLM for Windows from the source. Building from the source is an advanced option and is not necessary for building or running LLM engines. It is, however, required if you plan to use the C++ runtime directly or run C++ benchmarks.

    Get started with TensorRT-LLM for Windows [here](NeedLink).

2. ##### Deploy using ONNX-Runtime and DirectML
    ONNX-Runtime with the DirectML execution path offers a Windows-only implementation, with cross-vendor support alongside minimal code changes. This execution path offers an easy path into the Windows ecosystem with stability and production-grade support.

    Get started with deploying via ONNX-Runtime and DirectML [here](NeedLink).


#### Cloud Deployments
NVIDIA NIMs - NIMs are prebuilt containers for cloud microservice deployment that makes it easy for developers to stand up a cloud-based inference server. RTX AI Toolkit provides the tools to package an optimized model with its dependencies, upload to a staging server, and then launch a NIM, which will pull in the optimized model and create an endpoint for applications to call. Get started with your NIM journey [here](https://build.nvidia.com/explore/discover).


## Reference Projects
1. [AI Workbench Projects for Model Development Phase](NeedLink)
2. [ChatRTX - Reference Technical Demo App](NeedLink)
3. [OpenAI Compatible Web Server](https://github.com/NVIDIA/trt-llm-as-openai-windows)
4. [Projects built by the community](https://www.nvidia.com/en-us/ai-data-science/generative-ai/rtx-developer-contest/winners/)

## Support Matrix
 ### Foundation Models
 We currently offer performance optimized support for the following foundation models natively on Windows RTX PCs:
 | Model  | Link | Inference Backend|
 | :---   |:---   | :---   |
 | Gemma-2B-INT4-RTX | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/resources/gemma-2b-int4-rtx) | TensorRT-LLM |
 | Gemma-2B-FP16-RTX | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/resources/gemma-2b-fp16-rtx) | TensorRT-LLM |
 | Gemma-7B-INT4-RTX | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/llama/resources/gemma-7b-int4-rtx) | TensorRT-LLM |
 | CodeGemma-7B-IT-INT4-RTX | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/resources/codegemma7bitint4) | TensorRT-LLM |
 | Llama2-13b Chat Int4 | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/llama/models/llama2-13b) | TensorRT-LLM |
 | LlaMa2-7B Chat Int4 | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/models/llama2-7b) | TensorRT-LLM |
 | Code Llama 13B | [link](https://catalog.ngc.nvidia.com/orgs/nvidia/models/code_llama) | TensorRT-LLM |
 | Mistral-7B Chat Int4| [link](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/llama/models/mistral-7b-int4-chat) | TensorRT-LLM |

You may also choose to bring your own custom model into the workflow. Currently, any HuggingFace checkpoint that can fit within the VRAM of an RTX GPU is supported.

Need a support matrix.

## Performance & Benchmarks
Need perf & benchmarks here.

## Support
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.


## License
For open source projects, say how it is licensed.