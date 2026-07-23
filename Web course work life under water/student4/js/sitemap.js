/* sitemap.js – Student 4 */
(function(){
    'use strict';
    var t=document.getElementById('navToggle'),n=document.getElementById('navLinks');
    if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o.toString());});}
    // Keyboard on SVG nodes
    document.querySelectorAll('.sm-node').forEach(function(node){
        node.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();var a=node.querySelector('a');if(a)a.click();}});
    });
})();
