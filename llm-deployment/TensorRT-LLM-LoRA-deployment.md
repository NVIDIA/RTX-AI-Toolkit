# TensorRT-LLM Deployment with int4 base checkpoint FP16 LoRA checkpoint

This guide demonstrates how to use LoRA adapters at runtime for inference with int4_awq base HF checkpoints. This workflow also supports multiple different adapters at runtime with a single base checkpoint.

> [!NOTE]
> To perform inference with merged HF checkpoint, follow [TRT-LLM Deployment](TensorRT-LLM_deployment.md).

This chart below showcases the workflow for deploying TensorRT-LLM

<img src="../media/lora.png" width="700">

This guide assumes that you have followed steps in the [Llama-Factory tutorial](../tutorial-llama3-finetune.md) to generate a fine-tuned LoRA checkpoint.

## 1. Base model quantization
First, use the quantization.ipynb script inside the Llama-Factory Workbench project

## 2. TensorRT Engine Geenration with LoRA support

## 3
