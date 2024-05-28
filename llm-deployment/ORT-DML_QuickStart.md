# Generative AI models with ONNX Runtime and DirectML

[ONNX Runtime Generative AI library ](https://github.com/microsoft/onnxruntime-genai) makes it easy to deploy generative AI onnx models using ONNX Runtime and DirectML. Follow the documentation provided on the [ONNX Runtime Generative AI library github repo](https://github.com/microsoft/onnxruntime-genai) for more details.

## [Installation](https://onnxruntime.ai/docs/genai/howto/install.html)

```bash
pip install [--pre] numpy onnxruntime-genai-directml
```

## [Build optimized ONNX model](https://onnxruntime.ai/docs/genai/howto/build-model.html)

### [Build ONNX model from PyTorch Hugging Face Checkpoint](https://onnxruntime.ai/docs/genai/howto/build-model.html#original-pytorch-model-from-hugging-face)

```bash
python3 -m onnxruntime_genai.models.builder -m model_name -o path_to_output_folder -p precision -e execution_provider 
```

For example, to build fp16 Phi-2 model:
```bash
python -m onnxruntime_genai.models.builder -m microsoft/phi-2 -e dml -p fp16 -o ./models/phi2
```

To build int4 Phi-2 model:
```bash
python -m onnxruntime_genai.models.builder -m microsoft/phi-2 -e dml -p int4 -o ./models/phi2
```

### [Build ONNX model from finetuned PyTorch Model](https://onnxruntime.ai/docs/genai/howto/build-model.html#customized-or-finetuned-pytorch-model)

```bash
python3 -m onnxruntime_genai.models.builder -i path_to_local_folder_on_disk -o path_to_output_folder -p precision -e execution_provider 
```

## Run Inference

ORT Gen AI SDK provides a high level abstraction to run the full inference pipeline using its `Generate()` API.

### [Python API](https://onnxruntime.ai/docs/genai/api/python.html)

Run the example code provided with [ORT-GenAI repo](https://github.com/microsoft/onnxruntime-genai/tree/main/examples/python).

```bash
git clone https://github.com/microsoft/onnxruntime-genai.git
cd onnxruntime-genai\examples\python
python model-qa.py -m {path to model folder} -ep dml
```

### [C API](https://onnxruntime.ai/docs/genai/api/c.html)

Run the example code provided with [ORT-GenAI repo](https://github.com/microsoft/onnxruntime-genai/tree/main/examples/c). 
