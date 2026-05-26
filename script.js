// Buat balon-balon lucu di background
function createBalloons() {
    const container = document.getElementById('balloon-container');
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎀', '✨', '⭐'];
    for (let i = 0; i < 28; i++) {
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        let leftPos = Math.random() * 100;
        let duration = 6 + Math.random() * 6;
        let delay = Math.random() * 8;
        balloon.style.left = leftPos + '%';
        balloon.style.animationDuration = duration + 's';
        balloon.style.animationDelay = delay + 's';
        balloon.style.fontSize = 1.5 + Math.random() * 2 + 'rem';
        container.appendChild(balloon);
    }
}

// Confetti sederhana (tanpa library)
function burstConfetti() {
    const confettiCount = 180;
    for (let i = 0; i < confettiCount; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.width = Math.random() * 8 + 4 + 'px';
        conf.style.height = Math.random() * 8 + 4 + 'px';
        conf.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
        conf.style.left = Math.random() * window.innerWidth + 'px';
        conf.style.top = '-20px';
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        conf.style.pointerEvents = 'none';
        conf.style.zIndex = '9999';
        conf.style.opacity = '0.9';
        document.body.appendChild(conf);
        const xMove = (Math.random() - 0.5) * 200;
        const duration = 0.8 + Math.random() * 1.2;
        conf.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${xMove}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.2, 0.9, 0.4, 1)',
            fill: 'forwards'
        });
        setTimeout(() => conf.remove(), duration * 1000);
    }
}

// Fungsi padamkan lilin + ledakan confetti
function blowOutCandle() {
    const candle = document.getElementById('candle');
    if (candle.classList.contains('out')) return; // sudah padam
    
    candle.classList.add('out');
    burstConfetti();
    // Ubah teks instruksi jadi ucapan spesial
    const instruction = document.querySelector('.instruction');
    instruction.innerHTML = '🎉 YEAY! SELAMAT 16 TAHUN! 🎉<br>⭐ Semoga harimu penuh tawa! ⭐';
    // Ubah sedikit tampilan kartu
    const card = document.getElementById('birthdayCard');
    card.style.animation = 'pop 0.4s ease';
    setTimeout(() => card.style.animation = '', 500);
    
    // Mainkan suara "tiup" opsional? Tidak menggunakan audio agar tidak perlu file
    // Tapi bisa getar (vibrate) jika didukung
    if (navigator.vibrate) navigator.vibrate(100);
}

// Event untuk klik lilin
document.getElementById('candle').addEventListener('click', (e) => {
    e.stopPropagation();
    blowOutCandle();
});

// Tombol tiup manual
document.getElementById('blowBtn').addEventListener('click', () => {
    blowOutCandle();
});

// Dukungan microphone (tiup sungguhan) - opsional & butuh izin
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let audioContext = null;
    let sourceNode = null;
    let isBlown = false;
    
    const initMic = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            sourceNode = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            sourceNode.connect(analyser);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            
            function checkBlow() {
                if (!audioContext || document.getElementById('candle').classList.contains('out')) {
                    requestAnimationFrame(checkBlow);
                    return;
                }
                analyser.getByteFrequencyData(dataArray);
                let average = 0;
                for (let i = 0; i < dataArray.length; i++) average += dataArray[i];
                average /= dataArray.length;
                // Jika suara cukup keras (tiupan)
                if (average > 60 && !isBlown) {
                    isBlown = true;
                    blowOutCandle();
                    setTimeout(() => { isBlown = false; }, 1000);
                }
                requestAnimationFrame(checkBlow);
            }
            audioContext.resume();
            checkBlow();
            // Tampilkan indikator bahwa mic aktif
            const inst = document.querySelector('.instruction');
            inst.innerHTML += '<br>🎤 Mikrofon aktif! Coba tiup ke mic 🎤';
        } catch (err) {
            console.log("Mic tidak diizinkan atau error:", err);
        }
    };
    
    // Minta izin saat pengguna klik pertama kali di halaman (karena kebijakan browser)
    document.body.addEventListener('click', () => {
        if (!audioContext) initMic();
    }, { once: true });
} else {
    console.log("Browser tidak support getUserMedia");
}

// Panggil balon dan pastikan lilin awal menyala
createBalloons();

// Hiasan ekstra: tampilkan "Happy 16" floating
const style = document.createElement('style');
style.textContent = `
    .cake:hover { transform: scale(1.01); }
    .candle { transition: all 0.2s; }
`;
document.head.appendChild(style);
// script.js LENGKAP dengan suara Happy Birthday
// (gabungan balon, confetti, lilin, dan lagu)

function createBalloons() {
    const container = document.getElementById('balloon-container');
    if (!container) return;
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎀', '✨', '⭐'];
    for (let i = 0; i < 28; i++) {
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        let leftPos = Math.random() * 100;
        let duration = 6 + Math.random() * 6;
        let delay = Math.random() * 8;
        balloon.style.left = leftPos + '%';
        balloon.style.animationDuration = duration + 's';
        balloon.style.animationDelay = delay + 's';
        balloon.style.fontSize = 1.5 + Math.random() * 2 + 'rem';
        container.appendChild(balloon);
    }
}

function burstConfetti() {
    const confettiCount = 180;
    for (let i = 0; i < confettiCount; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.width = Math.random() * 8 + 4 + 'px';
        conf.style.height = Math.random() * 8 + 4 + 'px';
        conf.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
        conf.style.left = Math.random() * window.innerWidth + 'px';
        conf.style.top = '-20px';
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        conf.style.pointerEvents = 'none';
        conf.style.zIndex = '9999';
        conf.style.opacity = '0.9';
        document.body.appendChild(conf);
        const xMove = (Math.random() - 0.5) * 200;
        const duration = 0.8 + Math.random() * 1.2;
        conf.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${xMove}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.2, 0.9, 0.4, 1)',
            fill: 'forwards'
        });
        setTimeout(() => conf.remove(), duration * 1000);
    }
}

// ========== SUARA ULANG TAHUN ==========
let audioCtx = null;
let isSongPlaying = false;

function initAudio() {
    if (audioCtx) return audioCtx;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playTone(frequency, startTime, duration, volume = 0.3) {
    const ctx = audioCtx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
}

function playBirthdaySong() {
    if (!audioCtx || isSongPlaying) return;
    isSongPlaying = true;
    const now = audioCtx.currentTime;
    let t = now + 0.1;
    // C C D C F E
    playTone(261.63, t, 0.4); t += 0.45;
    playTone(261.63, t, 0.4); t += 0.45;
    playTone(293.66, t, 0.4); t += 0.45;
    playTone(261.63, t, 0.4); t += 0.45;
    playTone(349.23, t, 0.4); t += 0.45;
    playTone(329.63, t, 0.8); t += 0.85;
    // C C D C G F
    playTone(261.63, t, 0.4); t += 0.45;
    playTone(261.63, t, 0.4); t += 0.45;
    playTone(293.66, t, 0.4); t += 0.45;
    playTone(261.63, t, 0.4); t += 0.45;
    playTone(392.00, t, 0.4); t += 0.45;
    playTone(349.23, t, 0.8); t += 0.85;
    // C C C A F E D
    playTone(261.63, t, 0.3); t += 0.35;
    playTone(261.63, t, 0.3); t += 0.35;
    playTone(261.63, t, 0.3); t += 0.35;
    playTone(440.00, t, 0.4); t += 0.45;
    playTone(349.23, t, 0.4); t += 0.45;
    playTone(329.63, t, 0.4); t += 0.45;
    playTone(293.66, t, 0.8); t += 0.85;
    // Bb Bb A F G F
    playTone(466.16, t, 0.4); t += 0.45;
    playTone(466.16, t, 0.4); t += 0.45;
    playTone(440.00, t, 0.4); t += 0.45;
    playTone(349.23, t, 0.4); t += 0.45;
    playTone(392.00, t, 0.4); t += 0.45;
    playTone(349.23, t, 1.0);
    setTimeout(() => { isSongPlaying = false; }, 7000);
}

// Fungsi utama tiup lilin + confetti + lagu
function blowOutCandle() {
    const candle = document.getElementById('candle');
    if (candle && candle.classList.contains('out')) return;
    if (candle) candle.classList.add('out');
    burstConfetti();
    const instruction = document.querySelector('.instruction');
    if (instruction) instruction.innerHTML = '🎉 YEAY! SELAMAT 16 TAHUN! 🎉<br>⭐ Semoga harimu penuh tawa! ⭐';
    const card = document.getElementById('birthdayCard');
    if (card) {
        card.style.animation = 'pop 0.4s ease';
        setTimeout(() => card.style.animation = '', 500);
    }
    if (navigator.vibrate) navigator.vibrate(100);
    
    // Mainkan lagu (pastikan AudioContext aktif)
    if (audioCtx) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => playBirthdaySong());
        } else {
            playBirthdaySong();
        }
    } else {
        initAudio();
        audioCtx.resume().then(() => playBirthdaySong());
    }
}

// Event listener untuk lilin dan tombol
document.addEventListener('DOMContentLoaded', () => {
    const candleElem = document.getElementById('candle');
    if (candleElem) candleElem.addEventListener('click', (e) => {
        e.stopPropagation();
        blowOutCandle();
    });
    const blowBtn = document.getElementById('blowBtn');
    if (blowBtn) blowBtn.addEventListener('click', () => blowOutCandle());
    createBalloons();
});

// Dukungan mikrofon (tiup sungguhan) opsional
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let micStream = null;
    let micAnalyser = null;
    let micActive = false;
    async function enableMic() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStream = stream;
            const ctx = initAudio(); // pakai audio context yang sama
            const source = ctx.createMediaStreamSource(stream);
            micAnalyser = ctx.createAnalyser();
            micAnalyser.fftSize = 256;
            source.connect(micAnalyser);
            const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
            function checkBlow() {
                if (!micAnalyser || document.getElementById('candle')?.classList.contains('out')) {
                    requestAnimationFrame(checkBlow);
                    return;
                }
                micAnalyser.getByteFrequencyData(dataArray);
                let avg = 0;
                for (let i = 0; i < dataArray.length; i++) avg += dataArray[i];
                avg /= dataArray.length;
                if (avg > 60 && !micActive) {
                    micActive = true;
                    blowOutCandle();
                    setTimeout(() => { micActive = false; }, 1000);
                }
                requestAnimationFrame(checkBlow);
            }
            checkBlow();
            const inst = document.querySelector('.instruction');
            if (inst) inst.innerHTML += '<br>🎤 Mikrofon aktif! Coba tiup ke mic 🎤';
        } catch(e) { console.log("Mic error", e); }
    }
    document.body.addEventListener('click', () => {
        if (!micAnalyser) enableMic();
    }, { once: true });
}