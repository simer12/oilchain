import React from 'react';
import './Pages.css';

function Admin() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Administration Dashboard</h1>
        <p>Manage platform operations and monitor system performance</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>User Management</h3>
          <p>Manage farmers, FPOs, processors, and retailers</p>
          <button>Manage Users</button>
        </div>

        <div className="admin-card">
          <h3>Transaction Monitoring</h3>
          <p>Monitor all transactions and settlement processes</p>
          <button>View Transactions</button>
        </div>

        <div className="admin-card">
          <h3>System Reports</h3>
          <p>Generate compliance and performance reports</p>
          <button>Generate Reports</button>
        </div>

        <div className="admin-card">
          <h3>Settings</h3>
          <p>Configure platform parameters and fees</p>
          <button>Settings</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
