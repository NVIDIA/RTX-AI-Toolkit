


## Clone LlamaFactory Workbench Project 

![Clone the workbench-llamafactory project](/media/2.png)


## Start project and wait for build

## Workbench 101

Workbench downloads a distro and starts a container and mounts the /project/ dir

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