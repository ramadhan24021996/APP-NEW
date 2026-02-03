import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import Background3D from './Background3D';
import { playTick } from '../utils/haptics';

const Profil = ({ userName, userRole, bio, photo, activityLog, isPrivate, onTogglePrivate, onLogout, onNavigate, onOpenDB, onOpenUserMan, onUpdateProfile, onDeleteAccount, appLang, onSetLang, theme, onSetTheme, timeZone, onSetTimeZone }) => {
    const [tab, setTab] = useState('ringkasan');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: userName, bio: bio, photo: photo });
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file terlalu besar! Maksimal 2MB.');
            return;
        }
        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditForm(prev => ({ ...prev, photo: reader.result }));
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const texts = {
        id: {
            title: 'Profil Saya', subtitle: 'Kelola akun & preferensi',
            menu_summary: 'Ringkasan', menu_activity: 'Aktivitas', menu_security: 'Keamanan', menu_settings: 'Pengaturan',
            label_name: 'Nama Lengkap', label_bio: 'Bio Singkat', label_save: 'Simpan Perubahan',
            stat_discuss: 'Diskusi', stat_solution: 'Solusi', stat_points: 'Poin',
            skills_title: 'Keahlian IT', activity_title: 'Riwayat Aktivitas', empty_activity: 'Belum ada aktivitas.',
            privacy_title: 'Privasi Akun', privacy_desc: 'Mode privat menyamarkan nama Anda pada daftar anggota publik.',
            pass_title: 'Ganti Password', pass_old: 'Password Lama', pass_new: 'Password Baru', btn_save: 'Simpan',
            pref_display: 'Preferensi Tampilan', lang_label: 'Bahasa / Language', theme_label: 'Tema Aplikasi',
            config_app: 'Konfigurasi Aplikasi', btn_logout: 'Keluar Sesi', btn_delete: 'Hapus Akun Permanen'
        },
        en: {
            title: 'My Profile', subtitle: 'Manage account & preferences',
            menu_summary: 'Summary', menu_activity: 'Activity', menu_security: 'Security', menu_settings: 'Settings',
            label_name: 'Full Name', label_bio: 'Short Bio', label_save: 'Save Changes',
            stat_discuss: 'Discussions', stat_solution: 'Solutions', stat_points: 'Points',
            skills_title: 'IT Skills', activity_title: 'Activity History', empty_activity: 'No activity recorded.',
            privacy_title: 'Account Privacy', privacy_desc: 'Private mode hides your name from public member lists.',
            pass_title: 'Change Password', pass_old: 'Old Password', pass_new: 'New Password', btn_save: 'Save',
            pref_display: 'Display Preferences', lang_label: 'Language / Bahasa', theme_label: 'App Theme',
            config_app: 'App Configuration', btn_logout: 'Log Out', btn_delete: 'Delete Permanent Account'
        }
    };

    const t = texts[appLang] || texts.id;

    useEffect(() => {
        setEditForm({ name: userName, bio: bio, photo: photo });
    }, [userName, bio, photo]);

    const [skills, setSkills] = useState(() => {
        try {
            const saved = localStorage.getItem('bb_user_skills_' + (userName || 'default'));
            return saved ? JSON.parse(saved) : ['Hardware', 'Networking', 'Software Install', 'Windows OS'];
        } catch (e) { return ['Hardware', 'Networking', 'Software Install', 'Windows OS']; }
    });

    const [stats] = useState({ diskusi: 128, solusi: '85%', poin: '1.2k' });
    const [passState, setPassState] = useState({ old: '', new: '' });

    useEffect(() => {
        if (userName) {
            localStorage.setItem('bb_user_skills_' + userName, JSON.stringify(skills));
        }
    }, [skills, userName]);

    const handleTabClick = (newTab) => {
        playTick();
        setTab(newTab);
    };

    const handleAddSkill = () => {
        playTick();
        const newSkill = prompt("Tambah Keahlian Baru (mis: ReactJS, Python):");
        if (newSkill && newSkill.trim()) {
            if (skills.includes(newSkill.trim())) {
                alert('Keahlian sudah ada!');
                return;
            }
            setSkills([...skills, newSkill.trim()]);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        playTick();
        if (confirm(`Hapus keahlian "${skillToRemove}"?`)) {
            setSkills(skills.filter(s => s !== skillToRemove));
        }
    };

    const handleSavePassword = () => {
        playTick();
        if (!passState.old || !passState.new) {
            alert('Mohon isi password lama dan baru.');
            return;
        }
        alert('Password berhasil diperbarui!');
        setPassState({ old: '', new: '' });
    };

    const saveProfileChanges = () => {
        playTick();
        onUpdateProfile && onUpdateProfile(editForm);
        setIsEditing(false);
    };

    const formatRelativeTime = (val) => {
        if (!val) return 'Baru saja';
        if (typeof val === 'string') return val;
        const diff = (Date.now() - val) / 1000;
        if (diff < 60) return 'Baru saja';
        if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
        return `${Math.floor(diff / 86400)} hari lalu`;
    };

    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate sidebar-page-container">
                <div className="app-sidebar">
                    <div className="sidebar-header">
                        <h2 style={{ fontWeight: 800 }}>{t.title}</h2>
                        <p style={{ fontWeight: 600, opacity: 0.6 }}>{t.subtitle}</p>
                    </div>
                    <div className="sidebar-menu">
                        {[
                            { id: 'ringkasan', icon: 'user', label: t.menu_summary },
                            { id: 'aktivitas', icon: 'activity', label: t.menu_activity },
                            { id: 'security', icon: 'shield', label: t.menu_security },
                            { id: 'settings', icon: 'settings', label: t.menu_settings }
                        ].map(item => (
                            <button
                                key={item.id}
                                className={`haptic-click ${tab === item.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(item.id)}
                            >
                                <Icon name={item.icon} size={18} /> {item.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="app-content">
                    <header className="mobile-header" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <div onClick={() => { playTick(); onNavigate && onNavigate('home'); }} className="haptic-click" style={{ cursor: 'pointer', padding: 8, background: 'rgba(99, 102, 241, 0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chevron-left" size={20} color="var(--primary)" />
                        </div>
                        <h1 style={{ fontSize: 24, fontWeight: 900 }}>{t.title}</h1>
                    </header>

                    <AnimatePresence mode="wait">
                        {tab === 'ringkasan' && (
                            <motion.div
                                key="ringkasan"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="animate"
                            >
                                <div className="card" style={{ padding: '30px 24px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', opacity: 0.2, zIndex: 0 }} />

                                    <div onClick={() => { playTick(); setIsEditing(!isEditing); }} className="haptic-click" style={{ position: 'absolute', top: 20, right: 20, padding: 10, background: isEditing ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)', borderRadius: 14, cursor: 'pointer', color: isEditing ? '#EF4444' : 'white', zIndex: 10, backdropFilter: 'blur(10px)' }}>
                                        <Icon name={isEditing ? 'x' : 'edit-3'} size={20} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
                                        <div style={{ position: 'relative', width: 100, height: 100 }}>
                                            <motion.img
                                                layoutId="profile-img"
                                                src={isEditing ? editForm.photo : photo}
                                                alt="profile"
                                                style={{ width: '100%', height: '100%', borderRadius: 28, objectFit: 'cover', border: '3px solid var(--primary)', padding: 3 }}
                                            />
                                            <div style={{ position: 'absolute', bottom: -5, right: -5, width: 28, height: 28, background: '#10B981', borderRadius: '50%', border: '4px solid #0f172a' }}></div>
                                        </div>

                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            {isEditing ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '0 auto' }}>
                                                    <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Nama Lengkap" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: 14, color: 'white', fontWeight: 600 }} />
                                                    <textarea value={editForm.bio} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} placeholder="Bio Singkat" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: 14, color: 'white', fontWeight: 500, minHeight: 80, resize: 'none' }} />
                                                    <button onClick={saveProfileChanges} className="haptic-click" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '14px', borderRadius: 14, cursor: 'pointer', fontWeight: 800, marginTop: 8 }}>Simpan Perubahan</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6, letterSpacing: -1 }}>{userName || 'Karyawan'}</h2>
                                                    <div style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{userRole}</div>
                                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.5, maxWidth: 500, margin: '0 auto' }}>{bio || 'Solusi TI Anda dimulai di sini.'}</div>
                                                </>
                                            )}
                                        </div>

                                        {!isEditing && (
                                            <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 10 }}>
                                                {[
                                                    { icon: 'message-circle', label: t.stat_discuss, val: stats.diskusi, color: '#3B82F6' },
                                                    { icon: 'check-circle', label: t.stat_solution, val: stats.solusi, color: '#10B981' },
                                                    { icon: 'award', label: t.stat_points, val: stats.poin, color: '#F59E0B' }
                                                ].map((s, i) => (
                                                    <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '16px 12px', borderRadius: 20, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <div style={{ fontWeight: 900, fontSize: 18, color: s.color }}>{s.val}</div>
                                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ marginTop: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                        <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t.skills_title}</h3>
                                        <div onClick={handleAddSkill} className="haptic-click" style={{ padding: '6px 14px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 10, color: 'var(--primary)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>+ Tambah</div>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                        {skills.map(s => (
                                            <motion.div
                                                key={s}
                                                whileHover={{ scale: 1.05 }}
                                                className="haptic-click"
                                                onClick={() => handleRemoveSkill(s)}
                                                style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 13, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                                            >
                                                {s} <Icon name="x" size={14} opacity={0.3} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {tab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="animate"
                            >
                                <div className="card" style={{ padding: 24, borderRadius: 24, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>{t.pref_display}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 16 }}>
                                        <div style={{ fontWeight: 600 }}>{t.lang_label}</div>
                                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: 4, borderRadius: 12 }}>
                                            <button onClick={() => { playTick(); onSetLang('id'); }} className="haptic-click" style={{ background: appLang === 'id' ? 'var(--primary)' : 'transparent', color: 'white', border: 'none', padding: '6px 16px', borderRadius: 9, fontWeight: 800, fontSize: 12 }}>ID</button>
                                            <button onClick={() => { playTick(); onSetLang('en'); }} className="haptic-click" style={{ background: appLang === 'en' ? 'var(--primary)' : 'transparent', color: 'white', border: 'none', padding: '6px 16px', borderRadius: 9, fontWeight: 800, fontSize: 12 }}>EN</button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 24 }}>
                                    <button onClick={() => { playTick(); onLogout(); }} className="haptic-click" style={{ width: '100%', padding: 18, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 20, color: '#EF4444', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                        <Icon name="log-out" size={20} /> {t.btn_logout}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Background3D>
    );
};

export default Profil;
