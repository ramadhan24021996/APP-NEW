import React, { useState } from 'react';
import Icon from './Icon';
import Background3D from './Background3D';

const Bantuan = ({ onNavigate }) => {
    const [tab, setTab] = useState('umum');
    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate sidebar-page-container">
                <div className="app-sidebar">
                    <div className="sidebar-header">
                        <h2>Pusat Bantuan</h2>
                        <p>Support Center</p>
                    </div>
                    <div className="sidebar-menu">
                        <button className={tab === 'umum' ? 'active' : ''} onClick={() => setTab('umum')}><Icon name="info" size={18} /> Umum</button>
                        <button className={tab === 'faq' ? 'active' : ''} onClick={() => setTab('faq')}><Icon name="help-circle" size={18} /> FAQ</button>
                        <button className={tab === 'contact' ? 'active' : ''} onClick={() => setTab('contact')}><Icon name="mail" size={18} /> Hubungi Kami</button>
                    </div>
                </div>
                <div className="app-content">
                    <header className="mobile-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer', padding: 8, background: 'rgba(99, 102, 241, 0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chevron-left" size={20} color="var(--primary)" />
                        </div>
                        <h1 style={{ fontSize: 18, fontWeight: 800 }}>Pusat Bantuan</h1>
                    </header>
                    <div className="container" style={{ padding: '0 0 24px' }}>
                        <div className="card" style={{ background: 'var(--bg-card)', padding: 25, borderRadius: 20 }}>
                            <h2 style={{ marginBottom: 15 }}>{tab === 'umum' ? 'Selamat Datang di Support Center' : tab === 'faq' ? 'Pertanyaan Umum' : 'Hubungi Tim Support'}</h2>
                            <p style={{ color: 'var(--text-gray)', lineHeight: 1.6 }}>
                                {tab === 'umum' ? 'Platform ini dirancang untuk memudahkan sinkronisasi pengetahuan IT di seluruh departemen.' :
                                 tab === 'faq' ? 'Bagaimana cara menambahkan solusi baru? Anda bisa masuk ke bidang tertentu dan klik tombol Tambah Pengetahuan.' :
                                 'Email kami di support@mrtech.com atau hubungi admin via pesan internal.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Background3D>
    );
};

export default Bantuan;
