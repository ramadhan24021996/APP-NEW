import React, { useState } from 'react';
import Icon from './Icon';
import { Column, Row, Box, Spacer } from './Layout';
import { playTick } from '../utils/haptics';

const Auth = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        playTick();
        onLogin({ name, email, password, isRegister });
    };

    const toggleMode = () => {
        playTick();
        setIsRegister(!isRegister);
    };

    return (
        <Column className="onboarding" align="center" justify="center">
            <div className="onboarding-bg">
                <div className="orb orb-1" style={{ background: isRegister ? '#8B5CF6' : '#6366f1' }}></div>
                <div className="orb orb-2" style={{ background: isRegister ? '#D946EF' : '#4F46E5', animationDelay: '-2s' }}></div>
            </div>

            <Column className="onboarding-content animate" align="stretch" style={{ maxWidth: 420 }}>
                <Column align="center" style={{ marginBottom: 40 }}>
                    <Box style={{
                        width: 80, height: 80, borderRadius: 24, background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)', color: 'white',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}>
                        <Icon name={isRegister ? "user-plus" : "lock"} size={36} />
                    </Box>
                    <Spacer size={24} />
                    <h1 style={{ fontSize: 'clamp(28px, 6vw, 32px)', fontWeight: 950, color: 'white', letterSpacing: -1 }}>
                        {isRegister ? 'Buat Akun' : 'Masuk Sistem'}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 500, marginTop: 8 }}>
                        {isRegister ? 'Daftar untuk akses fitur IT Support' : 'Gunakan akun terdaftar Anda'}
                    </p>
                </Column>

                <form onSubmit={handleSubmit}>
                    <Column gap={16}>
                        {isRegister && (
                            <Box style={{ width: '100%' }}>
                                <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
                                    <Icon name="user" size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%', padding: '18px 20px 18px 56px', borderRadius: 20,
                                        background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'white', fontSize: 15, fontWeight: 600, outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    className="auth-input"
                                    required
                                />
                            </Box>
                        )}

                        <Box style={{ width: '100%' }}>
                            <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
                                <Icon name="mail" size={20} />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Perusahaan"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '18px 20px 18px 56px', borderRadius: 20,
                                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white', fontSize: 15, fontWeight: 600, outline: 'none',
                                    transition: 'all 0.3s'
                                }}
                                className="auth-input"
                                required
                            />
                        </Box>

                        <Box style={{ width: '100%' }}>
                            <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
                                <Icon name="key" size={20} />
                            </div>
                            <input
                                type="password"
                                placeholder="Kata Sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '18px 20px 18px 56px', borderRadius: 20,
                                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white', fontSize: 15, fontWeight: 600, outline: 'none',
                                    transition: 'all 0.3s'
                                }}
                                className="auth-input"
                                required
                            />
                        </Box>

                        {!isRegister && (
                            <Row justify="flex-end">
                                <span onClick={() => playTick()} style={{ fontSize: 13, color: '#818cf8', fontWeight: 700, cursor: 'pointer', opacity: 0.8 }} className="haptic-click">
                                    Lupa Password?
                                </span>
                            </Row>
                        )}

                        <Spacer size={10} />

                        <button type="submit" className="btn-primary haptic-click" style={{
                            width: '100%', padding: '20px', borderRadius: 24, fontSize: 16, fontWeight: 800,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.25)', border: 'none', cursor: 'pointer', color: 'white'
                        }}>
                            {isRegister ? 'DAFTAR SEKARANG' : 'MASUK KE DASHBOARD'}
                            <Icon name="arrow-right" size={22} />
                        </button>
                    </Column>
                </form>

                <Spacer size={40} />

                <Row justify="center">
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600 }}>
                        {isRegister ? 'Sudah punya akun?' : 'Belum memiliki akun?'}
                        <span
                            onClick={toggleMode}
                            className="haptic-click"
                            style={{ color: '#818cf8', fontWeight: 800, marginLeft: 8, cursor: 'pointer' }}
                        >
                            {isRegister ? 'Masuk di sini' : 'Daftar Sekarang'}
                        </span>
                    </p>
                </Row>
            </Column>

            <Box style={{ position: 'absolute', bottom: 40, opacity: 0.2 }}>
                <p style={{ fontSize: 10, color: 'white', letterSpacing: 3, fontWeight: 700 }}>
                    MR TECH SECURE AUTHENTICATION v4.0
                </p>
            </Box>
        </Column>
    );
};

export default Auth;
