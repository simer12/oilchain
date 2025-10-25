import React, { useState } from 'react';
import { MapPin, Package, Clock, Navigation } from 'lucide-react';
import './Pages.css';

function Logistics() {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);

  const mockShipment = {
    trackingId: 'TRACK-1234567890-ABC123DEF',
    status: 'in-transit',
    oilseedType: 'Soybean',
    quantity: 150,
    origin: 'Farm, Madhya Pradesh',
    destination: 'Warehouse, Delhi',
    currentLocation: {
      latitude: 23.2156,
      longitude: 79.9864,
      address: 'Heading towards Warehouse',
      timestamp: new Date().toLocaleString()
    },
    distance: 856,
    estimatedTime: 14,
    temperature: 22,
    humidity: 58
  };

  const handleSearch = () => {
    setShipment(mockShipment);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Real-Time Logistics & Traceability</h1>
        <p>Track shipments and monitor storage conditions throughout the supply chain</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Enter tracking ID (e.g., TRACK-1234567890-ABC123DEF)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
      </div>

      {shipment && (
        <div className="logistics-container">
          <div className="shipment-header">
            <h2>Shipment Details</h2>
            <p className="tracking-id">{shipment.trackingId}</p>
          </div>

          <div className="shipment-status">
            <div className={`status-badge status-${shipment.status}`}>
              {shipment.status.toUpperCase()}
            </div>
            <p className="status-time">Last updated: {shipment.currentLocation.timestamp}</p>
          </div>

          <div className="shipment-grid">
            <div className="shipment-card">
              <h3>Shipment Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="label">Oilseed Type</span>
                  <span className="value">{shipment.oilseedType}</span>
                </div>
                <div className="info-item">
                  <span className="label">Quantity</span>
                  <span className="value">{shipment.quantity} Quintals</span>
                </div>
                <div className="info-item">
                  <span className="label">Origin</span>
                  <span className="value">{shipment.origin}</span>
                </div>
                <div className="info-item">
                  <span className="label">Destination</span>
                  <span className="value">{shipment.destination}</span>
                </div>
              </div>
            </div>

            <div className="shipment-card">
              <h3>Route Optimization</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="label">Total Distance</span>
                  <span className="value">{shipment.distance} km</span>
                </div>
                <div className="info-item">
                  <span className="label">Estimated Time</span>
                  <span className="value">{shipment.estimatedTime} hours</span>
                </div>
                <div className="info-item">
                  <span className="label">Current Location</span>
                  <span className="value">{shipment.currentLocation.address}</span>
                </div>
                <div className="info-item">
                  <span className="label">Coordinates</span>
                  <span className="value">{shipment.currentLocation.latitude.toFixed(4)}, {shipment.currentLocation.longitude.toFixed(4)}</span>
                </div>
              </div>
            </div>

            <div className="shipment-card">
              <h3>Environmental Monitoring</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="label">Temperature</span>
                  <span className="value">{shipment.temperature}°C</span>
                </div>
                <div className="info-item">
                  <span className="label">Humidity</span>
                  <span className="value">{shipment.humidity}%</span>
                </div>
                <div className="info-item">
                  <span className="label">Status</span>
                  <span className="value status-good">Optimal Conditions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="journey-timeline">
            <h3>Journey Timeline</h3>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <p className="timeline-title">Shipment Picked Up</p>
                  <p className="timeline-time">2 hours ago</p>
                </div>
              </div>

              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <p className="timeline-title">Left Origin Location</p>
                  <p className="timeline-time">1.5 hours ago</p>
                </div>
              </div>

              <div className="timeline-item active">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <p className="timeline-title">In Transit</p>
                  <p className="timeline-time">Currently</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <p className="timeline-title">Estimated Arrival</p>
                  <p className="timeline-time">~12 hours from now</p>
                </div>
              </div>
            </div>
          </div>

          <div className="blockchain-section">
            <h3>Blockchain Traceability Hash</h3>
            <div className="hash-container">
              <code>0x4a7f3k9m2n5b8c1d6e9f7a3k5m7n9b2c4d6e8f9a1b3c5d7e9f1a3c5d7e9f</code>
              <button className="copy-btn">Copy</button>
            </div>
            <p className="hash-note">All transactions are recorded on blockchain for complete traceability from farm to warehouse.</p>
          </div>
        </div>
      )}

      {!shipment && trackingId && <div className="no-results">Shipment not found. Please check the tracking ID.</div>}
    </div>
  );
}

export default Logistics;
