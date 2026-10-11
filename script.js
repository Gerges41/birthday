// 1. التحقق من كلمة السر
function checkPassword() {
    const input = document.getElementById('password-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    
    const validPasswords = ["12/10/2003", "12\\10\\2003", "12-10-2003"];

    if (validPasswords.includes(input)) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // تشغيل الموسيقى تلقائياً عند الدخول الصحيح
        playAudio();
    } else {
        errorMsg.innerText = "كلمة السر مش صحيحة يا حلوة، جربي تاني! 🌸";
    }
}

document.getElementById('password-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// 2. التحكم بالموسيقى
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
    }).catch(err => console.log("المتصفح يمنع التشغيل التلقائي"));
}

// 3. تقليب صفحات مجلد الذكريات
let currentSlide = 0;
const slides = document.querySelectorAll('.album-card');

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
    
    document.getElementById('slide-num').innerText = `صفحة ${currentSlide + 1} من ${slides.length}`;
}

// 4. لعبة التقريب بين اثنين
let distance = 0; // 0 to 4 steps
function moveCloser() {
    const boy = document.getElementById('boy');
    const girl = document.getElementById('girl');
    const hearts = document.getElementById('hearts-layer');
    const status = document.getElementById('game-status');
    const btn = document.getElementById('step-btn');

    distance++;

    if (distance === 1) {
        boy.style.transform = "translateX(-30px)";
        girl.style.transform = "translateX(30px)";
        status.innerText = "خطوة كمان.. قربتوا اكتر! 🥰";
    } else if (distance === 2) {
        boy.style.transform = "translateX(-60px)";
        girl.style.transform = "translateX(60px)";
        status.innerText = "لسه فاضل تكّة صغيرة! 💖";
    } else if (distance === 3) {
        boy.style.transform = "translateX(-90px)";
        girl.style.transform = "translateX(90px)";
        hearts.style.opacity = "1";
        status.innerText = "وصلتوا لبعض خلاص! بحبك يا لولي ❤️🎉";
        btn.innerText = "وصلتوا لبعض! 🎉";
        btn.disabled = true;
    }
}
