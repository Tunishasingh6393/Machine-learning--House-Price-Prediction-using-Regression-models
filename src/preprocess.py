import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

def clean_data(df):
    """
    Standard cleaning pipeline for housing data.
    """
    # 1. Handle missing values
    imputer = SimpleImputer(strategy='median')
    cols_to_fix = ['sqft', 'bedrooms', 'bathrooms', 'age', 'neighborhood_score']
    df[cols_to_fix] = imputer.fit_transform(df[cols_to_fix])
    
    # 2. Drop rows where price is missing
    df = df.dropna(subset=['price'])
    
    return df

def scale_features(X):
    scaler = StandardScaler()
    return scaler.fit_transform(X)
