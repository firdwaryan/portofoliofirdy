/* Depth layer — 2.5D, lalat, scroll-motion, atmosfer (tidak mengubah script.js) */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const root = document.documentElement;
  const sections = [...document.querySelectorAll('.slide-section')];
  const $ = (s) => document.querySelector(s);

  /* 4b. Warna aksen per section */
  const ACCENT = { intro: '#06b6d4', experience: '#6366f1', certifications: '#06b6d4', projects: '#6366f1', organisasi: '#06b6d4', contact: '#6366f1' };
  const LABEL  = { intro: 'Profil', experience: 'Pengalaman', certifications: 'Sertifikasi', projects: 'Proyek', organisasi: 'Organisasi', contact: 'Kontak' };
  const keyOf = (s) => s.dataset.step || s.id.replace('slide-', '');

  /* Aurora latar */
  const aur = document.createElement('div');
  aur.className = 'page-aurora'; aur.setAttribute('aria-hidden', 'true');
  aur.innerHTML = '<i></i><i></i><i></i>';
  document.body.prepend(aur);
  const blobs = [...aur.children], speeds = [0.03, 0.06, 0.045];

  /* 3c. Titik navigasi */
  const dots = document.createElement('nav');
  dots.className = 'depth-dots'; dots.setAttribute('aria-label', 'Navigasi section');
  dots.innerHTML = '<div class="dd-fill"></div>';
  sections.forEach((s) => {
    const a = document.createElement('a');
    a.href = '#' + s.id; a.innerHTML = '<span data-i18n="dots.' + keyOf(s) + '">' + (LABEL[keyOf(s)] || keyOf(s)) + '</span>';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const link = [...document.querySelectorAll('a[href="#' + s.id + '"]')].find((x) => !dots.contains(x));
      if (link) link.click(); else s.scrollIntoView({ behavior: 'smooth' });
    });
    dots.appendChild(a);
  });
  document.body.appendChild(dots);
  if (window.I18N) window.I18N.apply(dots);
  const dotEls = [...dots.querySelectorAll('a')];

  let activeIdx = -1, ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY, vh = innerHeight;
      if (!reduce) blobs.forEach((b, i) => b.style.transform = 'translate3d(0,' + (-y * speeds[i]) + 'px,0)');
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      dots.style.setProperty('--prog', Math.min(100, (y / max) * 100) + '%');
      let idx = 0;
      sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= vh * 0.4) idx = i; });
      if (idx !== activeIdx) {
        activeIdx = idx;
        dotEls.forEach((d, i) => d.classList.toggle('on', i === idx));
        root.style.setProperty('--ac', ACCENT[keyOf(sections[idx])] || '#06b6d4');
      }
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* 1a. Kartu miring + spotlight */
  if (fine && !reduce) {
    let cards = [...document.querySelectorAll('.slide-section [class*="backdrop-blur"][class*="rounded-"]')];
    cards = cards.filter((c) => !cards.some((o) => o !== c && o.contains(c)));
    cards.forEach((el) => {
      el.classList.add('depth-card');
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      const glow = document.createElement('div'); glow.className = 'depth-glow'; el.appendChild(glow);
      el.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        const max = r.width > 700 ? 1.4 : 5;
        el.style.setProperty('--mx', px * 100 + '%'); el.style.setProperty('--my', py * 100 + '%');
        el.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 2 * max).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 2 * max).toFixed(2) + 'deg)';
        el.classList.add('is-tilting');
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; el.classList.remove('is-tilting'); });
    });
  }

  /* 1c. Coverflow tipis pada carousel */
  [['exp-track'], ['proj-track']].forEach(([id]) => {
    const track = document.getElementById(id); if (!track) return;
    const slides = [...track.querySelectorAll('.carousel-slide')];
    const apply = () => {
      const m = /-(\d+(?:\.\d+)?)%/.exec(track.style.transform || '');
      const idx = Math.round(m ? parseFloat(m[1]) / 100 : 0);
      slides.forEach((s, i) => { s.classList.toggle('cf-left', i < idx); s.classList.toggle('cf-right', i > idx); });
    };
    new MutationObserver(apply).observe(track, { attributes: true, attributeFilter: ['style'] });
    apply();
  });

  /* 3a. Reveal bertahap */
  if (!reduce && 'IntersectionObserver' in window) {
    const items = [];
    sections.filter((s) => keyOf(s) !== 'intro').forEach((s) => {
      const c = s.firstElementChild; if (!c) return;
      [...c.children].forEach((ch) => {
        if (ch.matches('.grid, [class*="space-y-4"]')) items.push(...ch.children); else items.push(ch);
      });
    });
    const io = new IntersectionObserver((entries) => {
      let n = 0;
      entries.filter((e) => e.isIntersecting).forEach((e) => {
        const el = e.target; io.unobserve(el);
        el.style.transitionDelay = (n++ * 90) + 'ms';
        el.classList.add('in');
        setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; }, 1500 + n * 90);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  /* 3b. Angka hitung naik (35%, 85 ms, 25.000) */
  const re = /(?<![\d.,])(?:\d{1,3}(?:\.\d{3})+|\d+(?=\s?(?:%|ms\b)))/g;
  const counters = [];
  document.querySelectorAll('#slide-experience li, #slide-projects li').forEach((li) => {
    const w = document.createTreeWalker(li, NodeFilter.SHOW_TEXT), nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach((t) => {
      if (!re.test(t.nodeValue)) { re.lastIndex = 0; return; } re.lastIndex = 0;
      const frag = document.createDocumentFragment(); let last = 0, m;
      while ((m = re.exec(t.nodeValue))) {
        frag.append(t.nodeValue.slice(last, m.index));
        const sp = document.createElement('span'); sp.className = 'count-up'; sp.textContent = m[0];
        sp.dataset.to = m[0].replace(/\./g, ''); sp.dataset.dot = m[0].includes('.') ? '1' : '';
        frag.append(sp); counters.push(sp); last = m.index + m[0].length;
      }
      frag.append(t.nodeValue.slice(last)); t.replaceWith(frag);
    });
  });
  if (!reduce && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return; cio.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, t0 = performance.now();
      const fmt = (v) => el.dataset.dot ? Math.round(v).toLocaleString('id-ID') : String(Math.round(v));
      (function step(now) {
        const p = Math.min(1, (now - t0) / 1400), v = to * (1 - Math.pow(1 - p, 3));
        el.textContent = fmt(v); if (p < 1) requestAnimationFrame(step);
      })(t0);
    }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* 2. Lalat */
  const fly = document.getElementById('guide-fly-container'), svg = document.getElementById('fly-svg');
  if (fly && svg) {
    const sh = document.createElement('div'); sh.className = 'fly-shadow'; fly.appendChild(sh);   // bayangan
    const pupils = [18, 22].map((cx) => {                                                          // pupil mata
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      p.setAttribute('cx', cx); p.setAttribute('cy', 12); p.setAttribute('r', 1.1); p.setAttribute('fill', '#020617');
      svg.appendChild(p); return p;
    });
    let mx = innerWidth / 2, my = innerHeight / 2;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    let lx = null, ly = null;
    (function loop() {
      const r = svg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let dx = mx - cx, dy = my - cy; if (/-1/.test(svg.style.transform)) dx = -dx;
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 220) * 0.95;
      pupils.forEach((p) => p.setAttribute('transform', 'translate(' + (dx / d * k).toFixed(2) + ' ' + (dy / d * k).toFixed(2) + ')'));
      if (!reduce) {                                                                               // jejak cahaya
        const f = fly.getBoundingClientRect(), x = f.left + 20, y = f.top + 20;
        if (lx !== null && Math.hypot(x - lx, y - ly) > 5) {
          const t = document.createElement('div'); t.className = 'fly-trail';
          t.style.left = x + 'px'; t.style.top = y + 'px';
          t.addEventListener('animationend', () => t.remove()); document.body.appendChild(t);
        }
        lx = x; ly = y;
      }
      requestAnimationFrame(loop);
    })();
    if (!reduce) new MutationObserver((muts) => muts.forEach((m) => {                              // percikan saat mendarat
      const el = m.target;
      if (!el.classList.contains('scroll-nav-btn') || !el.classList.contains('target-button-glow')) return;
      if ((m.oldValue || '').includes('target-button-glow')) return;
      setTimeout(() => {
        const r = el.getBoundingClientRect();
        for (let i = 0; i < 12; i++) {
          const s = document.createElement('div'), a = Math.random() * 6.28, d = 22 + Math.random() * 26;
          s.className = 'fly-spark'; s.style.left = (r.left + r.width / 2) + 'px'; s.style.top = (r.top + r.height / 2) + 'px';
          s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px');
          s.addEventListener('animationend', () => s.remove()); document.body.appendChild(s);
        }
      }, 650);
    })).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });
  }

  /* 4a. Kunang-kunang halus */
  if (!reduce) {
    const cv = document.createElement('canvas'); cv.id = 'depth-flies'; cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d'); let W, H, dpr, tick = 0, col = '#06b6d4';
    const fit = () => { dpr = Math.min(2, devicePixelRatio || 1); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
    fit(); addEventListener('resize', fit);
    const P = Array.from({ length: innerWidth < 768 ? 7 : 12 }, () => ({
      x: Math.random(), y: Math.random(), r: 1 + Math.random() * 1.8, a: Math.random() * 6.28, s: 0.00006 + Math.random() * 0.00012, ph: Math.random() * 6.28 }));
    (function draw() {
      if (!document.hidden) {
        if (tick++ % 40 === 0) col = getComputedStyle(root).getPropertyValue('--ac').trim() || col;
        ctx.clearRect(0, 0, W, H); ctx.fillStyle = col;
        P.forEach((p) => {
          p.a += (Math.random() - 0.5) * 0.12; p.x += Math.cos(p.a) * p.s; p.y += Math.sin(p.a) * p.s - 0.00004;
          if (p.x < -0.02) p.x = 1.02; if (p.x > 1.02) p.x = -0.02; if (p.y < -0.02) p.y = 1.02;
          ctx.globalAlpha = 0.25 + 0.55 * Math.abs(Math.sin(tick * 0.02 + p.ph));
          ctx.shadowColor = col; ctx.shadowBlur = 10 * dpr;
          ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * dpr, 0, 6.283); ctx.fill();
        });
      }
      requestAnimationFrame(draw);
    })();
  }
})();
