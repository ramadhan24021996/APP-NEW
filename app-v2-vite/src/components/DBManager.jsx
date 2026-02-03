import React from 'react';

const DBManager = ({ onClose }) => (
    <div className="db-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ padding: 30, maxWidth: 500, width: '90%', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--primary)' }}>
            <h3 style={{ marginBottom: 20, color: 'white' }}>Database Manager (Coming Soon)</h3>
            <p style={{ color: 'var(--text-gray)', marginBottom: 20 }}>
                This module will integrate with Real-time synchronization to manage application data.
            </p>
            <button
                onClick={onClose}
                style={{
                    padding: '12px 24px',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: 12,
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Close
            </button>
        </div>
    </div>
);

export default DBManager;
