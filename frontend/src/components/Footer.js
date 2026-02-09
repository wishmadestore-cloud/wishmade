import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '24px 0',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            textAlign: 'center',
            color: 'var(--text-muted)'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} WishMade. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
