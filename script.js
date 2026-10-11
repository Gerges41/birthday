// --- 1. كلمة السر والدخول ---
function checkPassword() {
    const input = document.getElementById('password-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    
    const validPasswords = ["12/10/2003", "12\\10\\2003", "12-10-2003"];

    if (validPasswords.includes(input)) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        window.scrollTo(0, 0);
        
        playAudio();
        initMaze();
        setupScratchCards();
    } else {
        errorMsg.innerText = "تاريخ ميلادك مش مظبوط يا لولي، جربي تاني! 🌸";
    }
}

document.getElementById('password-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkPassword();
});

// --- 2. الموسيقى وتأثيرات الصوت ---
const music = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        document.getElementById('music-toggle').innerText = "🎵 تشغيل الموسيقى";
    } else {
        playAudio();
    }
    isPlaying = !isPlaying;
}

function playAudio() {
    music.play().then(() => {
        isPlaying = true;
        document.getElementById('music-toggle').innerText = "⏸️ إيقاف الموسيقى";
    }).catch(err => {
        playBirthdaySynth();
        document.getElementById('music-toggle').innerText = "🎶 موسيقى تعمل";
    });
}

function playBirthdaySynth() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261, 261, 293, 261, 349, 329, 261, 261, 293, 261, 392, 349];
    let time = ctx.currentTime;
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time + i * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.00001, time + i * 0.4 + 0.35);
        osc.stop(time + i * 0.4 + 0.35);
    });
}

// --- 3. لعبة المتاهة ---
const mazeGrid = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 2, 1, 0], // 2 = بابا 👨‍🦳
    [0, 1, 1, 1, 0, 1, 1, 0],
    [0, 3, 0, 1, 0, 0, 0, 0], // 3 = مصاريف وفلوس 💸
    [1, 1, 0, 1, 1, 1, 4, 1], // 4 = شقة وتجهيز بيت 🏠
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 5]  // 5 = لولي 👧
];

let playerPos = { x: 0, y: 0 };
const cellSize = 40;

function initMaze() {
    const canvas = document.getElementById('mazeCanvas');
    if (!canvas) return;
    drawMaze();

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') movePlayer(0, -1);
        if (e.key === 'ArrowDown') movePlayer(0, 1);
        if (e.key === 'ArrowLeft') movePlayer(-1, 0);
        if (e.key === 'ArrowRight') movePlayer(1, 0);
    });
}

function drawMaze() {
    const canvas = document.getElementById('mazeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let x = c * cellSize;
            let y = r * cellSize;

            if (mazeGrid[r][c] === 1) {
                ctx.fillStyle = "#ffb6c1";
                ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
            } else {
                ctx.fillStyle = "#fff5f8";
                ctx.fillRect(x, y, cellSize, cellSize);
            }

            ctx.font = "22px Cairo";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (r === 2 && c === 5) ctx.fillText("👨‍🦳", x + 20, y + 22);
            if (r === 4 && c === 1) ctx.fillText("💸", x + 20, y + 22);
            if (r === 5 && c === 6) ctx.fillText("🏠", x + 20, y + 22);
            if (r === 7 && c === 7) ctx.fillText("👧", x + 20, y + 22);
        }
    }

    ctx.font = "24px Cairo";
    ctx.fillText("👦", playerPos.x * cellSize + 20, playerPos.y * cellSize + 22);
}

function movePlayer(dx, dy) {
    let newX = playerPos.x + dx;
    let newY = playerPos.y + dy;
    const status = document.getElementById('maze-status');

    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        if (mazeGrid[newY][newX] !== 1) {
            playerPos.x = newX;
            playerPos.y = newY;
            drawMaze();

            if (newY === 2 && newX === 5) status.innerText = "عديت موافقة بابا 👨‍🦳 بنجاح!";
            else if (newY === 4 && newX === 1) status.innerText = "تغلبت على المصاريف والفلوس 💸!";
            else if (newY === 5 && newX === 6) status.innerText = "جهّزت البيت وشقة العمر 🏠!";
            else if (newY === 7 && newX === 7) {
                status.innerText = "🎉 مبروك! جرجوسه وصل لوليتها حبيبتي أخيرًا ❤️👩‍❤️‍👨";
                alert("🎉 عاش يا لولي! ساعدتي جرجوسه يوصل لك وتتجمعوا مع بعض دايماً ❤️");
            }
        }
    }
}

// --- 4. تأثير خربشة الصور (12 صورة) ---
function setupScratchCards() {
    for (let i = 1; i <= 12; i++) {
        const canvas = document.getElementById(`scratchCanvas${i}`);
        if (!canvas) continue;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth || 350;
        canvas.height = canvas.offsetHeight || 250;

        ctx.fillStyle = '#ffc0cb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "18px Cairo";
        ctx.fillStyle = "#ff1493";
        ctx.textAlign = "center";
        ctx.fillText("✨ اخربشي الضباب بإيدك ✨", canvas.width / 2, canvas.height / 2);

        let isScratching = false;

        function scratch(e) {
            if (!isScratching) return;
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
        }

        canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => { isScratching = false; });

        canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, {passive: true});
        canvas.addEventListener('touchmove', scratch, {passive: true});
        window.addEventListener('touchend', () => { isScratching = false; });
    }
}
