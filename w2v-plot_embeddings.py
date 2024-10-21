import torch
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE

# Step 1: Load the saved model and embeddings with weights_only=True
try:
    word_embeddings = torch.load('word_embeddings.pt', weights_only=True)  # Tải word_embeddings từ file đã lưu
    idx_to_word = torch.load('idx_to_word.pt', weights_only=True)  # Tải idx_to_word từ file đã lưu
    print("Embeddings and vocabulary loaded successfully!")
except Exception as e:
    print(f"Error loading files: {e}")
    exit()

# Step 2: Ensure embeddings are on CPU
if word_embeddings.is_cuda:
    word_embeddings = word_embeddings.cpu()

# Step 3: Convert embeddings to numpy for t-SNE
word_embeddings_np = word_embeddings.numpy()

# Step 4: Use t-SNE to reduce dimensionality to 2D for visualization
tsne = TSNE(n_components=2, random_state=42)
word_embeddings_2d = tsne.fit_transform(word_embeddings_np)

# Step 5: Plot the embeddings
def plot_embeddings(embeddings_2d, idx_to_word):
    plt.figure(figsize=(10, 10))
    for idx, (x, y) in enumerate(embeddings_2d):
        plt.scatter(x, y, marker='x', color='red')
        # In case idx_to_word is incomplete or index is out of bounds
        word_label = idx_to_word.get(idx, f"Word {idx}")
        plt.text(x + 0.02, y + 0.02, word_label, fontsize=9)
    
    plt.title("Word Embeddings Visualization with t-SNE")
    plt.xlabel("t-SNE Dimension 1")
    plt.ylabel("t-SNE Dimension 2")
    plt.grid(True)
    plt.show()

# Call the plotting function
plot_embeddings(word_embeddings_2d, idx_to_word)
