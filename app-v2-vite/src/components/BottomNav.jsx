import React from 'react';
import Icon from './Icon';
import { playTick } from '../utils/haptics';

const BottomNav = ({ tab, setTab, setSelectedBidang }) => {
    const handleNavClick = (target, resetBidang = false) => {
        playTick();
        setTab(target);
        if (resetBidang) setSelectedBidang(null);
    };

    return (
        <div className="bottom-nav">
            <div
                className={`nav-item haptic-click ${tab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home', true)}
                data-menu="home"
            >
                <Icon name="home" />
                <span>Home</span>
            </div>
            <div
                className={`nav-item haptic-click ${tab === 'bidang' ? 'active' : ''}`}
                onClick={() => handleNavClick('bidang')}
                data-menu="bidang"
            >
                <Icon name="grid" />
                <span>Bidang</span>
            </div>
            <div
                className={`nav-item haptic-click ${tab === 'pesan' ? 'active' : ''}`}
                onClick={() => handleNavClick('pesan')}
                data-menu="pesan"
            >
                <Icon name="message-circle" />
                <span>Chat</span>
            </div>
            <div
                className={`nav-item haptic-click ${tab === 'notif' ? 'active' : ''}`}
                onClick={() => handleNavClick('notif')}
                data-menu="notif"
            >
                <Icon name="bell" />
                <span>Notif</span>
            </div>
            <div
                className={`nav-item haptic-click ${tab === 'profil' ? 'active' : ''}`}
                onClick={() => handleNavClick('profil')}
                data-menu="profil"
            >
                <Icon name="user" />
                <span>Profil</span>
            </div>
        </div>
    );
};

export default BottomNav;
