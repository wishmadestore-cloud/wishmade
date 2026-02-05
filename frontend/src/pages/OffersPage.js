import React from 'react';
import { Link } from 'react-router-dom';

const OffersPage = () => {
    const offers = [
        {
            id: 1,
            title: "Winter Sale",
            description: "Flat 50% Off on all Winter Wear! Jackets, Sweaters, and more.",
            code: "WINTER50",
            bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            color: "#333"
        },
        {
            id: 2,
            title: "New User Bonus",
            description: "Get ₹500 off on your first order above ₹2000.",
            code: "WELCOME500",
            bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white"
        },
        {
            id: 3,
            title: "Bundle Deal",
            description: "Buy any 2 T-Shirts and get 1 Free!",
            code: "B2G1",
            bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
            color: "#333"
        }
    ];

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Special Offers</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Grab the best deals while they last!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {offers.map(offer => (
                    <div key={offer.id} style={{
                        background: offer.bg,
                        padding: '40px',
                        borderRadius: '15px',
                        color: offer.color,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '250px'
                    }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{offer.title}</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.5' }}>{offer.description}</p>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.3)',
                                padding: '10px 15px',
                                borderRadius: '8px',
                                display: 'inline-block',
                                border: '1px dashed currentColor',
                                fontWeight: 'bold',
                                letterSpacing: '1px'
                            }}>
                                Code: {offer.code}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Link to="/" className="btn btn-primary">Start Shopping Now</Link>
            </div>
        </div>
    );
};

export default OffersPage;
