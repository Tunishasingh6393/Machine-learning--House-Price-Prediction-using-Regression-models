/**
 * This file contains the architecture and implementation plan for your local Python environment.
 * Copy this into a file named 'PROJECT_GUIDELINES.md' in your repository.
 */

# House Price Prediction - Project Guide

## 1. Project Explanation
- **Simple explanation**: A tool that estimates a house's price based on details like size, location, and age.
- **Technical explanation**: A multivariate regression model that learns the relationship between independent variables (features) and a continuous target (price).

## 2. Tech Stack for GitHub (Option C: Advanced)
- **Language**: Python 3.10+
- **Data Science**: Pandas, NumPy, Scikit-Learn
- **Modeling**: XGBoost, Random Forest Regressor
- **API**: FastAPI
- **Serialization**: Joblib (to save the model)

## 3. Directory Structure
```
House-Price-Prediction/
├── data/               # CSV files (Public datasets)
├── notebooks/          # Jupyter notebooks for EDA and training
├── src/
│   ├── preprocess.py   # Cleaning and encoding
│   ├── model.py        # Training logic
│   └── api.py          # FastAPI implementation
├── models/             # Saved .joblib files
├── requirements.txt
└── README.md
```

## 4. Environment Setup (requirements.txt)
```text
pandas==2.1.0
numpy==1.25.0
scikit-learn==1.3.0
xgboost==1.7.6
fastapi==0.103.0
uvicorn==0.23.2
joblib==1.3.2
matplotlib==3.7.2
seaborn==0.12.2
```

## 5. Complete Python Implementation (GitHub Ready)

Create a file named `main.py` in your local project and paste this code:

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# 1. Create Synthetic Dataset (Replacing public dataset for demo)
def generate_data(n=1000):
    np.random.seed(42)
    sqft = np.random.randint(800, 5000, n)
    bedrooms = np.random.randint(1, 6, n)
    bathrooms = np.random.randint(1, 5, n)
    age = np.random.randint(0, 50, n)
    neighborhood_score = np.random.randint(1, 11, n)
    
    # Formula: Price = 50k + (150*sqft) + (15k*bed) + (12k*bath) - (2k*age) + (25k*score) + Noise
    price = 50000 + (150 * sqft) + (15000 * bedrooms) + (12000 * bathrooms) \
            - (2000 * age) + (25000 * neighborhood_score) + np.random.normal(0, 5000, n)
    
    return pd.DataFrame({
        'sqft': sqft, 'bedrooms': bedrooms, 'bathrooms': bathrooms,
        'age': age, 'neighborhood_score': neighborhood_score, 'price': price
    })

df = generate_data()

# 2. Split Data
X = df.drop('price', axis=1)
y = df['price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Evaluate
predictions = model.predict(X_test)
print(f"MAE: {mean_absolute_error(y_test, predictions)}")
print(f"R2 Score: {r2_score(y_test, predictions)}")

# 5. Save Model
joblib.dump(model, 'house_price_model.joblib')
print("Model saved as house_price_model.joblib")
```
