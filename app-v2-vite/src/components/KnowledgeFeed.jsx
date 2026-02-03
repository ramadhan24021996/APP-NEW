import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { playTick } from '../utils/haptics';

const KnowledgeFeed = ({ onBack, knowledgeBase, searchTerm, onKnowledgeClick }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isAnalyzingLocal, setIsAnalyzingLocal] = useState(false);

    const displayKnowledge = (knowledgeBase || []).filter(k =>
        !searchTerm ||
        k.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedItem = (knowledgeBase || []).find(k => k.id === selectedId);

    const handleItemClick = (k) => {
        playTick();
        if (onKnowledgeClick) {
            onKnowledgeClick(k);
        } else {
            setSelectedId(k.id);
            setIsAnalyzingLocal(true);
            setTimeout(() => setIsAnalyzingLocal(false), 2000);
        }
    };

    return (
        <div className="animate">
            {onBack && (
                <header className="page-header" style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    padding: '24px 16px',
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <div onClick={() => { playTick(); onBack(); }} className="haptic-click" style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12, display: 'flex' }}>
                            <Icon name="chevron-left" size={20} color="white" />
                        </div>
                        <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'white', letterSpacing: -0.5 }}>Semua Pengetahuan</h1>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginLeft: 44, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Daftar lengkap analisa AI & Google Update</p>
                </header>
            )}

            <div className="container" style={{ padding: '24px 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {displayKnowledge.map((k, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="card haptic-click"
                            onClick={() => handleItemClick(k)}
                            style={{
                                display: 'flex',
                                gap: 16,
                                alignItems: 'center',
                                margin: 0,
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: 20,
                                padding: 16
                            }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${k.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color, flexShrink: 0 }}>
                                <Icon name={k.icon} size={22} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <div style={{ fontSize: 9, padding: '2px 8px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: 20, fontWeight: 800, textTransform: 'uppercase' }}>
                                        TRENDING
                                    </div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{k.trendInfo}</div>
                                </div>
                                <div style={{ fontWeight: 800, fontSize: 14, color: 'white' }}>{k.title}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2, fontWeight: 500 }}>{k.desc}</div>
                            </div>
                            <Icon name="chevron-right" size={16} color="rgba(255,255,255,0.1)" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
                            zIndex: 30000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: 20
                        }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="animate"
                            style={{
                                maxWidth: 650, width: '100%', background: '#0a0c10',
                                borderRadius: 32, border: '1px solid rgba(255,255,255,0.1)',
                                maxHeight: '90vh', overflowY: 'auto', padding: 0,
                                position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                                overflowX: 'hidden'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            {isAnalyzingLocal && (
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    background: '#0a0c10', zIndex: 40000,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    gap: 20
                                }}>
                                    <div className="animate-spin" style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--primary)', borderTopColor: 'transparent' }}></div>
                                    <div style={{ color: 'white', fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>Deep AI Thinking...</div>
                                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500 }}>Correlating Google Search & Internal Knowledge Base</div>
                                </div>
                            )}
                            <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '24px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="brain-circuit" size={24} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 900, color: 'white', letterSpacing: -0.5 }}>Laporan Analisa Deep-AI</div>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Google Data + AI Real-time</div>
                                    </div>
                                </div>
                                <div onClick={() => { playTick(); setSelectedId(null); }} className="haptic-click" style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: '50%', color: 'white' }}><Icon name="x" size={20} /></div>
                            </div>

                            <div style={{ padding: '30px 24px' }}>
                                <div style={{ marginBottom: 30 }}>
                                    <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 2 }}>Informasi Utama</div>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: 'white', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 20, borderLeft: '5px solid var(--primary)' }}>
                                        {selectedItem.question}
                                    </div>
                                </div>

                                <div style={{ marginBottom: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                                    <div className="card" style={{ background: 'rgba(16, 185, 129, 0.03)', padding: 20, borderRadius: 24, border: '1px solid rgba(16, 185, 129, 0.1)', margin: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10B981', marginBottom: 12 }}>
                                            <Icon name="activity" size={18} />
                                            <div style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>Deep AI Engine</div>
                                        </div>
                                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 16 }}>{selectedItem.aiCrawling}</div>
                                        <button
                                            onClick={() => playTick()}
                                            className="haptic-click"
                                            style={{ background: 'rgba(16, 185, 129, 0.1)', border: 'none', borderRadius: 10, color: '#10B981', fontSize: 11, fontWeight: 800, padding: '8px 14px', cursor: 'pointer', width: '100%' }}>
                                            Lihat Resource AI
                                        </button>
                                    </div>
                                    <div className="card" style={{ background: 'rgba(66, 133, 244, 0.03)', padding: 20, borderRadius: 24, border: '1px solid rgba(66, 133, 244, 0.1)', margin: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4285F4', marginBottom: 12 }}>
                                            <Icon name="search" size={18} />
                                            <div style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>Google Insight</div>
                                        </div>
                                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 16 }}>{selectedItem.googleInsight}</div>
                                        <button
                                            onClick={() => { playTick(); window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedItem.title)}`, '_blank'); }}
                                            className="haptic-click"
                                            style={{ background: 'rgba(66, 133, 244, 0.1)', border: 'none', borderRadius: 10, color: '#4285F4', fontSize: 11, fontWeight: 800, padding: '8px 14px', cursor: 'pointer', width: '100%' }}>
                                            Lihat di Google
                                        </button>
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: 24, borderRadius: 28, border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                        <Icon name="clipboard-check" color="var(--primary)" size={20} />
                                        <div style={{ fontSize: 14, fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: 1 }}>Solusi Terkompilasi</div>
                                    </div>
                                    <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, whiteSpace: 'pre-line', fontWeight: 500 }}>
                                        {selectedItem.analysis}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
                                    <button
                                        onClick={() => {
                                            playTick();
                                            navigator.clipboard.writeText(selectedItem.analysis);
                                            alert('Solusi berhasil disalin ke clipboard!');
                                        }}
                                        className="haptic-click"
                                        style={{
                                            flex: 1, padding: '18px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, color: 'white',
                                            fontWeight: 900, fontSize: 15, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                                        }}>
                                        <Icon name="copy" size={20} /> Salin Solusi
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KnowledgeFeed;
