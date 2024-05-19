
## RTX AI Toolkit LLM Fine-tuning Tutorial  

Welcome to the RTX AI Toolkit LLM Fine-tuning Tutorial. In this tutorial, you'll learn how to use the LLaMA-Factory Workbench project to fine-tune the LLaMa3-8B model on a RTX Windows PC. First, we showcase the QLoRA technique for model customization and explain how to export the LoRA adapter or the fine-tuned LLaMa3 checkpoint.

### Prerequisites 
1. Ensure you have a Windows PC equipped with an RTX GPU, ideally with at least 16GB of VRAM (GeForce RTX 4070Ti or higher). 
2. Download and install **[NVIDIA AI Workbench](https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/workbench/)** for local AI development.
3. Generate a HuggingFace [User Access Token](https://huggingface.co/docs/hub/en/security-tokens).


### Setup LLaMa-Factory Workbench Project

1. Start AI Workbench on your Windows PC and select 'Clone Project'. Proceed to clone the LLaMa-Factory Workbench project using this GitHub URL: [https://github.com/kedarpotdar-nv/workbench-llamafactory](https://github.com/kedarpotdar-nv/workbench-llamafactory)

<img src="media/2.png" width="600">

2. After the repo is downloaded, Workbench will start building the project on your PC. This step may take 10-15 minutes depending on your network speed. 

<img src="media/build.png" width="600">

3. After the build is complete, your Workbench project is ready for use.

>[!TIP]
> NVIDIA AI Workbench configures a WSL2 distribution (named NVIDIA-Workbench) on your Windows PC and creates a Docker/Podman container for each project. By default, the local project workspace is mounted at `/project/` within the container, and its contents can be accessed through the Workbench GUI's File Browser. The directories shown in the Workbench project, like 'data', correspond to paths within the containers as `/project/data`. Make sure to store any generated assets, such as model checkpoints, in directories within the `/project/` path to ensure they are preserved between sessions.


### Using LLaMa-Factory for fine-tuning Llama3-8B with pre-configured datasets

1. **Start LLaMa-Factory from AI Workbench.**

<img src="media/open-llamafactory.png" width="400">

Upon starting the project for the first time, Workbench will prompt for your HuggingFace Token.

<img src="media/hftoken.png" width="300">

The LLaMa-Factory GUI should now start in your web browser.

<img src="media/lm-gui.png" width="600">

2. **Model Training Configuration**

In the Model Name dropdown, select 'LLaMA3-8B-Chat' as the model you wish to fine-tune. Ensure that the fine-tuning method is set to 'lora' and leave the adapter path empty for the time being.

Next, expand the 'Advanced Configuration' section and set the 'Quantization bit' dropdown to '4'. This setting is crucial as we are performing QLoRA fine-tuning.

LlamaFactory offers a variety of built-in datasets suitable for fine-tuning. For this tutorial, we will be using the [codealpaca dataset](https://huggingface.co/datasets/sahil2801/CodeAlpaca-20k) provided by sahil2801.   

Next, in the 'train' tab, let's select the dataset and training parameters. 

| Parameter      | Value |
| ----------- | ----------- |
| Lang      | en       |
| Model name   | LLaMA3-8B-Chat        |
| Finetuning method | lora |
| Advanced Config > Quantization bit | 4 |
| Advanced Config > Prompt template | llama3 |
| Train >  Stage | Supervised Fine-Tuning |
| Train > Data dir | data |
| Train > Dataset | codealpaca |



Hyperparameters:

| Hyperparameter | Value |
| -------------- | ----- |
| Learning rate | 2.5e-5 |
| Max samples | 5000 |
| Max samples | 3.0 |
| Batch size | 2 |

Feel free to adjust the hyperparameters mentioned above based on your setup. Keep all other configurations at their default values. The codealpaca dataset contains approximately 20,000 samples; however, for this tutorial, we are limiting it to 5,000 samples to accelerate the training process. 



<img src="media/config.png" width="600">

Next, scroll down to the relevant section to preview the command LlamaFactory will use to initiate training. Make sure that the training data is stored in the specified locations as indicated in the tutorial. This ensures that the data is correctly accessed by the training process.

| Parameter | Value |
| -------------- | ----- |
| Output dir | /project/data/scratch/codealpaca |
| Config path | /project/data/scratch/config |


<img src="media/directory.png" width="900">


Training is expected to take about 2 hours on an RTX 4090 with these parameters.

Model export options:

The project enables two forms of model export:

LoRA adapter export
Merged checkpoint export

Depends

## Deployment




## Appendix: Importing custom data