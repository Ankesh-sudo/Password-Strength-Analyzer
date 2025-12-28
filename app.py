from flask import Flask, render_template, request, jsonify
import joblib
from utils.feature_extractor import extract_features

app = Flask(__name__)

# Load trained model
model = joblib.load("model/password_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    password = data.get("password", "")

    if not password:
        return jsonify({"error": "Password cannot be empty"}), 400

    features = extract_features(password)
    prediction = model.predict([features])[0]

    strength_map = {
        0: "Weak",
        1: "Medium",
        2: "Strong"
    }

    return jsonify({
        "strength": strength_map[prediction]
    })

if __name__ == "__main__":
    app.run(debug=True)
