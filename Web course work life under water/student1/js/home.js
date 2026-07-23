/**
 * home.js – Student 1 · 4COSC011W
 * Mobile nav toggle + scroll reveal animations
 */
(function () {
    'use strict';

    /* ---- Mobile nav toggle ---- */
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            const open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open.toString());
        });
        // Close nav when a link is clicked
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                links.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---- Scroll reveal ---- */
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.info-card, .stat-item, .target-list li').forEach(function (el) {
        el.classList.add('reveal');
        observer.observe(el);
    });

    /* Add reveal CSS inline (avoids extra file) */
    const style = document.createElement('style');
    style.textContent = [
        '.reveal { opacity:0; transform:translateY(24px); transition:opacity 0.55s ease, transform 0.55s ease; }',
        '.reveal.visible { opacity:1; transform:translateY(0); }'
    ].join('');
    document.head.appendChild(style);

    /* ---- Stat counter animation ---- */
    function animateCounter(el) {
        const text = el.textContent;
        const num  = parseFloat(text.replace(/[^\d.]/g, ''));
        if (isNaN(num)) return;
        const suffix = text.replace(/[\d.]/g, '');
        let start = 0;
        const duration = 1400;
        const step = 16;
        const timer = setInterval(function () {
            start += step;
            const progress = Math.min(start / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = num * eased;
            el.textContent = (Number.isInteger(num) ? Math.round(current) : current.toFixed(1)) + suffix;
            if (progress >= 1) clearInterval(timer);
        }, step);
    }

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const strip = document.querySelector('.stats-strip');
    if (strip) counterObserver.observe(strip);

})();
