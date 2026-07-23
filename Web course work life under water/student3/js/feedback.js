/**
 * feedback.js – Student 3 · 4COSC011W
 * Form validation, star rating, localStorage stats
 */
(function () {
    'use strict';

    /* Nav toggle */
    const toggle = document.getElementById('navToggle');
    const nl = document.getElementById('navLinks');
    if (toggle && nl) {
        toggle.addEventListener('click', function () {
            const o = nl.classList.toggle('open');
            toggle.setAttribute('aria-expanded', o.toString());
        });
    }

    /* Char count */
    const ta = document.getElementById('fmessage');
    const cc = document.getElementById('charCount');
    if (ta && cc) {
        ta.addEventListener('input', function () {
            const len = ta.value.length;
            cc.textContent = len + ' / 500';
            if (len > 500) ta.value = ta.value.slice(0, 500);
        });
    }

    /* Load stats from localStorage */
    function loadStats() {
        const data = JSON.parse(localStorage.getItem('feedbackStats') || '{"count":0,"total":0,"pledges":0}');
        document.getElementById('responseCount').textContent = data.count;
        document.getElementById('avgRating').textContent = data.count ? (data.total / data.count).toFixed(1) + ' ★' : '–';
        document.getElementById('pledgeCount').textContent = data.pledges;
    }
    loadStats();

    /* Validate a single field */
    function validateField(input, errorId, msg) {
        const err = document.getElementById(errorId);
        if (!input.value.trim()) {
            input.classList.add('invalid');
            err.textContent = msg;
            return false;
        }
        if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            input.classList.add('invalid');
            err.textContent = 'Please enter a valid email address.';
            return false;
        }
        input.classList.remove('invalid');
        err.textContent = '';
        return true;
    }

    /* Form submit */
    const form = document.getElementById('feedbackForm');
    const successMsg = document.getElementById('successMsg');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        valid = validateField(document.getElementById('fname'), 'fname-error', 'Please enter your name.') && valid;
        valid = validateField(document.getElementById('femail'), 'femail-error', 'Please enter your email.') && valid;
        valid = validateField(document.getElementById('fmessage'), 'fmessage-error', 'Please enter a message.') && valid;

        // Star rating
        const ratingErr = document.getElementById('rating-error');
        const selectedRating = form.querySelector('input[name="rating"]:checked');
        if (!selectedRating) {
            ratingErr.textContent = 'Please select a star rating.';
            valid = false;
        } else {
            ratingErr.textContent = '';
        }

        if (!valid) return;

        // Save stats
        const data = JSON.parse(localStorage.getItem('feedbackStats') || '{"count":0,"total":0,"pledges":0}');
        data.count++;
        data.total += parseInt(selectedRating.value, 10);
        if (document.getElementById('faction').checked) data.pledges++;
        localStorage.setItem('feedbackStats', JSON.stringify(data));
        loadStats();

        // Show success
        form.hidden = true;
        successMsg.hidden = false;
    });

    window.resetForm = function () {
        form.reset();
        form.hidden = false;
        successMsg.hidden = true;
        document.getElementById('charCount').textContent = '0 / 500';
    };

    /* Live validation on blur */
    ['fname','femail','fmessage'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('blur', function () { el.dispatchEvent(new Event('input')); });
    });

})();
