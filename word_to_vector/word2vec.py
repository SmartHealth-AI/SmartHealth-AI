import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from collections import Counter
import pandas as pd
import numpy as np

df = pd.read_csv("../archive/medquad.csv", nrows=100)

# Hyperparameters (siêu tham số cho mô hình)

#Kích thước vector nhúng từ, tức là số lượng chiều của vector đại diện cho mỗi từ trong từ điển.
EMBEDDING_DIM = 100  # Size of word embedding
#Kích thước cửa sổ ngữ cảnh, cho biết số lượng từ xung quanh một từ mục tiêu sẽ được xem xét khi tạo nhúng.
WINDOW_SIZE = 2      # Context window size
NUM_EPOCHS = 2       # Number of training epochs
LEARNING_RATE = 0.001
MIN_COUNT = 1

if torch.cuda.is_available():
    print("Cuda (GPU support) is available and enabled!")
else:
    print("Cuda (GPU support) is not available :(")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Step 1: Preprocess the text data

def preprocess_data(data):
    
    # Ensure there are no NaN values in 'question' or 'answer' columns
    data['question'] = data['question'].fillna('')
    data['answer'] = data['answer'].fillna('')

    # Combine 'question' and 'answer' columns into a single text column
    combined_text = data['question'] + " " + data['answer']

    # Tokenize the combined text
    words = " ".join(combined_text).lower().split()
    
    # Create a vocabulary based on word frequency
    word_freq = Counter(words)
    vocab = {word: idx for idx, (word, freq) in enumerate(word_freq.items()) if freq >= MIN_COUNT}
    idx_to_word = {idx: word for word, idx in vocab.items()}
    
    return vocab, idx_to_word, combined_text

vocab, idx_to_word, combined_text = preprocess_data(df)

print(idx_to_word[0])

# Step 2: Generate Skip-gram dataset
def create_skipgram_data(text, vocab, window_size):
    skipgram_data = []
    for sentence in text:
        words = sentence.lower().split()
        indices = [vocab[word] for word in words if word in vocab]
        for i, target_word in enumerate(indices):
            context = indices[max(0, i - window_size):i] + indices[i + 1:i + 1 + window_size]
            for context_word in context:
                skipgram_data.append((target_word, context_word))
    return skipgram_data

skipgram_data = create_skipgram_data(combined_text, vocab, WINDOW_SIZE)

print(len(skipgram_data))

# Step 3: Create Dataset and DataLoader
class SkipGramDataset(torch.utils.data.Dataset):
    def __init__(self, data):
        self.data = data
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return torch.tensor(self.data[idx][0]), torch.tensor(self.data[idx][1])
    

# Create Dataset and DataLoader
dataset = SkipGramDataset(skipgram_data)
dataloader = torch.utils.data.DataLoader(dataset, batch_size=4, shuffle=True)

# Step 4: Define the Word2Vec Model
class Word2Vec(nn.Module):
    def __init__(self, vocab_size, embedding_dim):
        super(Word2Vec, self).__init__()
        #Tạo một lớp nhúng (embedding layer), nơi mỗi từ trong từ vựng sẽ được ánh xạ thành một vector có kích thước embedding_dim
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
    
    def forward(self, target_word, context_word):
        target_emb = self.embeddings(target_word)
        context_emb = self.embeddings(context_word)
        '''
        Tính tích vô hướng (element-wise multiplication) giữa các vector nhúng của từ mục tiêu và từ ngữ cảnh
        sum(dim=1) tính tổng của các phần tử trong mỗi vector nhúng để cho ra một giá trị duy nhất cho mỗi cặp (target_word, context_word)
        '''
        score = torch.mul(target_emb, context_emb).sum(dim=1)
        return score #tensor chứa các giá trị tương tự cho mỗi cặp từ
    
model = Word2Vec(len(vocab), EMBEDDING_DIM).to(device)
print("Model is defined!")

#Tối ưu hóa Adam, đầu vào là các tham số của mô hình và tốc độ học
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

'''
Hàm mất mát được sử dụng cho bài toán phân loại nhị phân (binary classification)
tính giá trị logits từ đầu ra của mô hình và sau đó áp dụng hàm mất mát nhị phân chéo (binary cross-entropy loss)
dự đoán xác suất nhị phân cho mỗi cặp (target_word, context_word).
'''
loss_function = nn.BCEWithLogitsLoss()

print("Model, optimizer, and loss function are defined!")

# Step 6: Training Loop

print("Starting training...")
for epoch in range(NUM_EPOCHS):
    total_loss = 0
    for target_word, context_word in dataloader:
        
        target_word = target_word.to(device)   # Move data to GPU
        context_word = context_word.to(device) # Move data to GPU
        
        optimizer.zero_grad()
        '''
        Đặt lại các gradients về 0 trước khi thực hiện một bước tối ưu hóa mới. 
        Điều này là cần thiết vì PyTorch tích lũy gradients qua các lần gọi backward()
        '''
        
        # Forward pass
        scores = model(target_word, context_word)
        labels = torch.ones_like(scores).to(device) 
        '''labels là một tensor chứa toàn bộ các giá trị 1, có kích thước giống như scores. 
        Điều này có nghĩa là mô hình sẽ cố gắng dự đoán xác suất là 1 cho mỗi cặp từ mục tiêu và từ ngữ cảnh.
        '''
        loss = loss_function(scores, labels)
        '''tính toán giá trị mất mát giữa điểm số của mô hình và nhãn thực tế (tất cả là 1)'''
        
        # Backward pass
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
        
    print(f'Epoch {epoch + 1}/{NUM_EPOCHS}, Loss: {total_loss:.4f}')


# Save or visualize embeddings for later use
word_embeddings = model.embeddings.weight.data.to('cpu')  # Move embeddings back to CPU for saving or visualization

# Save embeddings to a file
torch.save(word_embeddings, 'word_embeddings.pt')
print("Word embeddings saved to 'word_embeddings.pt'")
torch.save(idx_to_word, 'idx_to_word.pt')
print("Index to word mapping saved to 'idx_to_word.pt'")

# Save the model
torch.save(model.state_dict(), 'word2vec_model.pth')
print("Model saved to 'word2vec_model.pth'")