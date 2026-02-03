import React from 'react';
import Icon from './Icon';
import { playTick } from '../utils/haptics';

const Sidebar = ({ tab, setTab, setSelectedBidang, userName, userPhoto }) => {
    const handleNavClick = (target, resetBidang = false) => {
        playTick();
        setTab(target);
        if (resetBidang) setSelectedBidang(null);
    };

    return (
        <div className="sidebar">
            <div style={{ marginBottom: 40, padding: '0 12px', textAlign: 'center' }}>
                <img
                    src={userPhoto || "RAMA.jpeg"}
                    alt={userName}
                    className="haptic-click"
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        border: '3px solid var(--primary)',
                        padding: '3px',
                        background: 'rgba(255,255,255,0.1)',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleNavClick('profil')}
                    onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userName || 'User') + "&background=0D8ABC&color=fff";
                    }}
                />
                <div style={{ marginTop: 12, fontWeight: 700, fontSize: 14 }}>{userName}</div>
            </div>

            <div className={`nav-item haptic-click ${tab === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home', true)}>
                <Icon name="home" /> <span>Beranda</span>
            </div>
            <div className={`nav-item haptic-click ${tab === 'bidang' ? 'active' : ''}`} onClick={() => handleNavClick('bidang')}>
                <Icon name="grid" /> <span>Bidang</span>
            </div>
            <div className={`nav-item haptic-click ${tab === 'pesan' ? 'active' : ''}`} onClick={() => handleNavClick('pesan')}>
                <Icon name="message-circle" /> <span>Pesan</span>
            </div>
            <div className={`nav-item haptic-click ${tab === 'anggota' ? 'active' : ''}`} onClick={() => handleNavClick('anggota')}>
                <Icon name="users" /> <span>Anggota</span>
            </div>
            <div className={`nav-item haptic-click ${tab === 'notif' ? 'active' : ''}`} onClick={() => handleNavClick('notif')}>
                <Icon name="bell" /> <span>Notifikasi</span>
            </div>
            <div className={`nav-item haptic-click ${tab === 'profil' ? 'active' : ''}`} onClick={() => handleNavClick('profil')}>
                <Icon name="user" /> <span>Profil</span>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div className={`nav-item haptic-click ${tab === 'bantuan' ? 'active' : ''}`} onClick={() => handleNavClick('bantuan')}>
                    <Icon name="help-circle" /> <span>Bantuan</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
