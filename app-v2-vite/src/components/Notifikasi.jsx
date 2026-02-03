import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import Background3D from './Background3D';
import { playTick } from '../utils/haptics';
import { Skeleton } from './Skeleton';

const Notifikasi = ({ onNavigate, notifications = [], onNotificationClick, setNotifications }) => {
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id) => {
        playTick();
        if (confirm('Hapus notifikasi ini?')) {
            setNotifications(notifications.filter(n => n.id !== id));
        }
    };

    const clearAll = () => {
        playTick();
        if (confirm('Hapus semua notifikasi?')) {
            setNotifications([]);
        }
    };

    const handleFilterClick = (f) => {
        playTick();
        setFilter(f);
    };

    const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate sidebar-page-container">
                <div className="app-sidebar">
                    <div className="sidebar-header">
                        <h2 style={{ fontWeight: 800 }}>Notifikasi</h2>
                    </div>
                    <div className="sidebar-menu">
                        {[
                            { id: 'all', icon: 'inbox', label: 'Semua' },
                            { id: 'message', icon: 'message-circle', label: 'Pesan & Diskusi' },
                            { id: 'award', icon: 'award', label: 'Pencapaian' },
                            { id: 'info', icon: 'info', label: 'Sistem' }
                        ].map(item => (
                            <button
                                key={item.id}
                                className={`haptic-click ${filter === item.id ? 'active' : ''}`}
                                onClick={() => handleFilterClick(item.id)}
                            >
                                <Icon name={item.icon} size={18} /> {item.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="app-content">
                    <header className="mobile-header" style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div onClick={() => { playTick(); onNavigate && onNavigate('home'); }} className="haptic-click" style={{ cursor: 'pointer', padding: 8, background: 'rgba(99, 102, 241, 0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="chevron-left" size={20} color="var(--primary)" />
                            </div>
                            <h1 style={{ fontWeight: 800 }}>Notifikasi</h1>
                        </div>
                        <div onClick={clearAll} className="haptic-click" style={{ cursor: 'pointer', color: '#EF4444', padding: 8 }} title="Hapus Semua">
                            <Icon name="trash-2" size={20} />
                        </div>
                    </header>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px' }}>
                                    <Skeleton width="44px" height="44px" borderRadius="12px" />
                                    <div style={{ flex: 1 }}>
                                        <Skeleton width="60%" height="14px" marginBottom="8px" />
                                        <Skeleton width="90%" height="12px" />
                                    </div>
                                </div>
                            ))
                        ) : filtered.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ color: 'var(--text-gray)', textAlign: 'center', marginTop: 40, fontWeight: 600 }}
                            >
                                Tidak ada notifikasi di kategori ini.
                            </motion.div>
                        ) : (
                            <AnimatePresence>
                                {filtered.map((n, idx) => (
                                    <motion.div
                                        key={n.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="card haptic-click"
                                        onClick={() => { playTick(); onNotificationClick && onNotificationClick(n); }}
                                        style={{
                                            display: 'flex',
                                            gap: 16,
                                            alignItems: 'center',
                                            margin: 0,
                                            cursor: 'pointer',
                                            borderLeft: n.unread ? '3px solid var(--primary)' : 'none',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                            borderRadius: 20,
                                            padding: '16px'
                                        }}
                                    >
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                                            <Icon name={n.type === 'message' ? 'message-square' : n.type === 'award' ? 'award' : 'bell'} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: 14, color: 'white' }}>{n.title}</div>
                                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2, fontWeight: 500 }}>{n.desc}</div>
                                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 6, fontWeight: 700 }}>{n.time}</div>
                                        </div>
                                        <div
                                            onClick={(e) => { e.stopPropagation(); handleDelete(n.id); }}
                                            className="haptic-click"
                                            style={{ padding: 8, color: '#EF4444', opacity: 0.6, cursor: 'pointer' }}
                                        >
                                            <Icon name="trash-2" size={18} />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </Background3D>
    );
};

export default Notifikasi;
