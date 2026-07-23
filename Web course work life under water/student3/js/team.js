/* team.js – Student 3 */
(function(){
    'use strict';
    var t=document.getElementById('navToggle'),n=document.getElementById('navLinks');
    if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o.toString());});}
    // Card reveal on scroll
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target);}});},{threshold:0.15});
    document.querySelectorAll('.team-card,.skill-item').forEach(function(el){el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity 0.5s ease, transform 0.5s ease';obs.observe(el);});
})();
