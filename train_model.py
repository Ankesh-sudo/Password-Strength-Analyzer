import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from utils.feature_extractor import extract_features

# Load dataset
df = pd.read_csv("dataset/passwords.csv")

# Extract features
X = df["password"].apply(extract_features).tolist()
y = df["strength"]

# Initialize model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Train model
model.fit(X, y)

# Save trained model
joblib.dump(model, "model/password_model.pkl")

print("✅ Password strength model trained and saved successfully")
