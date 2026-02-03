import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import Background3D from './Background3D';
import { redis } from '../utils/redis';
import { playTick } from '../utils/haptics';
import { Skeleton } from './Skeleton';

const Anggota = ({ isPrivateMode, registeredUsers = [], onNavigate, userName, friends = [], onUpdateFriends }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('semua');
    const [selectedMember, setSelectedMember] = useState(null);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [groups, setGroups] = useState(() => redis.get('groups_db', []));
    const [allMembers, setAllMembers] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const demoMembers = [
                { id: 101, name: 'Budi Santoso', role: 'IT Support Senior', status: 'Online', isFriend: true, email: 'budi.s@mrtech.com', items: 23, image: 'https://i.pravatar.cc/150?u=1', isPrivate: false, weeklyStats: [4, 2, 6, 8, 2, 9, 14] },
                { id: 102, name: 'Siti Aminah', role: 'Database Admin', status: 'Baru Bergabung', isFriend: false, email: 'siti.a@mrtech.com', items: 5, image: 'https://i.pravatar.cc/150?u=2', isPrivate: true, weeklyStats: [1, 2, 3, 4, 1, 2, 1] }
            ];

            const realMembers = registeredUsers.map(u => ({
                id: u.id,
                name: u.name,
                role: u.role || 'User Baru',
                status: 'Online',
                isFriend: (friends || []).includes(u.id),
                email: u.email || 'user@local.com',
                items: u.items || 1,
                image: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random`,
                isPrivate: false,
                weeklyStats: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10))
            }));

            let combined = [...realMembers];
            demoMembers.forEach(dm => {
                if (!combined.some(c => c.name === dm.name)) {
                    combined.push(dm);
                }
            });

            setAllMembers(combined.map(m => ({ ...m, isFriend: (friends || []).includes(m.id) })).sort((a, b) => b.items - a.items));
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [registeredUsers, friends]);

    const filteredMembers = allMembers.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeTab === 'teman') return matchesSearch && m.isFriend;
        return matchesSearch;
    });

    const handleAddFriend = (member) => {
        playTick();
        const isFriend = (friends || []).includes(member.id);
        if (!isFriend) {
            onUpdateFriends([...(friends || []), member.id]);
        }
    };

    const handleCreateGroup = (e) => {
        e.preventDefault();
        playTick();
        const name = e.target.groupName.value;
        const desc = e.target.groupDesc.value;
        if (!name) return;
        const currentUser = userName || 'Anda';
        const newGroup = {
            id: Date.now(),
            name,
            desc: desc || 'Grup diskusi baru',
            members: 1,
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
            admins: [currentUser],
            createdBy: currentUser
        };
        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        redis.set('groups_db', updatedGroups);
        setOpenCreateGroup(false);
    };

    const handleTabClick = (t) => {
        playTick();
        setActiveTab(t);
    };

    return (
        <Background3D color1="var(--primary)" color2="var(--secondary)">
            <div className="animate">
                <header className="page-header" style={{
                    padding: '24px 16px 0',
                    background: 'linear-gradient(to right, #6366f1, #ec4899)',
                    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'white', letterSpacing: -1 }}>Anggota & Grup</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Kelola koneksi dan grup kerja Anda.</p>

                    <div className="search-bar" style={{
                        background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.1)',
                        marginTop: 20, padding: '12px 16px', borderRadius: 16, backdropFilter: 'blur(10px)'
                    }}>
                        <Icon name="search" color="rgba(255,255,255,0.7)" size={18} />
                        <input
                            type="text"
                            placeholder="Cari anggota atau grup..."
                            style={{ color: 'white', fontSize: 14, fontWeight: 600 }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 28, marginTop: 24, overflowX: 'auto', paddingBottom: 4 }}>
                        {['semua', 'teman', 'grup'].map(t => (
                            <div
                                key={t}
                                onClick={() => handleTabClick(t)}
                                className="haptic-click"
                                style={{
                                    paddingBottom: 12,
                                    cursor: 'pointer',
                                    borderBottom: activeTab === t ? '4px solid white' : '4px solid transparent',
                                    fontWeight: activeTab === t ? 800 : 600,
                                    color: activeTab === t ? 'white' : 'rgba(255,255,255,0.6)',
                                    textTransform: 'uppercase',
                                    fontSize: 12,
                                    letterSpacing: 1.5,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </header>

                <div style={{ padding: '24px 16px' }}>
                    {activeTab === 'grup' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Grup Saya ({groups.length})</h3>
                                <button
                                    onClick={() => { playTick(); setOpenCreateGroup(true); }}
                                    className="haptic-click"
                                    style={{ padding: '10px 18px', background: 'var(--primary)', border: 'none', borderRadius: 12, color: 'white', fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}
                                >
                                    <Icon name="plus" size={16} /> BUAT GRUP
                                </button>
                            </div>
                            {isLoading ? (
                                <div className="grid-responsive">
                                    {Array(4).fill(0).map((_, i) => (
                                        <div key={i} className="card" style={{ padding: 16 }}>
                                            <Skeleton width="48px" height="48px" borderRadius="12px" />
                                        </div>
                                    ))}
                                </div>
                            ) : groups.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.3)' }}>
                                    <Icon name="users" size={64} style={{ opacity: 0.2, marginBottom: 20 }} />
                                    <h3 style={{ fontWeight: 800 }}>Belum Ada Grup</h3>
                                </div>
                            ) : (
                                <div className="grid-responsive">
                                    {groups.map((g, idx) => (
                                        <motion.div key={g.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileTap={{ scale: 0.98 }} className="card haptic-click" style={{ padding: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                <img src={g.image} alt={g.name} style={{ width: 52, height: 52, borderRadius: 14, border: '2px solid rgba(255,255,255,0.1)' }} />
                                                <div>
                                                    <div style={{ fontWeight: 800, fontSize: 15, color: 'white' }}>{g.name}</div>
                                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{g.members} Anggota</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {(activeTab === 'semua' || activeTab === 'teman') && (
                        <div className="grid-responsive">
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 14 }}>
                                        <Skeleton width="56px" height="56px" borderRadius="50%" />
                                        <div style={{ flex: 1 }}>
                                            <Skeleton width="50%" height="14px" marginBottom="8px" />
                                            <Skeleton width="30%" height="10px" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <AnimatePresence>
                                    {filteredMembers.map((m, idx) => (
                                        <motion.div
                                            key={m.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="card haptic-click"
                                            onClick={() => { playTick(); setSelectedMember(m); }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 16,
                                                padding: 14,
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: 24,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div style={{ position: 'relative' }}>
                                                <img src={m.isPrivate ? 'https://www.w3schools.com/howto/img_avatar.png' : m.image} alt={m.name} style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, background: '#10B981', borderRadius: '50%', border: '3px solid #0f172a' }}></div>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 800, fontSize: 16, color: 'white' }}>{m.isPrivate ? 'Anggota Privat' : m.name}</div>
                                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{m.role}</div>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAddFriend(m); }}
                                                className="haptic-click"
                                                style={{ padding: 10, background: m.isFriend ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', border: 'none', borderRadius: 12, color: m.isFriend ? '#10B981' : 'var(--primary)', cursor: 'pointer' }}
                                            >
                                                <Icon name={m.isFriend ? "user-check" : "user-plus"} size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {openCreateGroup && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="db-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 100000, backdropFilter: 'blur(30px)', background: 'rgba(0,0,0,0.8)' }}>
                            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="card" style={{ maxWidth: 450, width: '100%', padding: 30, borderRadius: 32, background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                                <h2 style={{ marginBottom: 8, fontWeight: 900, fontSize: 24 }}>Buat Grup Baru</h2>
                                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontSize: 14, fontWeight: 500 }}>Kolaborasi lebih baik dengan tim dalam grup.</p>
                                <form onSubmit={handleCreateGroup}>
                                    <div style={{ marginBottom: 16 }}>
                                        <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Nama Grup</label>
                                        <input name="groupName" placeholder="Contoh: IT Support Jakarta" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: 14, borderRadius: 14, color: 'white', fontWeight: 600 }} required />
                                    </div>
                                    <div style={{ marginBottom: 24 }}>
                                        <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Deskripsi (Opsional)</label>
                                        <textarea name="groupDesc" placeholder="Jelaskan tujuan grup ini..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: 14, borderRadius: 14, color: 'white', fontWeight: 500, minHeight: 100 }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <button type="button" onClick={() => { playTick(); setOpenCreateGroup(false); }} className="haptic-click" style={{ flex: 1, padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Batal</button>
                                        <button type="submit" className="haptic-click" style={{ flex: 1, padding: 16, borderRadius: 16, background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}>Buat Grup</button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Background3D>
    );
};

export default Anggota;
