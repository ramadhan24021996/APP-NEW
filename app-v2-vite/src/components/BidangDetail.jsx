import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import Background3D from './Background3D';
import { BidangDetailSkeleton } from './Skeleton';
import { playTick } from '../utils/haptics';
import { REGISTERED_MEMBERS } from '../constants';

const QuestionCard = ({ user, currentUser, title, tags, comments, participants = [], onReply, onAddColleague, onDelete }) => (
    <div className="card haptic-click" style={{ padding: 20 }}>
        {/* ... component UI preserved ... */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{user[0]}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{user}</div>
            </div>
            {user === currentUser && (
                <div onClick={(e) => { e.stopPropagation(); playTick(); onDelete(); }} style={{ cursor: 'pointer', opacity: 0.5, color: '#EF4444' }}><Icon name="trash-2" size={16} /></div>
            )}
        </div>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{title}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {tags.map(t => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-gray)', fontSize: 12 }}>
                <div onClick={() => { playTick(); onReply(); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="message-circle" size={14} /> {comments}</div>
                <div onClick={() => { playTick(); onAddColleague(); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="user-plus" size={14} /> {participants.length}</div>
            </div>
            <button onClick={() => { playTick(); onReply(); }} style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Balas Sekarang</button>
        </div>
    </div>
);

const BidangDetail = ({ bidang, onBack, currentUserName, onAddKnowledge, categoryData, onUpdateCategoryData, addNotification, registeredMembers = [] }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('diskusi');
    const [msg, setMsg] = useState('');
    const [showMemberSelector, setShowMemberSelector] = useState(false);
    const [memberSearchTerm, setMemberSearchTerm] = useState('');
    const [selectedDiscussionIdx, setSelectedDiscussionIdx] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [bidang.name]);

    const { discussions = [] } = categoryData;

    const handleReplyTo = (user) => {
        playTick();
        setMsg(`@${user} `);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleNavBack = () => {
        playTick();
        onBack();
    };

    const handleTabSwitch = (t) => {
        playTick();
        setActiveTab(t);
    };

    const selectMember = (member) => {
        playTick();
        if (selectedDiscussionIdx === null) {
            const currentMembers = categoryData.members || [];
            if (!currentMembers.find(m => m.name === member.name)) {
                onUpdateCategoryData(bidang.name, { ...categoryData, members: [...currentMembers, member] });
            }
            setShowMemberSelector(false);
            return;
        }
        const updatedDiscussions = [...discussions];
        const disc = { ...updatedDiscussions[selectedDiscussionIdx] };
        if (!disc.participants) disc.participants = [];
        if (!disc.participants.some(p => p.id === member.id)) {
            disc.participants.push(member);
            updatedDiscussions[selectedDiscussionIdx] = disc;
            onUpdateCategoryData(bidang.name, { ...categoryData, discussions: updatedDiscussions });
        }
        setShowMemberSelector(false);
    };

    return (
        <Background3D color1={bidang.color || 'var(--primary)'} color2="var(--secondary)">
            <div className="animate">
                {showMemberSelector && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="card" style={{ width: '90%', maxWidth: 360, padding: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <h3>Pilih Rekan Kerja</h3>
                                <div onClick={() => { playTick(); setShowMemberSelector(false); }} style={{ cursor: 'pointer' }}><Icon name="x" /></div>
                            </div>
                            <input
                                placeholder="Cari nama rekan..."
                                value={memberSearchTerm}
                                onChange={e => setMemberSearchTerm(e.target.value)}
                                style={{ width: '100%', marginBottom: 15, padding: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', borderRadius: 12 }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {(registeredMembers.length > 0 ? registeredMembers : REGISTERED_MEMBERS).map(m => (
                                    <div key={m.id} onClick={() => selectMember(m)} className="haptic-click" style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', padding: 8, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <img src={m.image} alt={m.name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                                        <span>{m.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <header className="page-header" style={{
                    padding: '16px 20px 4px',
                    background: `linear-gradient(135deg, ${bidang.color || 'var(--primary)'}, ${bidang.color || 'var(--secondary)'}dd)`
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div onClick={handleNavBack} className="haptic-click" style={{ cursor: 'pointer', padding: 6, background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
                            <Icon name="chevron-left" size={20} color="white" />
                        </div>
                        <h2 style={{ fontSize: 16, fontWeight: 800 }}>{bidang.name}</h2>
                        <button onClick={() => { playTick(); setSelectedDiscussionIdx(null); setShowMemberSelector(true); }} className="haptic-click" style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.2)', color: 'white', borderRadius: 10, border: 'none' }}>
                            <Icon name="user-plus" size={14} />
                        </button>
                    </div>
                </header>

                <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                        {['diskusi', 'materi'].map(t => (
                            <button key={t} onClick={() => handleTabSwitch(t)} className="haptic-click" style={{ padding: '10px 20px', borderRadius: 12, background: activeTab === t ? 'var(--primary)' : 'var(--bg-card)', color: 'white', border: 'none', fontWeight: 700 }}>
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <BidangDetailSkeleton />
                    ) : (
                        activeTab === 'diskusi' && (
                            <div className="grid-responsive">
                                {discussions.map((d, i) => (
                                    <QuestionCard
                                        key={i} user={d.user} currentUser={currentUserName} title={d.title} tags={d.tags} comments={d.comments} participants={d.participants}
                                        onReply={() => handleReplyTo(d.user)}
                                        onAddColleague={() => { playTick(); setSelectedDiscussionIdx(i); setShowMemberSelector(true); }}
                                    />
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        </Background3D>
    );
};

export default BidangDetail;
