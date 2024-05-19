
## RTX AI Toolkit LLM Fine-tuning Tutorial  

Welcome to the RTX AI Toolkit LLM Fine-tuning Tutorial. In this tutorial, you'll learn how to use the LLaMA-Factory Workbench project to fine-tune the LLaMa3-8B model on a RTX Windows PC. First, we showcase the QLoRA technique for model customization and explain how to export the LoRA adapter or the fine-tuned LLaMa3 checkpoint.

### Prerequisites 
1. Ensure you have a Windows PC equipped with an RTX GPU, ideally with at least 16GB of VRAM (GeForce RTX 4070Ti or higher). 
2. Download and install **[NVIDIA AI Workbench](https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/workbench/)** for local AI development.


### Setup LLaMa-Factory Workbench Project

1. Start AI Workbench on your Windows PC and select 'Clone Project'. Proceed to clone the LLaMa-Factory Workbench project using this GitHub URL: [https://github.com/kedarpotdar-nv/workbench-llamafactory](https://github.com/kedarpotdar-nv/workbench-llamafactory)

<img src="media/2.png" width="600">

Wait for project to clone.

2. After the project is downloaded, Workbench will start building the project on your PC. This step may take 10-15 minutes depending on your network speed. 

<img src="media/build.png" width="600">

3. After the build is complete, 

>[!TIP]
>Workbench downloads a distro and starts a container and mounts the /project/ dir
Make sure all paths start with /project as they will be accessible via your Windows env




## Training Llama3-8B with pre-configured datasets

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