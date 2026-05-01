// ===== FALLING HEARTS =====
const heartsContainer = document.getElementById('hearts-container');
const heartEmojis = ['💖', '💕', '💗', '💝', '💓', '💞', '🩷', '♥️'];

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createFallingHeart, 300);
for (let i = 0; i < 15; i++) setTimeout(createFallingHeart, i * 200);

// ===== FLOATING EMOJIS =====
const floatingContainer = document.getElementById('floating-emojis');
const floatEmojis = ['🐼', '🧸', '✨', '🌸', '💫', '⭐'];

function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('float-emoji');
    emoji.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    emoji.style.animationDuration = (Math.random() * 6 + 6) + 's';
    floatingContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 14000);
}
setInterval(createFloatingEmoji, 800);

// ===== SCREEN TRANSITIONS =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goToQuestion1() {
    showScreen('question1-screen');
}

// ===== QUESTION 1: BLOCKING HAND =====
const handMessages = [
    "Nope! Not allowed! 😤",
    "Nice try! 😏",
    "That button is broken 🫢",
    "Error 404: No not found 💖",
    "Only YES works here! 🐼",
    "The panda said no to No! 🐼❌",
    "Try the other button! 💕",
    "🧸 says pick YES!"
];
let handMsgIndex = 0;

function tryNo1() {
    const hand = document.getElementById('blocking-hand');
    const speech = document.getElementById('hand-speech');
    hand.classList.add('show');
    hand.style.animation = 'none';
    hand.offsetHeight; // reflow
    hand.style.animation = 'handSlam 0.4s ease both';
    speech.textContent = handMessages[handMsgIndex % handMessages.length];
    speech.style.animation = 'none';
    speech.offsetHeight;
    speech.style.animation = 'bubblePop 0.4s ease 0.3s both';
    handMsgIndex++;

    // Shake the card
    const card = document.querySelector('#question1-screen .question-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'shake 0.5s ease';
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-10px) rotate(-1deg); }
    40% { transform: translateX(10px) rotate(1deg); }
    60% { transform: translateX(-8px) rotate(-0.5deg); }
    80% { transform: translateX(8px) rotate(0.5deg); }
}`;
document.head.appendChild(shakeStyle);

function answerYes1() {
    // Little celebration burst
    createMiniBurst();
    setTimeout(() => {
        showScreen('question2-screen');
        initRunawayButton();
    }, 600);
}

// ===== QUESTION 2: RUNAWAY NO BUTTON =====
function initRunawayButton() {
    const noBtn = document.getElementById('no-btn-2');
    const card = document.querySelector('#question2-screen .question-card');

    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', runAway);

    function runAway(e) {
        e.preventDefault();
        const cardRect = card.getBoundingClientRect();
        const btnW = noBtn.offsetWidth;
        const btnH = noBtn.offsetHeight;

        // Random position within the card
        const maxX = cardRect.width - btnW - 20;
        const maxY = cardRect.height - btnH - 20;

        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.transition = 'left 0.2s ease, top 0.2s ease';
        noBtn.style.zIndex = '15';

        // Change text sometimes
        const noTexts = ['No 🙈', 'Catch me! 🏃', 'Too slow! 😜', 'Nope! 🐼', 'Hehe! 💨', 'Can\'t touch this! 💃', '🧸 says YES!', 'Almost! 😂'];
        noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
    }
}

function answerYes2() {
    showScreen('celebration-screen');
    startCelebration();
}

// ===== MINI BURST =====
function createMiniBurst() {
    const sparkles = ['✨', '💖', '⭐', '💕', '🌟'];
    for (let i = 0; i < 15; i++) {
        const s = document.createElement('div');
        s.classList.add('sparkle-particle');
        s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        s.style.left = '50%';
        s.style.top = '50%';
        const angle = (Math.PI * 2 / 15) * i;
        const dist = Math.random() * 150 + 80;
        s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
        s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
        document.getElementById('sparkle-burst').appendChild(s);
        setTimeout(() => s.remove(), 2000);
    }
}

// ===== CELEBRATION =====
function startCelebration() {
    // Mega heart burst directions
    const burst = document.getElementById('mega-heart-burst');
    const hearts = burst.querySelectorAll('span');
    hearts.forEach((h, i) => {
        const angle = (Math.PI * 2 / hearts.length) * i;
        const dist = 80 + Math.random() * 40;
        h.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        h.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    });

    // Confetti
    launchConfetti();
    setInterval(launchConfetti, 4000);

    // Extra sparkles
    setInterval(() => {
        createCelebrationSparkle();
    }, 200);

    // Increase heart rain
    setInterval(createFallingHeart, 100);
}

function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#c084fc', '#7c3aed', '#ffd700', '#ff3d7f', '#ec4899', '#a78bfa', '#f472b6', '#fbbf24'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = (Math.random() * 10 + 5) + 'px';
        piece.style.height = (Math.random() * 10 + 5) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        piece.style.animationDelay = (Math.random() * 1) + 's';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 6000);
    }
}

function createCelebrationSparkle() {
    const sparkles = ['✨', '💖', '⭐', '🌟', '💕', '🎉', '🎊'];
    const s = document.createElement('div');
    s.classList.add('sparkle-particle');
    s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.setProperty('--sx', (Math.random() - 0.5) * 200 + 'px');
    s.style.setProperty('--sy', (Math.random() - 0.5) * 200 + 'px');
    document.getElementById('sparkle-burst').appendChild(s);
    setTimeout(() => s.remove(), 2000);
}
