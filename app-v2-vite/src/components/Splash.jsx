import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import { Column, Box, Spacer } from './Layout';

const Splash = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onFinish, 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <Column className="splash" align="center" justify="center">
            <div className="splash-bg">
                <div className="glow-circle" style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '120%', height: '120%', background: 'rgba(99, 102, 241, 0.15)',
                    borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 3s infinite'
                }}></div>
            </div>

            <Column align="center" className="splash-content animate" style={{ maxWidth: 400 }}>
                <Box style={{
                    width: 160,
                    height: 160,
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        borderRadius: '50%', border: '1px solid rgba(99, 102, 241, 0.3)',
                        animation: 'spin 10s linear infinite'
                    }}></div>
                    <img src="RAMA.jpeg" alt="Rama" style={{
                        width: '90%', height: '90%', objectFit: 'cover', borderRadius: '50%',
                        border: '4px solid rgba(99, 102, 241, 0.5)', 
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        position: 'relative', zIndex: 1
                    }} />
                </Box>

                <Spacer size={40} />

                <h1 style={{ 
                    fontSize: 'clamp(32px, 8vw, 42px)', 
                    fontWeight: 950, 
                    marginBottom: 4, 
                    letterSpacing: -2, 
                    background: 'linear-gradient(to bottom, #fff, #818cf8)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center'
                }}>MR TECH</h1>
                
                <p style={{ 
                    color: '#94a3b8', 
                    fontSize: 12, 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: 6, 
                    textAlign: 'center',
                    opacity: 0.8
                }}>IT Support System</p>

                <Spacer size={60} />

                <Column align="stretch" style={{ width: '100%', maxWidth: 280 }}>
                    <div className="progress-container" style={{ 
                        height: 8, 
                        background: 'rgba(255,255,255,0.03)', 
                        borderRadius: 20, 
                        overflow: 'hidden', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative'
                    }}>
                        <div className="progress-bar" style={{ 
                            width: `${progress}%`, 
                            height: '100%', 
                            background: 'linear-gradient(to right, #6366f1, #c084fc)', 
                            boxShadow: '0 0 25px rgba(99,102,241,0.6)',
                            transition: 'width 0.1s linear'
                        }}></div>
                    </div>
                    
                    <Row justify="center" gap={12} style={{ marginTop: 20 }}>
                        <div className="animate-spin" style={{ 
                            width: 16, height: 16, borderRadius: '50%', 
                            border: '2px solid #6366f1', borderTopColor: 'transparent' 
                        }}></div>
                        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: 1 }}>
                            SYNCING SECURE DATA ({progress}%)
                        </span>
                    </Row>
                </Column>
            </Column>

            <Box style={{ position: 'absolute', bottom: 40, width: '100%' }}>
                <p style={{ 
                    fontSize: 10, color: '#334155', fontWeight: 700, 
                    letterSpacing: 3, textAlign: 'center' 
                }}>POWERED BY DEEP-AI & GOOGLE LENS 4.0</p>
            </Box>
        </Column>
    );
};

export default Splash;
