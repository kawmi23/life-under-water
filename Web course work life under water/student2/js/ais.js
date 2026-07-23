/**
 * ais.js – SDG Action Impact Simulator
 * Student 2 | 4COSC011W
 *
 * Features:
 *  - Toggle card selection on click / keyboard
 *  - Live score bar update
 *  - Calculate: show feedback (Low / Medium / High)
 *  - Dynamic background change based on score tier
 *  - Reset simulator
 */

(function () {
    'use strict';

    /* ---- Configuration ---- */
    const BACKGROUNDS = {
        low:  "url('../images/marine_low.png')",
        med:  "url('../images/marine_med.png')",
        high: "url('../images/marine_high.png')"
    };

    const LEVELS = {
        low: {
            label:   '🔴 Low Impact',
            icon:    '😟',
            cssClass:'level-low',
            heading: 'Low Impact',
            msg:     'Every drop counts! Right now, your daily choices have a limited positive effect on our oceans. Small changes – like refusing single-use plastic, or switching to reef-safe sunscreen – can snowball into huge improvements for marine life. You have the power to do more!'
        },
        med: {
            label:   '🟡 Medium Impact',
            icon:    '😊',
            cssClass:'level-med',
            heading: 'Medium Impact',
            msg:     "Good job – you're already making a difference! Your actions help protect marine ecosystems, but there's still room to go further. Try supporting a marine conservation charity or making more sustainable food choices to level up your ocean impact."
        },
        high: {
            label:   '🟢 High Impact',
            icon:    '🌊',
            cssClass:'level-high',
            heading: 'High Impact',
            msg:     "Incredible! Your commitment to ocean-friendly choices is making a real difference for SDG 14 – Life Under Water. Keep being a champion for the seas! Encourage your friends and family to join you and multiply your positive impact."
        }
    };

    /* ---- State ---- */
    let totalScore = 0;
    const MAX_SCORE = 100;   // sum of all card scores

    /* ---- Elements ---- */
    const body         = document.getElementById('aisBody');
    const overlay      = document.getElementById('bgOverlay');
    const cards        = document.querySelectorAll('.card');
    const scoreFill    = document.getElementById('scoreFill');
    const scoreLabel   = document.getElementById('scoreLabel');
    const scoreBar     = document.getElementById('scoreBar');
    const feedbackPanel = document.getElementById('feedbackPanel');
    const feedbackIcon  = document.getElementById('feedbackIcon');
    const feedbackLevel = document.getElementById('feedbackLevel');
    const feedbackScore = document.getElementById('feedbackScore');
    const feedbackMsg   = document.getElementById('feedbackMsg');

    /* ---- Card toggle ---- */
    function toggleCard(card) {
        const isSelected = card.classList.toggle('selected');
        card.setAttribute('aria-checked', isSelected.toString());
        updateLiveScore();
    }

    function updateLiveScore() {
        totalScore = 0;
        cards.forEach(function (card) {
            if (card.classList.contains('selected')) {
                totalScore += parseInt(card.dataset.score, 10);
            }
        });
        const pct = Math.min((totalScore / MAX_SCORE) * 100, 100).toFixed(0);
        scoreFill.style.width = pct + '%';
        scoreLabel.textContent = totalScore + ' / ' + MAX_SCORE;
        scoreBar.setAttribute('aria-valuenow', pct);
    }

    /* ---- Card event listeners ---- */
    cards.forEach(function (card) {
        // Mouse click
        card.addEventListener('click', function () { toggleCard(card); });
        // Keyboard: Space / Enter
        card.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleCard(card);
            }
        });
    });

    /* ---- Calculate Impact ---- */
    window.calculateImpact = function () {
        updateLiveScore(); // ensure fresh score

        let tier;
        if (totalScore <= 30)      tier = 'low';
        else if (totalScore <= 70) tier = 'med';
        else                       tier = 'high';

        const level = LEVELS[tier];

        // Update feedback panel content
        feedbackIcon.textContent  = level.icon;
        feedbackLevel.textContent = level.heading;
        feedbackLevel.className   = 'feedback-level ' + level.cssClass;
        feedbackScore.textContent = totalScore;
        feedbackMsg.textContent   = level.msg;

        // Show panel
        feedbackPanel.hidden = false;
        feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Change dynamic background
        setBackground(tier);
    };

    /* ---- Dynamic background ---- */
    function setBackground(tier) {
        // Change body background-image via inline style
        body.style.backgroundImage = BACKGROUNDS[tier];

        // Optionally darken overlay for low impact
        if (tier === 'low') {
            overlay.style.background =
                'linear-gradient(180deg, rgba(40,0,0,0.72) 0%, rgba(10,0,0,0.60) 50%, rgba(40,0,0,0.88) 100%)';
        } else if (tier === 'med') {
            overlay.style.background =
                'linear-gradient(180deg, rgba(20,30,10,0.68) 0%, rgba(5,20,5,0.55) 50%, rgba(20,30,10,0.82) 100%)';
        } else {
            overlay.style.background =
                'linear-gradient(180deg, rgba(0,20,40,0.65) 0%, rgba(0,30,50,0.50) 50%, rgba(0,20,40,0.80) 100%)';
        }
    }

    /* ---- Reset ---- */
    window.resetSimulator = function () {
        // Deselect all cards
        cards.forEach(function (card) {
            card.classList.remove('selected');
            card.setAttribute('aria-checked', 'false');
        });

        // Reset score bar
        totalScore = 0;
        scoreFill.style.width = '0%';
        scoreLabel.textContent = '0 / ' + MAX_SCORE;
        scoreBar.setAttribute('aria-valuenow', '0');

        // Hide feedback panel
        feedbackPanel.hidden = true;

        // Reset background
        body.style.backgroundImage = '';
        overlay.style.background   = '';

        // Scroll back to cards
        document.getElementById('cardsGrid').scrollIntoView({ behavior: 'smooth' });
    };

})();
