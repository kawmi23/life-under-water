/**
 * gallery.js – Student 1 · 4COSC011W
 * Filter buttons + Lightbox
 */
(function () {
    'use strict';

    /* ---- Mobile nav ---- */
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            const open = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open.toString());
        });
    }

    /* ---- Filter ---- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            items.forEach(function (item) {
                if (filter === 'all' || item.dataset.cat === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ---- Lightbox ---- */
    const lightbox   = document.getElementById('lightbox');
    const lbImg      = document.getElementById('lightboxImg');
    const lbTitle    = document.getElementById('lightboxTitle');
    const lbDesc     = document.getElementById('lightboxDesc');
    const lbClose    = document.getElementById('lightboxClose');
    const lbPrev     = document.getElementById('lightboxPrev');
    const lbNext     = document.getElementById('lightboxNext');

    let currentIndex = 0;
    let visibleItems = [];

    function getVisible() {
        return Array.from(items).filter(function (i) { return !i.classList.contains('hidden'); });
    }

    function openLightbox(index) {
        visibleItems = getVisible();
        currentIndex = index;
        const item = visibleItems[currentIndex];
        lbImg.src  = item.querySelector('img').src;
        lbImg.alt  = item.querySelector('img').alt;
        lbTitle.textContent = item.querySelector('h2').textContent;
        lbDesc.textContent  = item.querySelector('p').textContent;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        lbClose.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        visibleItems = getVisible();
        currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
        const item = visibleItems[currentIndex];
        lbImg.src  = item.querySelector('img').src;
        lbImg.alt  = item.querySelector('img').alt;
        lbTitle.textContent = item.querySelector('h2').textContent;
        lbDesc.textContent  = item.querySelector('p').textContent;
    }

    items.forEach(function (item, i) {
        item.addEventListener('click', function () { openLightbox(i); });
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
        });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function () { navigate(-1); });
    lbNext.addEventListener('click', function () { navigate(1); });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

})();
