# TensorRT-LLM Deployment with int4 base checkpoint + FP16 LoRA adapter

This guide explains how to use LoRA adapters for runtime inference using int4_awq base HuggingFace checkpoints in TensorRT-LLM. Additionally, this workflow supports multiple adapters at runtime with a single base checkpoint.

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

<pre>
  trtllm-build --checkpoint_dir llama3-int4 --output_dir llama3-engine-lora --gemm_plugin auto --lora_plugin auto --max_batch_size 8 --max_input_len 512 --max_output_len 50 --lora_dir  "codealpaca" --max_lora_rank 8 --lora_target_modules attn_q attn_k attn_v
</pre>

## 3. Run inference with LoRA 

Use the TensorRT-LLM repo's run.py script to run inference as follows:

<pre>
python ../run.py --engine_dir "llama3-engine-lora" \
              --max_output_len 10 \
              --tokenizer_dir "llama3-hf" \
              --input_text "Write a program to print the Fibonacci sequence" \
              --max_attention_window_size=4096 \
              --lora_task_uids 0 \
              --use_py_session \
              --temperature 0.8 \
              --top_p 0.8 \
              --top_k 100
</pre>

## 4. Multi-LORA inference

to do
