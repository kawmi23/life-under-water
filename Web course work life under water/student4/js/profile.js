/**
 * profile.js – Student 4 · 4COSC011W
 * Avatar picker, form, localStorage persistence
 */
(function () {
    'use strict';

    const KEY = 'lifeUnderwaterProfile';

    /* Nav */
    const t = document.getElementById('navToggle');
    const nl = document.getElementById('navLinks');
    if (t && nl) { t.addEventListener('click', function () { const o = nl.classList.toggle('open'); t.setAttribute('aria-expanded', o.toString()); }); }

    /* Load saved profile */
    function loadProfile() {
        const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (!saved) {
            document.getElementById('profileJoined').textContent = 'Joined: ' + new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            return;
        }
        document.getElementById('pFirstName').value  = saved.firstName  || '';
        document.getElementById('pLastName').value   = saved.lastName   || '';
        document.getElementById('pEmail').value      = saved.email      || '';
        document.getElementById('pLocation').value   = saved.location   || '';
        document.getElementById('pBio').value        = saved.bio        || '';
        document.getElementById('pInterest').value   = saved.interest   || '';
        document.getElementById('notifNews').checked   = !!saved.notifNews;
        document.getElementById('notifImpact').checked = !!saved.notifImpact;
        updateCard(saved);
    }

    function updateCard(data) {
        const first = data.firstName || '';
        const last  = data.lastName  || '';
        const name  = (first + ' ' + last).trim() || 'Ocean Explorer';
        document.getElementById('profileName').textContent       = name;
        document.getElementById('profileBioDisplay').textContent = data.bio || 'No bio yet.';
        document.getElementById('profileJoined').textContent     = 'Joined: ' + (data.joined || new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }));
        document.getElementById('avatarDisplay').textContent     = data.avatar || '🌊';
        // set active avatar btn
        document.querySelectorAll('.av-btn').forEach(function (b) {
            b.classList.toggle('selected', b.dataset.emoji === (data.avatar || '🌊'));
        });
    }

    /* Avatar picker */
    document.querySelectorAll('.av-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.getElementById('avatarDisplay').textContent = btn.dataset.emoji;
            document.querySelectorAll('.av-btn').forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        });
    });

    /* Toggle ARIA */
    ['notifNews','notifImpact'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', function () { el.setAttribute('aria-checked', el.checked.toString()); });
    });

    /* Form submit */
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem(KEY) || '{"joined":""}');
        const data = {
            firstName:  document.getElementById('pFirstName').value.trim(),
            lastName:   document.getElementById('pLastName').value.trim(),
            email:      document.getElementById('pEmail').value.trim(),
            location:   document.getElementById('pLocation').value.trim(),
            bio:        document.getElementById('pBio').value.trim(),
            interest:   document.getElementById('pInterest').value,
            notifNews:  document.getElementById('notifNews').checked,
            notifImpact:document.getElementById('notifImpact').checked,
            avatar:     document.getElementById('avatarDisplay').textContent,
            joined:     existing.joined || new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
        };
        localStorage.setItem(KEY, JSON.stringify(data));
        updateCard(data);
        const toast = document.getElementById('saveToast');
        toast.hidden = false;
        setTimeout(function () { toast.hidden = true; }, 3000);
    });

    /* Clear */
    document.getElementById('clearBtn').addEventListener('click', function () {
        if (confirm('Clear all profile data?')) {
            localStorage.removeItem(KEY);
            document.getElementById('profileForm').reset();
            document.getElementById('avatarDisplay').textContent = '🌊';
            document.getElementById('profileName').textContent = 'Ocean Explorer';
            document.getElementById('profileBioDisplay').textContent = 'No bio yet.';
            document.querySelectorAll('.av-btn').forEach(function (b) { b.classList.remove('selected'); });
        }
    });

    /* Show impact score if stored */
    const stats = JSON.parse(localStorage.getItem('feedbackStats') || 'null');
    if (stats && stats.count) {
        document.getElementById('impactDisplay').textContent = (stats.total / stats.count).toFixed(0) + ' / 100';
    }

    loadProfile();
})();
