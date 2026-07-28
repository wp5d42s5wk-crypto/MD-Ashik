// script.js — interactions for MD Ashik portfolio
(function(){
  // Preloader
  window.addEventListener('load', ()=>{
    const p = document.getElementById('preloader');
    if(p){p.style.opacity=0;setTimeout(()=>p.remove(),600)}
    // init counters & skill bars
    initCounters();
    animateSkillBars();
  });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if(stored==='light') document.body.classList.add('light');
  themeToggle && themeToggle.addEventListener('click', ()=>{
    const isLight = document.body.classList.toggle('light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem('theme', isLight? 'light':'dark');
  });

  // Mobile toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  mobileToggle && mobileToggle.addEventListener('click', ()=>{
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.style.display = expanded? 'none':'flex';
  });

  // Smooth scroll active link
  const links = document.querySelectorAll('.nav-links a');
  function onScroll(){
    const pos = window.scrollY + 120;
    document.querySelectorAll('main section[id]').forEach(sec=>{
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector('.nav-links a[href="#'+id+'"]');
      if(pos >= top && pos < top+h){
        link && link.classList.add('active');
      } else link && link.classList.remove('active');
    });
  }
  window.addEventListener('scroll', onScroll);

  // Counters
  function initCounters(){
    document.querySelectorAll('.count').forEach(el=>{
      const target = +el.dataset.target || 0;
      let cur = 0; const step = Math.max(1, Math.floor(target/100));
      const t = setInterval(()=>{
        cur += step; if(cur>=target){el.textContent = target; clearInterval(t)} else el.textContent = cur;
      },18);
    });
  }

  // Skill bars animate when visible
  function animateSkillBars(){
    const bars = document.querySelectorAll('.skill-bar');
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const bar = entry.target;
          const level = bar.dataset.level || 0;
          const fill = bar.querySelector('.fill');
          fill.style.width = level + '%';
          obs.unobserve(bar);
        }
      });
    },{threshold:0.35});
    bars.forEach(b=>obs.observe(b));
  }

  // Project hover keyboard focus (accessibility)
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('keypress', e=>{if(e.key==='Enter') card.click();});
  });

  // Contact form (simulated)
  document.getElementById('contact-form')?.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Thanks! Message sent (demo).');
    e.target.reset();
  });

})();
