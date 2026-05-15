import streamlit as st
import numpy as np
import joblib

# Load trained model
model = joblib.load("house_price_model.pkl")

# Page configuration
st.set_page_config(
    page_title="House Price Prediction",
    page_icon="🏠",
    layout="centered"
)

# Title
st.title("🏠 House Price Prediction App")
st.write("Enter house details to predict the estimated price.")

# User Inputs
area = st.number_input("Area (in sq ft)", min_value=100)

bedrooms = st.number_input("Number of Bedrooms", min_value=1, max_value=10)

bathrooms = st.number_input("Number of Bathrooms", min_value=1, max_value=10)

stories = st.number_input("Number of Floors", min_value=1, max_value=5)

parking = st.number_input("Parking Spaces", min_value=0, max_value=10)

# Predict Button
if st.button("Predict Price"):

    # Prepare input data
    features = np.array([[area, bedrooms, bathrooms, stories, parking]])

    # Prediction
    prediction = model.predict(features)

    # Display result
    st.success(f"Estimated House Price: ₹ {prediction[0]:,.2f}")