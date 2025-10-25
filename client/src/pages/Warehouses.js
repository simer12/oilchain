import React, { useState } from 'react';
import './Pages.css';

function Warehouses() {
  const [warehouses] = useState([
    { id: 1, name: 'Delhi Central Hub', location: 'Delhi', capacity: 5000, current: 3200, type: 'Climate-Controlled' },
    { id: 2, name: 'MP Storage Center', location: 'Indore', capacity: 8000, current: 5600, type: 'Dry' },
    { id: 3, name: 'Gujarat Port Hub', location: 'Gujarat', capacity: 10000, current: 7200, type: 'Cold Chain' },
    { id: 4, name: 'Karnataka Processing', location: 'Bangalore', capacity: 6000, current: 3800, type: 'Climate-Controlled' }
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Warehouse & Storage Management</h1>
        <p>View available storage facilities and real-time inventory</p>
      </div>

      <div className="warehouse-grid">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="warehouse-card">
            <h3>{warehouse.name}</h3>
            <p className="warehouse-location">{warehouse.location}</p>
            <div className="warehouse-details">
              <p><strong>Type:</strong> {warehouse.type}</p>
              <p><strong>Total Capacity:</strong> {warehouse.capacity.toLocaleString()} Quintals</p>
              <p><strong>Current Stock:</strong> {warehouse.current.toLocaleString()} Quintals</p>
            </div>
            <div className="utilization-bar">
              <div className="utilization-fill" style={{ width: `${(warehouse.current / warehouse.capacity) * 100}%` }}></div>
            </div>
            <p className="utilization-text">{Math.round((warehouse.current / warehouse.capacity) * 100)}% Utilized</p>
            <button className="booking-btn">Book Space</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Warehouses;
