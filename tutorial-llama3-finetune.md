
## RTX AI Toolkit LLM Fine-tuning Tutorial  

Welcome to the RTX AI Toolkit LLM Fine-tuning Tutorial. In this tutorial, you'll learn how to use the LLaMA-Factory Workbench project to fine-tune the LLaMa3-8B model on a RTX Windows PC. First, we showcase the QLoRA technique for model customization and explain how to export the LoRA adapter or the fine-tuned LLaMa3 checkpoint.

### Prerequisites 
1. Ensure you have a Windows PC equipped with an RTX GPU, ideally with at least 16GB of VRAM (GeForce RTX 4070Ti or higher). 
2. Download and install **[NVIDIA AI Workbench](https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/workbench/)** for local AI development.


### Setup LLaMa-Factory Workbench Project

1. Start AI Workbench on your Windows PC and select 'Clone Project'. Proceed to clone the LLaMa-Factory Workbench project using this GitHub URL: [https://github.com/kedarpotdar-nv/workbench-llamafactory](https://github.com/kedarpotdar-nv/workbench-llamafactory)

<img src="media/2.png" width="600">

2. After the repo is downloaded, Workbench will start building the project on your PC. This step may take 10-15 minutes depending on your network speed. 

<img src="media/build.png" width="600">

3. After the build is complete, your Workbench project is ready for use.

>[!TIP]
> NVIDIA AI Workbench sets up a WSL2 distro (titled NVIDIA-Workbench) on your Windows PC and builds a Docker/podman container for each project. By default, the local project workspace is mounted at /project/ inside the container and its contents are visible in the Workbench GUI's File Browser. The directories visible in the Workbench project such as 'data', are paths inside the containers as '/project/data'. 
Make sure all paths start with /project as they will be accessible via your Windows env


### Using LLaMa-Factory for fine-tuning Llama3-8B with pre-configured datasets

1. Start the LLaMa-Factory app from Workbench GUI. This should open up the LLaMa-Factory GUI in your web browser.

In the Model Name dropdown, select 'LLaMA3-8B-Chat' as our model to fine-tune.
Ensure that the finetuning method is set to 'lora'. Leave the adapter path empty for now.

Expand the 'Advanced Configuration' section and set the 'Quantization bit' dropdown to '4' as we are performing QLoRA finetuning. 

Note: Unsloth is not supported in this release 


Next, in the 'train' tab, let's select the dataset and training parameters. 

Model export options:

The project enables two forms of model export:

LoRA adapter export
Merged checkpoint export

Depends

## Deployment




## Appendix: Importing custom data