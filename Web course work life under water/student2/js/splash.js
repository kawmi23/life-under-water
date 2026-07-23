/**
 * splash.js – Student 2 | 4COSC011W
 * Handles: JS countdown timer & skip intro button
 */

(function () {
    'use strict';

    const HOME_PAGE = '../student1/home.html';
    const TOTAL_SECONDS = 4;

    const countdownEl = document.getElementById('countdown');
    let remaining = TOTAL_SECONDS;

    /**
     * Tick the countdown every second.
     * Adds a brief CSS 'tick' animation class on each change.
     */
    function tick() {
        // Trigger bounce animation
        countdownEl.classList.remove('tick');
        // Force reflow to restart animation
        void countdownEl.offsetWidth;
        countdownEl.classList.add('tick');

        countdownEl.textContent = remaining;

        if (remaining <= 0) {
            clearInterval(timer);
            redirect();
        } else {
            remaining--;
        }
    }

    // Start with the initial value displayed
    tick();
    const timer = setInterval(tick, 1000);

    /**
     * Navigate to the home page.
     */
    function redirect() {
        window.location.href = HOME_PAGE;
    }

    /**
     * skipIntro – called by the Skip Intro button.
     * Cancels the countdown and redirects immediately.
     */
    window.skipIntro = function () {
        clearInterval(timer);
        redirect();
    };

    // Also support keyboard: Enter / Space on the button
    const skipBtn = document.getElementById('skipBtn');
    if (skipBtn) {
        skipBtn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.skipIntro();
            }
        });
    }

})();
