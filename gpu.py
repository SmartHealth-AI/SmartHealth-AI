import torch

print("Torch version:", torch.__version__)
print("CUDA version:", torch.version.cuda)
print("CUDA available:", torch.cuda.is_available())

def check_cuda():
    # Bước 1: Kiểm tra nếu CUDA được cài đặt
    try:
        if not torch.cuda.is_available():
            raise RuntimeError("CUDA không có sẵn. Kiểm tra xem CUDA đã được cài đặt đúng cách không.")
    except Exception as e:
        return f"Lỗi kiểm tra CUDA: {e}"

    # Bước 2: Kiểm tra driver NVIDIA
    try:
        driver_version = torch.version.cuda
        if driver_version is None:
            raise RuntimeError("Driver NVIDIA có thể chưa được cài đặt hoặc không tương thích.")
    except Exception as e:
        return f"Lỗi kiểm tra driver: {e}"

    # Bước 3: Kiểm tra số lượng GPU
    try:
        num_gpus = torch.cuda.device_count()
        if num_gpus == 0:
            raise RuntimeError("Không tìm thấy GPU nào.")
    except Exception as e:
        return f"Lỗi kiểm tra số lượng GPU: {e}"

    # Bước 4: Kiểm tra tên GPU
    try:
        gpu_name = torch.cuda.get_device_name(0)
        if gpu_name is None:
            raise RuntimeError("Không thể lấy tên GPU.")
        return f"Cuda (Hỗ trợ GPU) đã được bật! Số lượng GPU: {num_gpus}, Tên GPU: {gpu_name}"
    except Exception as e:
        return f"Lỗi kiểm tra tên GPU: {e}"

if __name__ == "__main__":
    result = check_cuda()
    print(result)
