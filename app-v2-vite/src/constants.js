export const REGISTERED_MEMBERS = [
    { id: 'u1', name: 'Rama (Admin)', role: 'Administrator IT', image: 'https://ui-avatars.com/api/?name=Rama&background=000&color=fff' },
    { id: 'u2', name: 'Siti Aminah', role: 'Hardware Specialist', image: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=random&color=fff' },
    { id: 'u3', name: 'Budi Santoso', role: 'Network Engineer', image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&color=fff' },
    { id: 'u4', name: 'Rudi Hermawan', role: 'Security Analyst', image: 'https://ui-avatars.com/api/?name=Rudi+Hermawan&background=random&color=fff' }
];

export const KNOWLEDGE_BASE = [
    {
        id: 'wifi', icon: 'wifi-off', color: '#3B82F6',
        title: "Masalah Koneksi WiFi Kantor pada Windows 11",
        trendInfo: "Muncul 12x di Grup Diskusi hari ini",
        question: "Kenapa banyak laptop karyawan tidak bisa terkoneksi ke WiFi kantor (SSID: Kantor_Utama) setelah menjalankan update Windows 11 versi 23H2 secara massal?",
        desc: "Evaluasi Otomatis: Gagal autentikasi protokol WPA3 pada infrastruktur legacy.",
        aiCrawling: "AI mendeteksi lonjakan diskusi di 12 forum IT internasional. Analisa pola menunjukkan kegagalan pada lapisan 'WLAN AutoConfig Service'. AI telah merangkum analisa dari 50+ laporan troubleshooting serupa dalam 24 jam terakhir.",
        googleInsight: "Google Search Data Highlights: \n- Trending Keywords: 'Windows 11 KB503 WiFi issue'\n- Top Reference: Microsoft Official Thread ID #9921 memvalidasI adanya bug driver pada chip Intel AX seri-AX.\n- Solusi Terpopuler di Google: Rolling back driver atau menonaktifkan fitur 802.11ax di properti adapter.",
        analysis: "Hasil Evaluasi Gabungan (Google Support & Deep-AI): \n\n**Akar Masalah:** \nKetidakcocokan power management chip WiFi Windows 11 dengan standar 802.11ax. Terdeteksi 85% kegagalan terjadi pada Access Point seri-H. \n\n**Langkah Pemecahan:** \n1. Buka Device Manager > Network Adapters. \n2. Pilih Driver WiFi > Properties > Power Management. \n3. Hilangkan centang pada 'Allow computer to turn off this device'. \n4. Paksa update driver ke versi Enterprise 22.40.1."
    },
    {
        id: 'node', icon: 'server', color: '#10B981',
        title: "Error Runtime: Heap Out of Memory di Node.js",
        trendInfo: "Isu Populer di Bidang Backend",
        question: "Aplikasi backend HRIS tiba-tiba crash dengan pesan 'v8: Fatal error in manages heap' saat melakukan proses export database tahunan.",
        desc: "Evaluasi Otomatis: Kebocoran memori pada proses asinkronus skala besar.",
        aiCrawling: "AI menscan repository internal dan forum StackOverflow. Terdeteksi adanya loop tak berujung (infinity loop) pada modul 'excel-export-service'. AI menyarankan penggunaan stream API untuk data besar.",
        googleInsight: "Google Search Data Highlights: \n- Trending Keywords: 'Nodejs heap out of memory export large csv'\n- Top Reference: Node.js Documentation Section 'Memory Management'.\n- Forum Suggestion: Meningkatkan limit memory V8 menggunakan flag --max-old-space-size.",
        analysis: "Analisa Komprehensif AI + Google Cloud Logging: \n\n**Akar Masalah:** \nPenumpukan Zombie Objects pada event loop akibat closure yang tidak di-release. Terdeteksi kebocoran pada file `socket-handler.js`. \n\n**Langkah Pemecahan:** \n1. Jalankan aplikasi dengan flag `--max-old-space-size=4096`. \n2. Tambahkan `global.gc()` pada bagian krusial proses. \n3. Lakukan audit memori menggunakan `node-inspect` untuk menemukan referensi sirkular."
    },
    {
        id: 'printer', icon: 'printer', color: '#F59E0B',
        title: "Konflik Driver Printer HP di MacOS Sonoma",
        trendInfo: "Trend di Bidang Hardware",
        question: "User melaporkan printer HP LaserJet tidak terdeteksi di MacOS Sonoma padahal kabel USB sudah terhubung dengan baik.",
        desc: "Evaluasi Otomatis: Isu kompatibilitas AirPrint pada Apple Silicon.",
        aiCrawling: "AI memantau rilis driver terbaru dari vendor HP dan Apple Support. Terdeteksi bahwa MacOS Sonoma menghapus dukungan untuk driver arsitektur x86 lama.",
        googleInsight: "Google Search Data Highlights: \n- Trending Keywords: 'MacOS Sonoma HP printer driver missing'\n- Top Reference: Apple Communities thread tentang 'Legacy Printer Support removed'.\n- Google Solution: Menggunakan Generic PostScript Driver atau aplikasi HP Smart.",
        analysis: "Hasil Crawling Google Support & AI Analysis: \n\n**Akar Masalah:** \nMacOS Sonoma memblokir legacy driver extensions (KEXT) demi keamanan. Modul HP Utility versi lama tidak memiliki signature yang valid. \n\n**Langkah Pemecahan:** \n1. Uninstal semua driver HP lama dari System Settings. \n2. Download HP Smart App versi terbaru dari App Store. \n3. Tambahkan printer secara manual menggunakan protokol 'IP Printing' (JetDirect-Socket)."
    },
    {
        id: 'security', icon: 'shield-alert', color: '#EF4444',
        title: "Deteksi Unauthorized Login Attempt di VPN",
        trendInfo: "Peringatan Keamanan Sistem",
        question: "Terdeteksi 100+ percobaan login gagal dari IP luar negeri pada dashboard admin VPN dalam waktu 10 menit.",
        desc: "Evaluasi Otomatis: Pola serangan brute-force terdeteksi pada gateway.",
        aiCrawling: "AI mengintegrasikan data dari database ancaman global (Threat Intel). Terdeteksi IP penyerang berasal dari botnet yang sedang aktif menyerang infrastruktur VPN serupa di Asia Tenggara.",
        googleInsight: "Google Search Data Highlights: \n- Trending Keywords: 'CVE-2024 VPN brute force attack'\n- Top Reference: Fortinet Security Advisory.\n- Google Solution: Mengaktifkan Geo-Blocking dan rate limiting IP.",
        analysis: "Analisa Keamanan AI Terintegrasi Security-Cloud: \n\n**Akar Masalah:** \nUpaya login berulang dari 15 IP publik berbeda dalam rentang waktu 5 menit. Terindikasi sebagai serangan Credential Stuffing. \n\n**Langkah Pemecahan:** \n1. Blokir range IP penyerang pada level Firewall gateway. \n2. Aktifkan wajib Multi-Factor Authentication (MFA) untuk semua akun VPN. \n3. Lakukan sinkronisasi ulang kredensial via Active Directory."
    }
];

export const onboardingData = [
    { title: 'SOLUSI\nIT SUPPORT', desc: 'Temukan jawaban dari masalah troubleshooting IT di tempat kerja Anda', icon: 'wrench' },
    { title: 'TANYA JAWAB\nKREDIBEL', desc: 'Dapatkan jawaban valid dari karyawan ahli di berbagai bidang IT', icon: 'check-circle' },
    { title: 'DISKUSI BERSAMA\nREKAN KERJA', desc: 'Berdiskusi dan berbagi solusi dengan sesama karyawan', icon: 'users' }
];

export const CATEGORIES = [
    { name: 'Hardware', icon: '🖥️', color: '#3B82F6' },
    { name: 'Software', icon: '💿', color: '#8B5CF6' },
    { name: 'Network', icon: '🌐', color: '#10B981' },
    { name: 'Security', icon: '🛡️', color: '#EF4444' },
    { name: 'Database', icon: '🗄️', color: '#F59E0B' },
    { name: 'Development', icon: '⚡', color: '#EC4899' },
    { name: 'Runtimes', icon: '🚀', color: '#F59E0B' },
    { name: 'Cloud', icon: '☁️', color: '#0EA5E9' }
];
