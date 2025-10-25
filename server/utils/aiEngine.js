// Simple AI/ML prediction functions
// In production, use TensorFlow.js or ML.NET or similar

const predictPrice = (historicalPrices, currentTrend) => {
  if (historicalPrices.length < 2) return historicalPrices[historicalPrices.length - 1];
  
  const avg = historicalPrices.reduce((a, b) => a + b) / historicalPrices.length;
  const lastPrice = historicalPrices[historicalPrices.length - 1];
  const trend = currentTrend || 'stable';
  
  let multiplier = 1;
  if (trend === 'up') multiplier = 1.05;
  if (trend === 'down') multiplier = 0.95;
  
  return Math.round(lastPrice * multiplier);
};

const predictYield = (farmSize, soilQuality, rainfall, tempRange) => {
  // Simple prediction model
  const baseYield = 20; // quintals per hectare
  let adjustedYield = baseYield * farmSize;
  
  if (soilQuality === 'good') adjustedYield *= 1.2;
  if (soilQuality === 'average') adjustedYield *= 1.0;
  if (soilQuality === 'poor') adjustedYield *= 0.8;
  
  // Rainfall factor (ideal range: 600-1000mm for oilseeds)
  if (rainfall >= 600 && rainfall <= 1000) adjustedYield *= 1.1;
  
  return Math.round(adjustedYield);
};

const recommendCrop = (soilType, rainfall, temperature, location) => {
  // Simplified crop recommendation
  const recommendations = {
    'soybean': { soilTypes: ['loamy', 'clay-loamy'], rainfallMin: 500, rainfallMax: 1000 },
    'groundnut': { soilTypes: ['sandy-loam', 'loam'], rainfallMin: 400, rainfallMax: 600 },
    'mustard': { soilTypes: ['clay', 'loamy'], rainfallMin: 300, rainfallMax: 500 },
    'sunflower': { soilTypes: ['loam', 'sandy-loam'], rainfallMin: 400, rainfallMax: 700 }
  };
  
  const suitable = Object.entries(recommendations)
    .filter(([crop, req]) => 
      req.soilTypes.includes(soilType) && 
      rainfall >= req.rainfallMin && 
      rainfall <= req.rainfallMax
    )
    .map(([crop]) => crop);
  
  return suitable.length > 0 ? suitable[0] : 'soybean';
};

const assessPestRisk = (temperature, humidity, season, location) => {
  // Simple pest risk assessment
  let riskScore = 0;
  
  // Temperature factor
  if (temperature >= 20 && temperature <= 30) riskScore += 3;
  if (temperature > 30) riskScore += 2;
  
  // Humidity factor
  if (humidity >= 60 && humidity <= 90) riskScore += 3;
  if (humidity > 90) riskScore += 2;
  
  // Season factor
  if (season === 'rabi') riskScore += 1;
  
  if (riskScore >= 6) return 'high';
  if (riskScore >= 4) return 'medium';
  return 'low';
};

const calculateCO2Emissions = (distance, vehicleType) => {
  const emissionFactors = {
    'truck': 0.12, // kg CO2 per km
    'van': 0.08,
    'motorcycle': 0.05
  };
  
  const factor = emissionFactors[vehicleType] || 0.1;
  return Math.round(distance * factor * 100) / 100;
};

module.exports = {
  predictPrice,
  predictYield,
  recommendCrop,
  assessPestRisk,
  calculateCO2Emissions
};
