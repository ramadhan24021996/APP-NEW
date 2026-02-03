import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import Background3D from './Background3D';
import { playTick } from '../utils/haptics';
import { Skeleton } from './Skeleton';

const Pesan = ({ userName, onNavigate }) => {
    const [filter, setFilter] = useState('inbox');
    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState([
        { id: 1, name: 'Natasya Rina', msg: 'Bisa kita diskusi lebih lanjut?', time: '2m', unread: true, image: 'https://i.pravatar.cc/150?u=12' },
        { id: 2, name: 'Budi Santoso', msg: 'Terima kasih atas solusinya!', time: '1h', unread: false, image: 'https://i.pravatar.cc/150?u=1' },
        { id: 3, name: 'Ahmad Rizky', msg: 'Update hardware sudah selesai.', time: '3h', unread: false, image: 'https://i.pravatar.cc/150?u=3' }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id) => {
        playTick();
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            setChats(chats.filter(c => c.id !== id));
        }
    };

    const handleFilterClick = (f) => {
        playTick();
        setFilter(f);
    };

    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate sidebar-page-container">
                <div className="app-sidebar">
                    <div className="sidebar-header">
                        <h2 style={{ fontWeight: 800 }}>Riwayat Diskusi</h2>
                        <p style={{ fontWeight: 600, opacity: 0.6 }}>Chat & Konsultasi</p>
                    </div>
                    <div className="sidebar-menu">
                        {[
                            { id: 'inbox', icon: 'message-circle', label: 'Kotak Masuk' },
                            { id: 'archived', icon: 'archive', label: 'Arsip' },
                            { id: 'contacts', icon: 'users', label: 'Kontak' }
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
                    <header className="mobile-header" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div onClick={() => { playTick(); onNavigate && onNavigate('home'); }} className="haptic-click" style={{ cursor: 'pointer', padding: 8, background: 'rgba(99, 102, 241, 0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chevron-left" size={20} color="var(--primary)" />
                        </div>
                        <h1 style={{ fontSize: 18, fontWeight: 800 }}>Pesan Masuk</h1>
                    </header>
                    <div className="container" style={{ padding: '0 0 24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {isLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="card" style={{ display: 'flex', gap: 15, alignItems: 'center', padding: 15 }}>
                                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Skeleton width="40%" height="14px" />
                                                <Skeleton width="30px" height="10px" />
                                            </div>
                                            <Skeleton width="80%" height="12px" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <AnimatePresence>
                                    {chats.map((c, idx) => (
                                        <motion.div 
                                            key={c.id} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="card haptic-click" 
                                            style={{ 
                                                display: 'flex', 
                                                gap: 15, 
                                                alignItems: 'center', 
                                                background: 'rgba(255, 255, 255, 0.03)', 
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: 20,
                                                padding: 15 
                                            }}
                                        >
                                            <div style={{ position: 'relative' }}>
                                                <img src={c.image} alt={c.name} style={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
                                                {c.unread && <div style={{ position: 'absolute', top: 2, right: 2, width: 12, height: 12, background: '#EF4444', borderRadius: '50%', border: '2px solid var(--bg-card)' }}></div>}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                    <div style={{ fontWeight: 800, fontSize: 14, color: 'white' }}>{c.name}</div>
                                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{c.time} lalu</div>
                                                </div>
                                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{c.msg}</div>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }} 
                                                className="haptic-click"
                                                style={{ padding: 10, background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: 12, color: '#EF4444', cursor: 'pointer' }}
                                            >
                                                <Icon name="trash-2" size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Background3D>
    );
};

export default Pesan;
