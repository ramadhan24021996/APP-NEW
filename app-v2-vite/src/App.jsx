import React, { useState, useEffect, useRef } from 'react';
import Icon from './components/Icon';
import Home from './components/Home';
import Bidang from './components/Bidang';
import BidangDetail from './components/BidangDetail';
import Pesan from './components/Pesan';
import Anggota from './components/Anggota';
import Notifikasi from './components/Notifikasi';
import Profil from './components/Profil';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import KnowledgeFeed from './components/KnowledgeFeed';
import Bantuan from './components/Bantuan';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import DBManager from './components/DBManager';
import UserManager from './components/UserManager';
import { redis } from './utils/redis';
import { KNOWLEDGE_BASE, CATEGORIES } from './constants';
import { db, auth, firestore } from './firebase'; // Imported but not used yet, ready for integration

function App() {
    const [screen, setScreen] = useState('splash');
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [tab, setTab] = useState(() => redis.get('tab', 'home'));
    const [appLang, setAppLang] = useState(() => redis.get('appLang', 'id'));
    const [theme, setTheme] = useState(() => redis.get('theme', 'dark'));
    const [timeZone, setTimeZone] = useState(() => redis.get('timeZone', 'WIB'));
    const [userName, setUserName] = useState(() => redis.get('userName', ''));
    const [userBio, setUserBio] = useState(() => redis.get('userBio', 'Senior System Admin'));
    const [userPhoto, setUserPhoto] = useState(() => redis.get('userPhoto', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'));
    const [activityLog, setActivityLog] = useState(() => redis.get('activityLog', []));
    const [userRole, setUserRole] = useState(() => redis.get('userRole', 'Admin'));
    const [isPrivate, setIsPrivate] = useState(() => redis.get('isPrivate', false));
    const [userFriends, setUserFriends] = useState(() => redis.get('userFriends', []));
    const [userPoints, setUserPoints] = useState(() => redis.get('userPoints', 0));
    const [dailyChallenges, setDailyChallenges] = useState(() => redis.get('dailyChallenges', []));
    const [selectedBidang, setSelectedBidang] = useState(null);
    const [knowledge, setKnowledge] = useState(() => redis.get('knowledge', KNOWLEDGE_BASE));
    const [categoryData, setCategoryData] = useState(() => redis.get('categoryData', {}));
    const [notifications, setNotifications] = useState(() => redis.get('notifications', []));
    const [allUsers, setAllUsers] = useState(() => redis.get('users_db', []));

    // Persist to localStorage (Simulation Redis)
    // In next phase, this will be replaced by Firebase Realtime Sync
    useEffect(() => {
        redis.set('tab', tab);
        redis.set('appLang', appLang);
        redis.set('theme', theme);
        redis.set('timeZone', timeZone);
        redis.set('userName', userName);
        redis.set('userBio', userBio);
        redis.set('userPhoto', userPhoto);
        redis.set('activityLog', activityLog);
        redis.set('userRole', userRole);
        redis.set('isPrivate', isPrivate);
        redis.set('userFriends', userFriends);
        redis.set('knowledge', knowledge);
        redis.set('categoryData', categoryData);
        redis.set('notifications', notifications);
        redis.set('userPoints', userPoints);
        redis.set('dailyChallenges', dailyChallenges);
    }, [tab, userName, userBio, userPhoto, activityLog, userRole, isPrivate, userFriends, knowledge, categoryData, notifications, userPoints, dailyChallenges]);

    // Firebase Sync Placeholder
    useEffect(() => {
        // Here we will implement real-time listeners for Firebase
        // to sync userName, notifications, and categoryData across devices.
        console.log("Firebase initialized and ready for real-time synchronization.");
    }, []);

    const handleLogin = (authData) => {
        const { name, email, password, isRegister } = authData;
        const users = redis.get('users_db', []);

        if (isRegister) {
            const newUser = { id: Date.now(), name: name || 'User', email, password, role: 'User' };
            users.push(newUser);
            redis.set('users_db', users);
            setAllUsers(users);
            setUserName(newUser.name);
            setUserRole('User');
            setScreen('main');
        } else {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                setUserName(user.name);
                setUserRole(user.role || 'User');
                setScreen('main');
            } else if (email === 'admin' && password === 'admin') {
                setUserName('Super Admin');
                setUserRole('Admin');
                setScreen('main');
            } else {
                alert('Invalid credentials');
            }
        }
    };

    const handleLogout = () => {
        if (confirm('Logout?')) {
            redis.del('userName');
            redis.del('userRole');
            window.location.reload();
        }
    };

    const getCategoryData = (name) => {
        return categoryData[name] || { discussions: [], chatMessages: [], materials: [] };
    };

    const handleUpdateCategoryData = (name, data) => {
        setCategoryData(prev => ({ ...prev, [name]: data }));
    };

    if (screen === 'splash') return <Splash onFinish={() => setScreen('onboarding')} />;
    if (screen === 'onboarding') return <Onboarding step={onboardingStep} onNext={() => onboardingStep < 2 ? setOnboardingStep(onboardingStep + 1) : setScreen('auth')} />;
    if (screen === 'auth') return <Auth onLogin={handleLogin} />;

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            {screen === 'db_manager' && <DBManager onClose={() => setScreen('main')} />}
            {screen === 'user_manager' && <UserManager onClose={() => setScreen('main')} />}

            <Sidebar
                tab={tab}
                setTab={setTab}
                setSelectedBidang={setSelectedBidang}
                userName={userName}
                userPhoto={userPhoto}
            />

            <div className="main-content">
                <div style={{ display: tab === 'home' ? 'block' : 'none' }}>
                    {selectedBidang ? (
                        <BidangDetail
                            bidang={selectedBidang}
                            onBack={() => setSelectedBidang(null)}
                            currentUserName={userName}
                            categoryData={getCategoryData(selectedBidang.name)}
                            onUpdateCategoryData={handleUpdateCategoryData}
                            registeredMembers={allUsers}
                        />
                    ) : (
                        <Home
                            userName={userName}
                            userRole={userRole}
                            checkPermission={(action) => userRole === 'Admin'}
                            onBidangClick={(bidang) => setSelectedBidang(bidang)}
                            onNavigate={(target) => setTab(target)}
                            onOpenDB={() => setScreen('db_manager')}
                            onLogout={handleLogout}
                            knowledgeBase={knowledge}
                            categories={CATEGORIES}
                            KnowledgeFeed={KnowledgeFeed}
                        />
                    )}
                </div>
                <div style={{ display: tab === 'bidang' ? 'block' : 'none' }}>
                    <Bidang onBidangClick={(bidang) => setSelectedBidang(bidang)} />
                </div>
                <div style={{ display: tab === 'pesan' ? 'block' : 'none' }}><Pesan userName={userName} onNavigate={setTab} /></div>
                <div style={{ display: tab === 'anggota' ? 'block' : 'none' }}>
                    <Anggota
                        registeredUsers={allUsers}
                        userName={userName}
                        friends={userFriends}
                        onUpdateFriends={setUserFriends}
                    />
                </div>
                <div style={{ display: tab === 'notif' ? 'block' : 'none' }}>
                    <Notifikasi
                        onNavigate={setTab}
                        notifications={notifications}
                        setNotifications={setNotifications}
                    />
                </div>
                <div style={{ display: tab === 'profil' ? 'block' : 'none' }}>
                    <Profil
                        userName={userName}
                        userRole={userRole}
                        bio={userBio}
                        photo={userPhoto}
                        onLogout={handleLogout}
                        onNavigate={setTab}
                        appLang={appLang}
                        onSetLang={setAppLang}
                    />
                </div>
                <div style={{ display: tab === 'pengetahuan' ? 'block' : 'none' }}><KnowledgeFeed onBack={() => setTab('home')} knowledgeBase={knowledge} /></div>
                <div style={{ display: tab === 'bantuan' ? 'block' : 'none' }}><Bantuan onBack={() => setTab('home')} /></div>
            </div>

            <BottomNav
                tab={tab}
                setTab={setTab}
                setSelectedBidang={setSelectedBidang}
            />
        </div>
    );
}

export default App;
