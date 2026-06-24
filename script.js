(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .skill-card, .proj-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(2)';
      dot.style.background = 'var(--gold-l)';
      ring.style.width  = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'var(--gold)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      dot.style.background = 'var(--gold-l)';
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--teal)';
    });
  });
})();

/* ── STARFIELD CANVAS ── */
(function () {
  const canvas = document.getElementById('star-canvas');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      sp: Math.random() * 0.008 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1,
      color: ['#a855f7','#14b8a6','#f59e0b','#ffffff'][Math.floor(Math.random()*4)]
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.sp * s.dir;
      if (s.a > 1 || s.a < 0) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.a * 0.7;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }

  resize();
  window.addEventListener('resize', resize);
  drawStars();
})();

/* ── TYPEWRITER ── */
(function () {
  const el   = document.getElementById('typewriter');
  const texts = [
    'MCA Student — Cybersecurity & Cyberdefense',
    'AWS Serverless Architect',
    'Web Developer & Frontend Engineer',
    'Cloud Security Enthusiast',
  ];
  let ti = 0, ci = 0, del = false;

  function type() {
    const cur = texts[ti];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; setTimeout(type, 2200); return; }
      setTimeout(type, 58);
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; ti = (ti + 1) % texts.length; setTimeout(type, 350); return; }
      setTimeout(type, 28);
    }
  }
  type();
})();

/* ── NAVBAR SCROLL & ACTIVE ── */
(function () {
  const nav  = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  const sections = document.querySelectorAll('section[id]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => obs.observe(s));
})();

/* ── HAMBURGER ── */
(function () {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');
  ham.addEventListener('click', () => menu.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
})();

/* ── SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

/* ── SKILL BARS ANIMATE ── */
(function () {
  const bars = document.querySelectorAll('.sk-bar');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
})();

/* ── COUNTER ANIMATION ── */
(function () {
  const counters = document.querySelectorAll('[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.target;
        let cur = 0;
        const step = target / 40;
        const int = setInterval(() => {
          cur += step;
          if (cur >= target) { e.target.textContent = target; clearInterval(int); }
          else e.target.textContent = Math.floor(cur);
        }, 30);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

/* ── AURORA BLOB MOUSE PARALLAX ── */
(function () {
  const blobs = document.querySelectorAll('.aurora');
  document.addEventListener('mousemove', e => {
    const cx = e.clientX / window.innerWidth  - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    blobs.forEach((b, i) => {
      const depth = (i + 1) * 12;
      b.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  });
})();

/* ── SKILL TAG HOVER RIPPLE ── */
(function () {
  document.querySelectorAll('.stags span').forEach(tag => {
    tag.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(20,184,166,0.35);
        width:80px; height:80px;
        top:${e.offsetY - 40}px; left:${e.offsetX - 40}px;
        transform:scale(0); animation:ripple 0.5s ease-out;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  const style = document.createElement('style');
  style.textContent = '@keyframes ripple { to { transform:scale(2.5); opacity:0; } }';
  document.head.appendChild(style);
})();

/* ── PROJECT CARD TILT ── */
(function () {
  document.querySelectorAll('.proj-card, .cert-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const rx = (y / rect.height) * -8;
      const ry = (x / rect.width)  *  8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s, border-color 0.3s, box-shadow 0.3s';
    });
  });
})();

/* ── CONTACT FORM ── */
function sendMsg(btn) {
  const fields = btn.closest('.cform').querySelectorAll('.fi');
  let ok = true;
  fields.forEach(f => {
    if (!f.value.trim()) {
      f.style.borderColor = '#f87171';
      ok = false;
    } else {
      f.style.borderColor = '';
    }
  });
  if (!ok) return;

  const txtSpan = btn.querySelector('.btn-text');
  const orig = txtSpan.textContent;
  txtSpan.textContent = 'Message Sent ✓';
  btn.style.pointerEvents = 'none';
  btn.querySelector('.btn-aurora-bg').style.background =
    'linear-gradient(135deg, #065f46, #0f766e)';

  setTimeout(() => {
    txtSpan.textContent = orig;
    btn.style.pointerEvents = '';
    btn.querySelector('.btn-aurora-bg').style.background = '';
    fields.forEach(f => f.value = '');
  }, 3500);
}

/* ── GLITCH EFFECT ON HERO TITLE (rare) ── */
(function () {
  const lines = document.querySelectorAll('.ht-line');
  setInterval(() => {
    if (Math.random() > 0.88) {
      lines.forEach(l => {
        l.style.textShadow = `
          2px 0 var(--teal), -2px 0 var(--purple)
        `;
        l.style.transform = 'skewX(-2deg)';
        setTimeout(() => {
          l.style.textShadow = '';
          l.style.transform = '';
        }, 90);
      });
    }
  }, 3500);
})();

/* ── SCROLL PROGRESS BAR ── */
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px; z-index:9999;
    background:linear-gradient(90deg, var(--purple), var(--teal), var(--gold));
    width:0; transition:width 0.1s; box-shadow:0 0 8px rgba(20,184,166,0.6);
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  });
})();

/* ── SECTION TITLE SHIMMER ON HOVER ── */
(function () {
  document.querySelectorAll('.section-title').forEach(t => {
    t.addEventListener('mouseenter', () => {
      t.style.background = 'linear-gradient(90deg, var(--teal-l), var(--purple-l), var(--gold-l))';
      t.style.webkitBackgroundClip = 'text';
      t.style.webkitTextFillColor = 'transparent';
      t.style.backgroundClip = 'text';
    });
    t.addEventListener('mouseleave', () => {
      t.style.background = '';
      t.style.webkitBackgroundClip = '';
      t.style.webkitTextFillColor = '';
      t.style.backgroundClip = '';
    });
  });
})();
