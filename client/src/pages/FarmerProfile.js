import React, { useState } from 'react';
import './Pages.css';

function FarmerProfile() {
  const [farmer] = useState({
    name: 'Rajesh Kumar',
    farmName: 'Green Valley Farm',
    farmSize: 12.5,
    soilType: 'Loamy',
    waterResources: ['Borewell', 'Rainfall'],
    cropVariety: ['Soybean', 'Groundnut'],
    location: 'Madhya Pradesh, Indore',
    performance: {
      totalYieldProduced: 45.2,
      qualityRating: 4.5,
      paymentHistory: 98,
      loyaltyScore: 85
    }
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Farmer Profile</h1>
        <p>View and manage your farming information</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h2>Personal Information</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="label">Name</span>
              <span className="value">{farmer.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Location</span>
              <span className="value">{farmer.location}</span>
            </div>
            <div className="info-item">
              <span className="label">Farm Name</span>
              <span className="value">{farmer.farmName}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>Farm Details</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="label">Farm Size</span>
              <span className="value">{farmer.farmSize} Hectares</span>
            </div>
            <div className="info-item">
              <span className="label">Soil Type</span>
              <span className="value">{farmer.soilType}</span>
            </div>
            <div className="info-item">
              <span className="label">Water Resources</span>
              <span className="value">{farmer.waterResources.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>Performance Metrics</h2>
          <div className="metrics-list">
            <div className="metric">
              <span className="metric-label">Total Yield</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '85%' }}></div>
              </div>
              <span className="metric-value">{farmer.performance.totalYieldProduced} Quintals</span>
            </div>
            <div className="metric">
              <span className="metric-label">Quality Rating</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '90%' }}></div>
              </div>
              <span className="metric-value">{farmer.performance.qualityRating}/5.0</span>
            </div>
            <div className="metric">
              <span className="metric-label">Payment History</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${farmer.performance.paymentHistory}%` }}></div>
              </div>
              <span className="metric-value">{farmer.performance.paymentHistory}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Loyalty Score</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${farmer.performance.loyaltyScore}%` }}></div>
              </div>
              <span className="metric-value">{farmer.performance.loyaltyScore}/100</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>Crop Information</h2>
          <div className="crop-list">
            {farmer.cropVariety.map((crop, idx) => (
              <div key={idx} className="crop-item">
                <span className="crop-name">{crop}</span>
                <span className="crop-status">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
