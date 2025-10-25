import React from 'react';
import './Pages.css';

function Marketplace() {
  const [listings] = React.useState([
    { id: 1, crop: 'Soybean', quantity: 50, price: 45500, seller: 'Farm A', location: 'MP', rating: 4.5 },
    { id: 2, crop: 'Groundnut', quantity: 100, price: 52000, seller: 'Farm B', location: 'GJ', rating: 4.8 },
    { id: 3, crop: 'Mustard', quantity: 75, price: 48000, seller: 'Farm C', location: 'RJ', rating: 4.2 },
    { id: 4, crop: 'Sunflower', quantity: 60, price: 42000, seller: 'Farm D', location: 'KA', rating: 4.6 }
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Direct Farmer-to-Market Linkages</h1>
        <p>Browse available oilseeds and connect with farmers</p>
      </div>

      <div className="marketplace-grid">
        {listings.map((listing) => (
          <div key={listing.id} className="marketplace-card">
            <div className="card-header">
              <h3>{listing.crop}</h3>
              <span className="rating">★ {listing.rating}</span>
            </div>
            <div className="card-details">
              <p><strong>Quantity:</strong> {listing.quantity} Quintals</p>
              <p><strong>Price:</strong> ₹{listing.price.toLocaleString()}/Quintal</p>
              <p><strong>Seller:</strong> {listing.seller}</p>
              <p><strong>Location:</strong> {listing.location}</p>
            </div>
            <button className="contact-btn">Contact Seller</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
