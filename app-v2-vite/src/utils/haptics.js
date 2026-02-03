// Web Audio API based haptics for soft click sounds
let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

/**
 * Play a soft tick sound (iOS style)
 */
export const playTick = () => {
    try {
        initAudio();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        console.warn('Audio haptics failed', e);
    }
};

/**
 * Play a notification sound
 */
export const playNotif = () => {
    try {
        initAudio();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
        console.warn('Audio haptics failed', e);
    }
};

/**
 * Play a coin pickup sound
 */
export const playCoin = () => {
    try {
        initAudio();
        const now = audioCtx.currentTime;

        // Characteristic 2-tone ping for achievement
        [987.77, 1318.51].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);

            g.gain.setValueAtTime(0.05, now + i * 0.1);
            g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);

            osc.connect(g);
            g.connect(audioCtx.destination);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.2);
        });
    } catch (e) {
        console.warn('Audio haptics failed', e);
    }
};
