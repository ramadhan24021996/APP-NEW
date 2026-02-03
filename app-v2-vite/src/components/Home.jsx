import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import Background3D from './Background3D';
import { playTick, playCoin } from '../utils/haptics';

const Home = ({ userName, userRole, checkPermission, onCreateQuestion, onBidangClick, onNavigate, onOpenDB, onLogout, knowledgeBase, getCategoryCount, categories, KnowledgeFeed, points = 0 }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSource, setSearchSource] = useState('internal'); // internal, google, chatgpt, youtube
    const [showSourceSelector, setShowSourceSelector] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [selectedKnowledge, setSelectedKnowledge] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [prevPoints, setPrevPoints] = useState(points);
    const [showPointAnim, setShowPointAnim] = useState(false);

    useEffect(() => {
        if (points > prevPoints) {
            setShowPointAnim(true);
            playCoin();
            const timer = setTimeout(() => setShowPointAnim(false), 2000);
            return () => clearTimeout(timer);
        }
        setPrevPoints(points);
    }, [points]);

    const searchSources = [
        { id: 'internal', name: 'Internal', icon: 'search', color: 'var(--primary)', placeholder: 'Cari bidang...' },
        { id: 'google', name: 'Google', icon: 'globe', color: '#4285F4', placeholder: 'Ketik & cari di Google...' },
        { id: 'chatgpt', name: 'ChatGPT', icon: 'zap', color: '#10a37f', placeholder: 'Tanya AI (ChatGPT)...' },
        { id: 'youtube', name: 'YouTube', icon: 'video', color: '#FF0000', placeholder: 'Cari panduan video...' }
    ];

    const activeSource = searchSources.find(s => s.id === searchSource);

    const handleSearchAction = () => {
        playTick();
        const query = searchTerm.trim();
        if (searchSource === 'google') {
            window.open(query ? `https://www.google.com/search?q=${encodeURIComponent(query)}` : 'https://www.google.com', '_blank');
        } else if (searchSource === 'chatgpt') {
            window.open(query ? `https://chatgpt.com/?q=${encodeURIComponent(query)}` : 'https://chatgpt.com', '_blank');
        } else if (searchSource === 'youtube') {
            window.open(query ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}` : 'https://www.youtube.com', '_blank');
        }
    };

    const filteredBidang = (categories || []).filter(b => {
        if (searchSource !== 'internal') return true;
        return b.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        const handleClickOutside = () => {
            setShowSourceSelector(false);
            setShowMoreMenu(false);
        };
        if (showSourceSelector || showMoreMenu) {
            window.addEventListener('click', handleClickOutside);
            return () => window.removeEventListener('click', handleClickOutside);
        }
    }, [showSourceSelector, showMoreMenu]);

    const globalShare = async (data) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: data.title,
                    text: data.text,
                    url: data.id ? `${window.location.origin}/knowledge/${data.id}` : window.location.href
                });
            } catch (err) {
                if (err.name !== 'AbortError') console.error('Share failed:', err);
            }
        } else {
            const shareText = `${data.title}\n${data.text}\n${window.location.href}`;
            try {
                await navigator.clipboard.writeText(shareText);
                alert('✓ Berhasil disalin ke clipboard!');
            } catch (err) {
                alert('Gagal menyalin.');
            }
        }
    };

    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate">
                <header className="page-header" style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    padding: '12px 16px 16px',
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    background: `linear-gradient(135deg, ${searchSource === 'internal' ? 'rgba(10, 12, 16, 0.85)' : activeSource.color + 'aa'}, rgba(22, 27, 34, 0.85))`,
                    backdropFilter: 'blur(30px)',
                    transition: 'all 0.5s ease',
                    boxShadow: `0 15px 30px rgba(0,0,0,0.3)`,
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                onClick={() => { playTick(); onNavigate('profil'); }}
                                style={{ position: 'relative', cursor: 'pointer' }}
                            >
                                <img src="RAMA.jpeg" style={{ width: 44, height: 44, borderRadius: 14, border: '2px solid var(--primary)', padding: 2 }} alt="Avatar" />
                                <div style={{ position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: '50%', background: '#10B981', border: '2px solid var(--bg-card)' }}></div>
                            </motion.div>
                            <div>
                                <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'white', letterSpacing: -0.5 }}>Beranda</h1>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: -2, fontWeight: 600 }}>
                                    {userName || 'Karyawan'} • <span style={{ color: 'var(--primary)' }}>{userRole}</span>
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    background: 'rgba(251, 191, 36, 0.15)',
                                    padding: '6px 14px',
                                    borderRadius: 16,
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    position: 'relative',
                                    cursor: 'default'
                                }}
                            >
                                <motion.div
                                    animate={showPointAnim ? { rotateY: 360, scale: [1, 1.3, 1] } : {}}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Icon name="award" color="#fbbf24" size={18} />
                                </motion.div>
                                <span style={{ color: '#fbbf24', fontWeight: 800, fontSize: 14 }}>{points}</span>

                                <AnimatePresence>
                                    {showPointAnim && (
                                        <motion.div
                                            initial={{ y: 0, opacity: 1 }}
                                            animate={{ y: -40, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            style={{ position: 'absolute', right: 0, color: '#fbbf24', fontWeight: 800, fontSize: 20 }}
                                        >
                                            +50
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <div style={{ position: 'relative' }}>
                                <motion.div
                                    whileTap={{ scale: 0.9, rotate: 15 }}
                                    onClick={(e) => { e.stopPropagation(); playTick(); setShowMoreMenu(!showMoreMenu); }}
                                    style={{
                                        cursor: 'pointer',
                                        width: 40,
                                        height: 40,
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: 14,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <Icon name="grid" size={20} />
                                </motion.div>

                                <AnimatePresence>
                                    {showMoreMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            style={{
                                                position: 'absolute',
                                                top: 'calc(100% + 12px)',
                                                right: 0,
                                                zIndex: 10000,
                                                width: 220,
                                                padding: 10,
                                                background: 'rgba(15, 23, 42, 0.95)',
                                                borderRadius: 20,
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                backdropFilter: 'blur(30px)',
                                                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {[
                                                { icon: 'user', label: 'Profil Saya', color: '#3B82F6', target: 'profil' },
                                                { icon: 'bell', label: 'Notifikasi', color: '#F59E0B', target: 'notif' },
                                                { icon: 'message-circle', label: 'Riwayat Diskusi', color: '#8B5CF6', target: 'pesan' },
                                                { type: 'divider' },
                                                ...(checkPermission('create_user') ? [{ icon: 'database', label: 'Database', color: '#10B981', action: 'opendb' }] : []),
                                                { icon: 'power', label: 'Log Out', color: '#EF4444', action: 'logout' }
                                            ].map((item, idx) => (
                                                item.type === 'divider' ? (
                                                    <div key={idx} style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '6px 12px' }} />
                                                ) : (
                                                    <div
                                                        key={idx}
                                                        className="haptic-click"
                                                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 14, cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); playTick(); setShowMoreMenu(false);
                                                            if (item.action === 'logout') onLogout();
                                                            else if (item.action === 'opendb') onOpenDB();
                                                            else if (item.target) onNavigate(item.target);
                                                        }}
                                                    >
                                                        <Icon name={item.icon} size={16} color={item.color} />
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{item.label}</span>
                                                    </div>
                                                )
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div className="search-bar" style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: `1.5px solid ${searchSource === 'internal' ? 'rgba(255,255,255,0.1)' : activeSource.color}`,
                            marginTop: 10,
                            borderRadius: 18,
                            padding: '10px 14px',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: searchSource === 'internal' ? 'none' : `0 0 20px ${activeSource.color}33`,
                        }}>
                            <div onClick={(e) => { e.stopPropagation(); playTick(); setShowSourceSelector(!showSourceSelector); }} className="haptic-click" style={{ cursor: 'pointer', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, marginRight: 8, border: `1px solid ${searchSource === 'internal' ? 'rgba(255,255,255,0.1)' : activeSource.color + '44'}` }}>
                                <Icon name={activeSource.icon} color={searchSource === 'internal' ? 'white' : activeSource.color} size={18} />
                                <Icon name="chevron-down" size={12} color="rgba(255,255,255,0.4)" />
                            </div>
                            <input type="text" placeholder={activeSource.placeholder} style={{ color: 'white', fontWeight: '600', fontSize: 14 }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearchAction()} />
                            {searchTerm && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={handleSearchAction} style={{ cursor: 'pointer', padding: '8px', background: activeSource.color, borderRadius: 12, marginLeft: 8, boxShadow: `0 4px 12px ${activeSource.color}66` }}>
                                    <Icon name="search" size={18} color="white" />
                                </motion.div>
                            )}
                        </div>

                        <AnimatePresence>
                            {showSourceSelector && (
                                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, right: 0, zIndex: 1000, padding: 10, background: 'rgba(15, 23, 42, 0.95)', borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: `1px solid rgba(255,255,255,0.1)`, backdropFilter: 'blur(20px)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                        {searchSources.map(s => (
                                            <motion.div key={s.id} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); playTick(); setSearchSource(s.id); setShowSourceSelector(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', borderRadius: 16, cursor: 'pointer', background: searchSource === s.id ? `${s.color}22` : 'rgba(255,255,255,0.03)', border: `1px solid ${searchSource === s.id ? s.color + '44' : 'transparent'}` }}>
                                                <Icon name={s.icon} color={s.color} size={18} />
                                                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{s.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                <div className="container" style={{ padding: '24px 16px 40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>Bidang Favorit</h3>
                        <motion.div whileTap={{ scale: 0.9 }} onClick={() => { playTick(); onNavigate('bidang'); }} style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                            Lihat Semua <Icon name="arrow-right" size={14} />
                        </motion.div>
                    </div>

                    <div className="favorites-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
                        {filteredBidang.map((b, idx) => (
                            <motion.div key={b.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.95 }} className="card bidang-card haptic-click" style={{ '--glow-color': b.color, padding: '24px 16px', cursor: 'pointer', borderRadius: 24, background: 'rgba(22, 27, 34, 0.4)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', textAlign: 'center' }} onClick={() => { playTick(); onBidangClick && onBidangClick(b); }}>
                                <div className="category-glow-bg"></div>
                                <div className="icon-container-3d" style={{ width: 60, height: 60, marginBottom: 16, margin: '0 auto 16px' }}>
                                    <div className="icon-box" style={{ fontSize: '32px', borderRadius: 18, background: `linear-gradient(135deg, ${b.color}, var(--secondary))` }}>{b.icon}</div>
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: 4 }}>{b.name}</div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{getCategoryCount ? getCategoryCount(b.name) : 0} Topik Aktif</div>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ marginTop: 40 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div>
                                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Deep-AI Analysis Base</h3>
                                <p style={{ fontSize: 11, color: 'var(--text-gray)', marginTop: 4 }}>Validasi otomatis tiap 24 jam</p>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Eksplorasi</div>
                        </div>
                        <KnowledgeFeed
                            searchTerm={searchSource === 'internal' ? searchTerm : ''}
                            knowledgeBase={knowledgeBase}
                            onKnowledgeClick={(k) => {
                                playTick();
                                setSelectedKnowledge(k);
                                setIsAnalyzing(true);
                                setTimeout(() => setIsAnalyzing(false), 2000);
                            }}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {selectedKnowledge && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(15px)', zIndex: 30000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setSelectedKnowledge(null)}>
                            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} style={{ maxWidth: 650, width: '100%', background: '#0f172a', borderRadius: 32, border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 0 80px rgba(99, 102, 241, 0.3)' }} onClick={e => e.stopPropagation()}>
                                {isAnalyzing && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.98)', zIndex: 40000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                                        <div className="animate-spin" style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--primary)', borderTopColor: 'transparent' }}></div>
                                        <div style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>AI Sedang Menganalisa...</div>
                                    </div>
                                )}
                                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '24px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                        <Icon name="brain-circuit" size={24} color="white" />
                                        <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>Deep-AI Analysis</div>
                                    </div>
                                    <div onClick={() => setSelectedKnowledge(null)} style={{ cursor: 'pointer', color: 'white' }}><Icon name="x" size={20} /></div>
                                </div>
                                <div style={{ padding: 30 }}>
                                    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 20 }}>{selectedKnowledge.title || selectedKnowledge.question}</h2>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', marginBottom: 24 }}>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>SOLUSI AI</div>
                                        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{selectedKnowledge.analysis || selectedKnowledge.text}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <button onClick={() => { playTick(); globalShare(selectedKnowledge); }} style={{ flex: 1, padding: '16px', background: 'var(--primary)', borderRadius: 16, color: 'white', fontWeight: 800, border: 'none', cursor: 'pointer' }}>Bagikan Solusi</button>
                                        <button onClick={() => setSelectedKnowledge(null)} style={{ flex: 1, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 16, color: 'white', fontWeight: 800, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Tutup</button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="fab haptic-click" onClick={() => { playTick(); onCreateQuestion(); }}>
                    <Icon name="plus" color="white" size={28} />
                </div>
            </div>
        </Background3D>
    );
};

export default Home;
