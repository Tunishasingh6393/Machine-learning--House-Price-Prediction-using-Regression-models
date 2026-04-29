import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/predict", (req, res) => {
    const { 
      sqft, 
      bedrooms, 
      bathrooms, 
      age, 
      neighborhood_score, 
      amenities_count 
    } = req.body;

    // Simulation of a trained Linear Regression model
    // Base price + weights * features
    const BASE_PRICE = 50000;
    const weights = {
      sqft: 150.5,
      bedrooms: 15000,
      bathrooms: 12000,
      age: -2000,
      neighborhood_score: 25000,
      amenities_count: 5000
    };

    const prediction = 
      BASE_PRICE +
      (sqft * weights.sqft) +
      (bedrooms * weights.bedrooms) +
      (bathrooms * weights.bathrooms) +
      (age * weights.age) +
      (neighborhood_score * weights.neighborhood_score) +
      (amenities_count * weights.amenities_count);

    // Calculate feature impacts (Simplified SHAP values)
    const impacts = [
      { name: 'Living Area', value: sqft * weights.sqft },
      { name: 'Bedrooms', value: bedrooms * weights.bedrooms },
      { name: 'Bathrooms', value: bathrooms * weights.bathrooms },
      { name: 'Property Age', value: age * weights.age },
      { name: 'Neighborhood', value: neighborhood_score * weights.neighborhood_score },
      { name: 'Amenities', value: amenities_count * weights.amenities_count }
    ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    // Simulated historical data for trend analysis
    const historical_trend = Array.from({ length: 6 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
      market_avg: 200000 + (Math.random() * 50000),
      predicted_segment: prediction + (Math.random() * 20000 - 10000)
    }));

    // Simulated benchmark comparison
    const benchmarks = [
      { category: 'Calculated Price', value: prediction },
      { category: 'Neighborhood Avg', value: prediction * 0.92 },
      { category: 'City Median', value: prediction * 1.15 }
    ];

    res.json({ 
      predicted_price: Math.max(0, prediction),
      impacts,
      historical_trend,
      benchmarks
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
