# AbodeAI - House Price Prediction Project

A production-grade Machine Learning system that predicts real estate prices using regression models. Designed for your portfolio, this project demonstrates data cleaning, EDA, feature engineering, and model deployment.

## 🚀 Live Demo Features
- **Real-time Inference**: Adjust property features to see instant price updates.
- **Explainable AI (XAI)**: Visualize how each feature (Area, Neighborhood, etc.) impacts the final valuation.
- **Modern Dashboard**: Built with React, Tailwind CSS, and Recharts.

---

## 🛠 Project Structure & Repository Architecture

### 📂 Repository Tree
```text
House-Price-Prediction/
│
├── data/               # Raw and processed datasets (CSV/Parquet)
├── notebooks/          # Exploratory Data Analysis & Experimentation
├── src/                # Core logic, preprocessing, and model scripts
├── models/             # Serialized .joblib model artifacts
├── outputs/            # Evaluation results, plots, and logs
├── images/             # Visual assets for documentation
├── README.md           # Project documentation
├── requirements.txt    # Python dependencies
└── main.py             # Entry point for training & inference
```

### 🔍 Folder Details
- **`data/`**: Stores your housing datasets. It's best practice to keep raw data separate from cleaned data.
- **`notebooks/`**: Where you perform EDA (Heatmaps, Scatter plots). This is the "Data Science lab".
- **`src/`**: Contains modular Python scripts to ensure your code is "production-ready" rather than just a messy notebook.
- **`models/`**: Stores your trained brain (the model). You load this into your API later.
- **`outputs/`**: Tracks how your model improved over time with log files and metric reports.

---

## 📈 Visualizing the Model (EDA)

| Feature Correlation | Price Distribution |
| :---: | :---: |
| ![Correlation Heatmap](https://raw.githubusercontent.com/placeholder-images/correlation_heatmap.png) | ![Price Distribution](https://raw.githubusercontent.com/placeholder-images/price_distribution.png) |
| *Identifying multilinearity* | *Checking for price skewness* |

---

### 1. Planning & Requirements
- **Objective**: Predict housing prices based on property and location features.
- **Target Variable**: `SalePrice`
- **Features**: Living Area (Sqft), Bedrooms, Bathrooms, Age, Neighborhood Quality.

### 2. Implementation Guide (Python/Local)
To move this to your GitHub, follow these phases:

#### Phase 1: Data Preprocessing
- Handle missing values using Median Imputation.
- Encode categorical variables like 'Neighborhood' using One-Hot Encoding.
- Scale numerical features using Standard Scaler.

#### Phase 2: Model Selection
- **Linear Regression**: Best for simple relationships.
- **Random Forest**: Captures non-linear dependencies.
- **XGBoost**: High-performance gradient boosting for accuracy.

#### Phase 3: Deployment (FastAPI)
Expose the model via a REST API:
```python
@app.post("/predict")
def predict(data: HouseData):
    features = preprocess(data)
    prediction = model.predict(features)
    return {"price": prediction[0]}
```

---

## 📊 Key Insights
- **Living Area** is usually the #1 driver of price (High positive correlation).
- **Property Age** generally has a negative impact unless it's a historic/renovated asset.
- **Neighborhood Quality** acts as a price multiplier in urban regression models.

---

## 💼 Interview Ready Questions
1. **How do you handle outliers?** 
   - *Answer*: Use Z-score or IQR methods to identify and cap extreme values (e.g., houses > 10,000 sqft).
2. **What metric is best for this problem?** 
   - *Answer*: RMSE (Root Mean Square Error) is preferred as it's in the same units as the price and penalizes large misses.
3. **What is Feature Engineering?**
   - *Answer*: Creating new features like "Price per Bedroom" or "Total Baths" from existing data to help the model learn better.

---

Developed with ❤️ for Data Science Students.
