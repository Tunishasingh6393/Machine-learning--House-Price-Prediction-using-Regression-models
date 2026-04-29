import pandas as pd
import numpy as np
import logging
import json
import os
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# 1. Setup Logging
os.makedirs('models', exist_ok=True)
logging.basicConfig(
    filename='models/training.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def generate_data(n=1000):
    """Generates synthetic housing data for training."""
    logging.info(f"Generating synthetic dataset with {n} samples.")
    np.random.seed(42)
    sqft = np.random.randint(800, 5000, n)
    bedrooms = np.random.randint(1, 6, n)
    bathrooms = np.random.randint(1, 5, n)
    age = np.random.randint(0, 50, n)
    neighborhood_score = np.random.randint(1, 11, n)
    
    # Base Price calculation with some random noise
    price = 50000 + (150 * sqft) + (15000 * bedrooms) + (12000 * bathrooms) \
            - (2000 * age) + (25000 * neighborhood_score) + np.random.normal(0, 5000, n)
    
    return pd.DataFrame({
        'sqft': sqft, 'bedrooms': bedrooms, 'bathrooms': bathrooms,
        'age': age, 'neighborhood_score': neighborhood_score, 'price': price
    })

def train_main():
    # Load and Split
    df = generate_data()
    X = df.drop('price', axis=1)
    y = df['price']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    logging.info("Dataset split into 80% training and 20% testing.")

    # Train
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    logging.info("Initializing RandomForestRegressor with 100 estimators.")
    model.fit(X_train, y_train)
    logging.info("Model fitting complete.")

    # Evaluate
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    
    # Save Report
    summary = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "model_type": "RandomForestRegressor",
        "metrics": {
            "mean_absolute_error": round(mae, 2),
            "r2_score": round(r2, 4)
        },
        "hyperparameters": model.get_params()
    }
    
    with open('models/training_summary.json', 'w') as f:
        json.dump(summary, f, indent=4)
    logging.info("Training summary report saved to models/training_summary.json")

    # Save Model Artifact
    joblib.dump(model, 'models/house_price_model.joblib')
    logging.info("Model artifact saved to models/house_price_model.joblib")
    
    print(f"--- Training Complete ---")
    print(f"MAE: {mae}")
    print(f"R2: {r2}")

if __name__ == "__main__":
    train_main()
