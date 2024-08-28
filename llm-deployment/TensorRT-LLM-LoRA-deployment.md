# TensorRT-LLM Deployment with int4 base checkpoint + FP16 LoRA adapter

This guide outlines the process for using LoRA adapters for inference alongside int4_awq base checkpoints in TensorRT-LLM v0.11. This workflow allows for the deployment of multiple adapters at runtime using a single base checkpoint, enabling flexible and efficient model adaptation. Learn more about TensorRT-LLM's LoRA support [here](https://github.com/NVIDIA/TensorRT-LLM/tree/v0.11.0/examples/llama#run-models-with-lora).

> [!NOTE]
> To perform inference with merged HF checkpoint, follow [TRT-LLM Deployment](TensorRT-LLM_deployment.md).

This chart below showcases the workflow for deployment:

<img src="../media/lora.png" width="700">

This guide assumes that you have followed steps in the [Llama-Factory tutorial](../tutorial-llama3-finetune.md) to generate a fine-tuned LoRA checkpoint. 

## 1. Base model quantization
First, use the quantization.ipynb script inside the Llama-Factory Workbench project. To export the base model int4_awq checkpoint, start the Jupyterlab app from Workbench GUI. 

<img src="../media/jupyterlab.png" width="700">

Once the JupyterLab app is running, navigate to and open the quantization.ipynb notebook located in the code\quantization directory. Follow the steps outlined in the notebook to perform quantization on the base model:

1. In cell #3, change the value of `merged_model` to your HF model ID. 
For example:
<pre>merged_model=model_id</pre>
or
<pre>merged_model="meta-llama/Meta-Llama-3-8B-Instruct"</pre>

This will ensure that the model being exported from the quantization process is the base HF checkpoint, and not the one with LoRA adapters merged.

2. Proceed to run rest of the cells in the notebook, except the last cell.

3. In the last cell, change the value of `export_dir` to a location such as `"/project/data/scratch/llama3-int4"` to better reflect the contents of the exported checkpoint. Execute the cell.

You now have an `int4_awq` quantized llama3 checkpoint ready for use. This checkpoint can be utilized directly with TensorRT-LLM or with runtime LoRA adapters. Move your newly quatized base checkpoint, your LoRA adapters, and tokenizer+config.json for your base model into your Windows filesystem. Then proceed to next steps for deployment instructions:

## 2. TensorRT Engine Generation with LoRA support

To build a LoRA-compatible TensorRT engine with the int4_awq checkpoint, use the following trtllm-build command:

```
trtllm-build --checkpoint_dir "C:\models\llama3-int4" --output_dir "C:\models\llama3-engine-lora" --gemm_plugin auto --lora_plugin auto --max_batch_size 8 --max_input_len 512 --max_output_len 50 --lora_dir "C:\models\codealpaca" 
```

## 3. Run inference with LoRA 

To run inference, here we use the run.py script found in ```examples``` directory within the [TensorRT-LLM repo](https://github.com/NVIDIA/TensorRT-LLM).

<pre>
python ..\run.py --engine_dir "C:\models\llama3-engine" --max_output_len 10 --tokenizer_dir "C:\models\llama3-hf" --input_text "how are you?" --lora_task_uids 0 --use_py_session --top_p 0.5 --top_k 0
</pre>

## Multi-LORA inference
TensorRT-LLM supports multi-LoRA inference, i.e. support for several LoRA adapters at runtime. During engine build time, pass all your LoRA directories using the ```--lora_dir ``` argument.

Read more about multi-LoRA support [here](https://github.com/NVIDIA/TensorRT-LLM/tree/main/examples/llama#run-llama-with-several-lora-checkpoints).

> [!NOTE]
> When running inference with multiple LoRA adapters at the same time, only the ```q_proj```, ```k_proj```, and ```v_proj``` target modules are supported.
