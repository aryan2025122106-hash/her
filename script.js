document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 11 + 'px';
            follower.style.top = e.clientY - 11 + 'px';
        }, 50);
    });

    // 2. Countdown Timer
    const startDate = new Date('April 4, 2025 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = now - startDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-scroll, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // 4. Floating Hearts
    const createHeart = (x, y) => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        heart.style.left = (x || Math.random() * 100) + (x ? 'px' : 'vw');
        heart.style.top = (y || 100) + (y ? 'px' : 'vh');
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random();
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    };

    // Auto-create hearts occasionally
    setInterval(() => {
        createHeart();
    }, 1500);

    // 5. Photo Modal
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modal.style.display = 'flex';
            modalImg.src = imgSrc;
        });
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    };

    // 6. Surprise Button & Confetti
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const closeSurprise = document.getElementById('close-surprise');

    surpriseBtn.addEventListener('click', () => {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createHeart(Math.random() * window.innerWidth, window.innerHeight);
            }, i * 50);
        }
        surpriseOverlay.style.display = 'flex';
    });

    closeSurprise.addEventListener('click', () => {
        surpriseOverlay.style.display = 'none';
    });

    // 7. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = false;

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeBtn.querySelector('.icon').innerText = isDark ? '☀️' : '🌙';
    });

    // 8. Music Control (Local File)
    const musicBtn = document.getElementById('music-control');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.querySelector('.icon').innerText = '🎵';
        } else {
            audio.play().catch(e => console.log("Audio play blocked. Click anywhere to play."));
            musicBtn.querySelector('.icon').innerText = '⏸️';
        }
        isPlaying = !isPlaying;
    });

    // 9. Letter Section Typing Effect (Optional highlight)
    // Keep it static for readability
});
