// Secret unlock sequence
let secretSequence = '';
const secretCode = 'gameportal';
let unlockedPortal = false;

// Listen for keyboard input
document.addEventListener('keydown', (e) => {
    secretSequence += e.key.toLowerCase();
    
    // Keep only the last characters needed
    if (secretSequence.length > secretCode.length) {
        secretSequence = secretSequence.slice(-secretCode.length);
    }
    
    // Check if secret code is entered
    if (secretSequence === secretCode) {
        unlockGamePortal();
        secretSequence = '';
    }
});

// Alternative: Click the unlock button in navbar
document.querySelector('.secret-unlock').addEventListener('click', () => {
    if (!unlockedPortal) {
        unlockGamePortal();
    } else {
        closeGamePortal();
    }
});

function unlockGamePortal() {
    const gamePortal = document.getElementById('gamePortal');
    gamePortal.classList.remove('hidden');
    unlockedPortal = true;
    document.querySelector('.secret-unlock').textContent = '🔐';
    
    // Add a little celebration
    celebrateUnlock();
}

function closeGamePortal() {
    const gamePortal = document.getElementById('gamePortal');
    gamePortal.classList.add('hidden');
    unlockedPortal = false;
    document.querySelector('.secret-unlock').textContent = '🔓';
}

// Close button functionality
document.querySelector('.close-portal').addEventListener('click', closeGamePortal);

// Close on outside click
document.getElementById('gamePortal').addEventListener('click', (e) => {
    if (e.target.id === 'gamePortal') {
        closeGamePortal();
    }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && unlockedPortal) {
        closeGamePortal();
    }
});

function celebrateUnlock() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    // Play sound effect (optional)
    playUnlockSound();
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff6b6b', '#667eea', '#764ba2', '#ffd93d'][Math.floor(Math.random() * 4)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '2000';
    
    document.body.appendChild(confetti);
    
    let top = -10;
    let left = parseFloat(confetti.style.left);
    const velocity = Math.random() * 3 + 2;
    const swing = (Math.random() - 0.5) * 2;
    
    const animate = () => {
        top += velocity;
        left += swing;
        confetti.style.top = top + 'px';
        confetti.style.left = left + 'vw';
        confetti.style.opacity = Math.max(0, 1 - (top / 500));
        
        if (top < 500) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    };
    
    animate();
}

function playUnlockSound() {
    // Create a simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Course button interactions
document.querySelectorAll('.course-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Course content coming soon!');
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
});

// CTA button
document.querySelector('.cta-btn').addEventListener('click', () => {
    document.querySelector('#courses').scrollIntoView({ behavior: 'smooth' });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#667eea';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '999';
    notification.style.animation = 'slideInLeft 0.3s ease';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add easter egg hint (optional - shows a subtle hint about the secret)
console.log('%c🎮 Welcome to EduLearn Pro! 🎮', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cPssst... Try typing "gameportal" or clicking the 🔓 icon!', 'font-size: 14px; color: #764ba2;');

// Prevent cheating by detecting developer tools (optional)
let devToolsOpen = false;
const checkDevTools = () => {
    const threshold = 160;
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            console.log('%cWe see you! 😉', 'font-size: 16px; color: #ff6b6b;');
        }
    } else {
        devToolsOpen = false;
    }
};

setInterval(checkDevTools, 1000);

// Analytics placeholder (for tracking which games are clicked)
document.querySelectorAll('.game-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const gameName = link.querySelector('h3').textContent;
        console.log(`Player accessing: ${gameName}`);
        // You could send this to an analytics service
    });
});