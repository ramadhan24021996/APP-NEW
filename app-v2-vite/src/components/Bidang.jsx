import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import Background3D from './Background3D';
import { CATEGORIES } from '../constants';
import { playTick } from '../utils/haptics';
import { Skeleton } from './Skeleton';

const Bidang = ({ onBidangClick, getCategoryCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredCategories = CATEGORIES.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCardClick = (cat) => {
        playTick();
        if (onBidangClick) onBidangClick(cat);
    };

    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate">
                <header className="page-header" style={{
                    padding: '12px 16px 20px', borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'white', letterSpacing: -0.5 }}>Bidang IT</h1>
                    <div className="search-bar" style={{
                        background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.1)',
                        marginTop: 12, padding: '10px 14px', borderRadius: 16, backdropFilter: 'blur(10px)'
                    }}>
                        <Icon name="search" color="white" size={18} />
                        <input
                            type="text"
                            placeholder="Cari bidang keahlianmu..."
                            style={{ color: 'white', fontSize: 14, fontWeight: '600' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>
                <div className="container" style={{ padding: '24px 16px' }}>
                    <div className="grid-responsive" style={{ gap: 16 }}>
                        {isLoading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="card" style={{ height: 160, borderRadius: 24 }}>
                                    <Skeleton height="100%" borderRadius="24px" />
                                </div>
                            ))
                        ) : (
                            filteredCategories.map((cat, idx) => (
                                <motion.div
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="card bidang-card haptic-click"
                                    onClick={() => handleCardClick(cat)}
                                    style={{
                                        '--glow-color': cat.color,
                                        position: 'relative',
                                        borderRadius: 24,
                                        padding: '24px 16px',
                                        background: 'rgba(22, 27, 34, 0.4)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div className="category-glow-bg"></div>
                                    <div className="icon-container-3d" style={{ width: 60, height: 60, marginBottom: 16, margin: '0 auto 16px' }}>
                                        <div className="icon-box" style={{ fontSize: '32px', borderRadius: 18, background: `linear-gradient(135deg, ${cat.color}, var(--secondary))` }}>
                                            {cat.icon}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: '800',
                                        color: 'white',
                                        marginBottom: 4,
                                        zIndex: 10
                                    }}>{cat.name}</div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontWeight: 600,
                                        zIndex: 10
                                    }}>{getCategoryCount ? getCategoryCount(cat.name) : 0} TOPIK AKTIF</div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Background3D>
    );
};

export default Bidang;
