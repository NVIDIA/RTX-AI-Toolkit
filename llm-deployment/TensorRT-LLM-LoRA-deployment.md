# TensorRT-LLM Deployment with int4 base checkpoint FP16 LoRA checkpoint

This guide demonstrates how to use LoRA adapters at runtime for inference with int4_awq base HF checkpoints. This workflow also supports multiple different adapters at runtime with a single base checkpoint.

> [!NOTE]
> To perform inference with merged HF checkpoint, follow [TRT-LLM Deployment](TensorRT-LLM_deployment.md).

This chart below showcases the workflow for deploying TensorRT-LLM

<img src="../media/lora.png" width="700">

This guide assumes that you have followed steps in the [Llama-Factory tutorial](../tutorial-llama3-finetune.md) to generate a fine-tuned LoRA checkpoint.

## 1. Base model quantization
First, use the quantization.ipynb script inside the Llama-Factory Workbench project. To export just the base model int4_awq checkpoint, start the Jupyter Notebook app. 

<img src="../media/jupyterlab.png" width="700">

Once the jupyterlab app has started, navigate to and start the quantization Notebook - code\quantization.ipynb. Follow these steps to perform the base model quantization:

1. In cell #3, change the value of `merged_model` to your HF model ID. 
For example:
<pre>merged_model=model_id</pre>
or
<pre>merged_model="meta-llama/Meta-Llama-3-8B-Instruct"</pre>

This will ensure that the model being exported from the quantization process is the base HF checkpoint, and not the one with LoRA adapters merged.

2. Proceed to run rest of the cells in the notebook, except the last cell.

3. In the last cell, change the value of `export_dir` to a location such as `"/project/data/scratch/llama3-int4"` to better reflect the contents of the exported checkpoint. And execute the cell.

Now, you have an exported int4_awq quantized llama3 checkpoint ready to use as-is with TensorRT-LLM, or with runtime LoRA adapters.

## 2. TensorRT Engine Generation with LoRA support

<pre>
  trtllm-build --checkpoint_dir ./tllm_checkpoint_1gpu_awq \
            --output_dir /tmp/llama_7b_with_lora_qkv/trt_engines/int4_AWQ/1-gpu/ \
            --gemm_plugin auto \
            --lora_plugin auto \
            --max_batch_size 8 \
            --max_input_len 512 \
            --max_output_len 50 \
            --lora_dir  "luotuo-lora-7b-0.1/" "Japanese-Alpaca-LoRA-7b-v0/" \
            --max_lora_rank 8 \
            --lora_target_modules attn_q attn_k attn_v
</pre>

## 3. Run inference with LoRA 


