/**
 * Storytelling Interactive Experience Engine
 * Controls: Animated Fly Guide, Carousel Slider, Scroll Snap Tracking, and Theme
 */

document.addEventListener('DOMContentLoaded', () => {

  // Penerjemah dua bahasa (lihat i18n.js)
  const T = (key, vars) => window.I18N.t(key, vars);

  // 1. Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Mode Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('porto_theme');
  if (savedTheme === 'light') {
    htmlRoot.classList.remove('dark');
  } else {
    htmlRoot.classList.add('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      htmlRoot.classList.toggle('dark');
      const isDark = htmlRoot.classList.contains('dark');
      localStorage.setItem('porto_theme', isDark ? 'dark' : 'light');
      showToast(isDark ? T('toast.dark') : T('toast.light'));
    });
  }

  // 3. Toast Notification System
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2600);
  }

  // 4. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIconOpen) menuIconOpen.classList.add('hidden');
        if (menuIconClose) menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      });
    });
  }

  // Safe stubs for fly-guide helpers if fly guide is absent/removed
  let clearTargetHighlight = function() {};
  let hideSpeech = function() {};
  let enterExperienceSlide = function() {};
  let enterProjectSlide = function() {};
  let enterSection = function() {};

  // ==============================================================
  // 5. CAROUSEL PENGALAMAN KERJA (SLIDE PER HALAMAN)
  //    Full Interactive Drag/Swipe Engine (Mouse, Touch, Wheel, Keys)
  // ==============================================================
  const expTrack = document.getElementById('exp-track');
  const expPrevBtn = document.getElementById('exp-prev-btn');
  const expNextBtn = document.getElementById('exp-next-btn');
  const expCounter = document.getElementById('exp-counter');
  const expViewToggle = document.getElementById('exp-view-toggle');
  const expViewLabel  = document.getElementById('exp-view-label');
  const expViewIcon   = document.getElementById('exp-view-icon');
  const expNavBtns    = document.getElementById('exp-nav-btns');
  const carouselWrapper = document.getElementById('exp-carousel-wrapper');
  const totalExpSlides = document.querySelectorAll('#exp-track .carousel-slide').length || 1;
  let currentExpSlide = 0;
  let isExpAllView = false;

  function setExpViewMode(allView) {
    isExpAllView = allView;
    if (!expTrack || !carouselWrapper) return;
    const expHintText = document.querySelector('[data-i18n="exp.hint"]');

    if (isExpAllView) {
      expTrack.classList.add('is-all-view');
      carouselWrapper.classList.add('is-all-view');
      expTrack.style.transform = 'none';
      if (expCounter) expCounter.classList.add('hidden');
      if (expNavBtns) expNavBtns.classList.add('hidden');
      if (expViewLabel) {
        expViewLabel.textContent = (window.I18N && window.I18N.t) ? window.I18N.t('exp.viewSlide') : 'Mode Geser';
      }
      if (expViewIcon) {
        expViewIcon.setAttribute('data-lucide', 'sliders-horizontal');
      }
      if (expHintText) {
        expHintText.textContent = (window.I18N && window.I18N.t) ? window.I18N.t('exp.allHint') : 'Menampilkan semua 4 pengalaman kerja';
      }
      const expHintSub = document.getElementById('exp-hint-sub');
      if (expHintSub) expHintSub.classList.add('hidden');
    } else {
      expTrack.classList.remove('is-all-view');
      carouselWrapper.classList.remove('is-all-view');
      if (expCounter) expCounter.classList.remove('hidden');
      if (expNavBtns) expNavBtns.classList.remove('hidden');
      if (expViewLabel) {
        expViewLabel.textContent = (window.I18N && window.I18N.t) ? window.I18N.t('exp.viewAll') : 'Lihat Semua';
      }
      if (expViewIcon) {
        expViewIcon.setAttribute('data-lucide', 'layout-grid');
      }
      if (expHintText) {
        expHintText.textContent = (window.I18N && window.I18N.t) ? window.I18N.t('exp.hint') : 'Geser kartu, atau pakai tombol (>) dan tombol panah di keyboard';
      }
      const expHintSub = document.getElementById('exp-hint-sub');
      if (expHintSub) expHintSub.classList.remove('hidden');
      updateExpCarousel(false);
    }
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }

  if (expViewToggle) {
    expViewToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setExpViewMode(!isExpAllView);
    });
  }

  function updateExpCarousel(triggerFly = true) {
    if (!expTrack || isExpAllView) return;
    expTrack.classList.remove('is-dragging');
    if (carouselWrapper) carouselWrapper.classList.remove('is-dragging');
    expTrack.style.transform = `translateX(-${currentExpSlide * 100}%)`;
    if (expCounter) {
      expCounter.textContent = `${currentExpSlide + 1} / ${totalExpSlides}`;
    }
    if (expPrevBtn) {
      expPrevBtn.disabled = currentExpSlide === 0;
    }
    if (expNextBtn) {
      expNextBtn.disabled = currentExpSlide === totalExpSlides - 1;
    }

    // Connect with Fly guide: trigger state-machine for this specific slide
    if (triggerFly && typeof enterExperienceSlide === 'function' && currentSection === 'experience') {
      enterExperienceSlide(currentExpSlide);
    }
  }

  function goToNextSlide() {
    if (isExpAllView) return;
    clearTargetHighlight();
    hideSpeech();
    if (currentExpSlide < totalExpSlides - 1) {
      currentExpSlide++;
      updateExpCarousel(true);
    } else {
      updateExpCarousel(false);
    }
  }

  function goToPrevSlide() {
    if (isExpAllView) return;
    clearTargetHighlight();
    hideSpeech();
    if (currentExpSlide > 0) {
      currentExpSlide--;
      updateExpCarousel(true);
    } else {
      updateExpCarousel(false);
    }
  }

  if (expPrevBtn) {
    expPrevBtn.addEventListener('click', goToPrevSlide);
    expPrevBtn.addEventListener('mouseenter', function() {
      if (flyContainer && flyContainer.classList.contains('guide-mode')) {
        hideSpeech();
      }
    });
  }

  if (expNextBtn) {
    expNextBtn.addEventListener('click', goToNextSlide);
    expNextBtn.addEventListener('mouseenter', function() {
      if (flyContainer && flyContainer.classList.contains('guide-mode')) {
        hideSpeech();
      }
    });
  }

  // ── Universal Drag / Swipe Engine (Pointer Events for Touch + Mouse) ───
  if (carouselWrapper && expTrack) {
    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    let currentDeltaX = 0;
    let isHorizontalDrag = false;
    let hasMoved = false;

    carouselWrapper.addEventListener('pointerdown', (e) => {
      if (isExpAllView) return; // Mode lihat semua tidak memakai swipe horizontal
      // Don't hijack button/link clicks directly
      if (e.target.closest('button, a, input, textarea')) return;

      isPointerDown = true;
      hasMoved = false;
      isHorizontalDrag = false;
      startX = e.clientX;
      startY = e.clientY;
      currentDeltaX = 0;

      try { carouselWrapper.setPointerCapture(e.pointerId); } catch (err) {}
    });

    carouselWrapper.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;

      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;

      // Determine drag intent (horizontal vs vertical scroll)
      if (!isHorizontalDrag) {
        if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
          isHorizontalDrag = true;
          hasMoved = true;
          carouselWrapper.classList.add('is-dragging');
          expTrack.classList.add('is-dragging');
        } else if (Math.abs(diffY) > 8) {
          isPointerDown = false;
          carouselWrapper.classList.remove('is-dragging');
          expTrack.classList.remove('is-dragging');
          return;
        }
      }

      if (isHorizontalDrag) {
        currentDeltaX = diffX;
        let resistance = 1;
        if ((currentExpSlide === 0 && diffX > 0) || (currentExpSlide === totalExpSlides - 1 && diffX < 0)) {
          resistance = 0.35;
        }
        const effectiveDelta = diffX * resistance;
        const wrapperWidth = carouselWrapper.offsetWidth || 1;
        const pctOffset = (effectiveDelta / wrapperWidth) * 100;
        expTrack.style.transform = `translateX(calc(-${currentExpSlide * 100}% + ${pctOffset}%))`;
      }
    });

    const finishDrag = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      carouselWrapper.classList.remove('is-dragging');
      expTrack.classList.remove('is-dragging');

      try { carouselWrapper.releasePointerCapture(e.pointerId); } catch (err) {}

      if (isHorizontalDrag && hasMoved) {
        const wrapperWidth = carouselWrapper.offsetWidth || 1;
        const dragThreshold = Math.min(wrapperWidth * 0.12, 50); // 12% or 50px

        if (currentDeltaX < -dragThreshold) {
          goToNextSlide();
        } else if (currentDeltaX > dragThreshold) {
          goToPrevSlide();
        } else {
          updateExpCarousel(false);
        }
      } else {
        updateExpCarousel(false);
      }

      isHorizontalDrag = false;
      currentDeltaX = 0;
    };

    carouselWrapper.addEventListener('pointerup', finishDrag);
    carouselWrapper.addEventListener('pointercancel', finishDrag);
    carouselWrapper.addEventListener('pointerleave', (e) => {
      if (isPointerDown) {
        finishDrag(e);
      }
    });

    // ── Trackpad Horizontal Swipe Support ─────────────────────────────────
    let wheelDebounce = false;
    carouselWrapper.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 35) {
        if (!wheelDebounce) {
          wheelDebounce = true;
          if (e.deltaX > 0) {
            goToNextSlide();
          } else {
            goToPrevSlide();
          }
          setTimeout(() => { wheelDebounce = false; }, 400);
        }
      }
    }, { passive: true });

    // ── Keyboard Arrow Keys (Left / Right) ────────────────────────────────
    window.addEventListener('keydown', (e) => {
      if (currentSection === 'experience') {
        if (e.key === 'ArrowRight') {
          goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
          goToPrevSlide();
        }
      }
    });
  }

  // ==============================================================
  // 5B. CAROUSEL PROYEK UNGGULAN & GALERI FOTO INTERAKTIF
  // ==============================================================
  const projTrack = document.getElementById('proj-track');
  const projPrevBtn = document.getElementById('proj-prev-btn');
  const projNextBtn = document.getElementById('proj-next-btn');
  const projCounter = document.getElementById('proj-counter');
  const projWrapper = document.getElementById('proj-carousel-wrapper');
  const totalProjSlides = document.querySelectorAll('#proj-track .carousel-slide').length || 1;
  let currentProjSlide = 0;

  function updateProjCarousel() {
    if (!projTrack) return;
    projTrack.classList.remove('is-dragging');
    if (projWrapper) projWrapper.classList.remove('is-dragging');
    projTrack.style.transform = `translateX(-${currentProjSlide * 100}%)`;
    if (projCounter) {
      projCounter.textContent = `${currentProjSlide + 1} / ${totalProjSlides}`;
    }
    if (projPrevBtn) {
      projPrevBtn.disabled = currentProjSlide === 0;
    }
    if (projNextBtn) {
      projNextBtn.disabled = currentProjSlide === totalProjSlides - 1;
    }
    if (typeof enterProjectSlide === 'function' && currentSection === 'projects') {
      enterProjectSlide(currentProjSlide);
    }
  }

  function goToNextProjSlide() {
    if (currentProjSlide < totalProjSlides - 1) {
      currentProjSlide++;
      updateProjCarousel();
    }
  }

  function goToPrevProjSlide() {
    clearTargetHighlight();
    hideSpeech();
    if (currentProjSlide > 0) {
      currentProjSlide--;
      updateProjCarousel();
    }
  }

  if (projPrevBtn) {
    projPrevBtn.addEventListener('click', goToPrevProjSlide);
    projPrevBtn.addEventListener('mouseenter', function() {
      if (flyContainer && flyContainer.classList.contains('guide-mode')) {
        hideSpeech();
      }
    });
  }
  if (projNextBtn) {
    projNextBtn.addEventListener('click', goToNextProjSlide);
    projNextBtn.addEventListener('mouseenter', function() {
      if (flyContainer && flyContainer.classList.contains('guide-mode')) {
        hideSpeech();
      }
    });
  }

  // Drag / Swipe Engine for Project Carousel
  if (projWrapper && projTrack) {
    let isProjPointerDown = false;
    let startProjX = 0;
    let startProjY = 0;
    let currentProjDeltaX = 0;
    let isProjHorizontal = false;
    let hasProjMoved = false;

    projWrapper.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, textarea')) return;
      isProjPointerDown = true;
      hasProjMoved = false;
      isProjHorizontal = false;
      startProjX = e.clientX;
      startProjY = e.clientY;
      currentProjDeltaX = 0;
      try { projWrapper.setPointerCapture(e.pointerId); } catch (err) {}
    });

    projWrapper.addEventListener('pointermove', (e) => {
      if (!isProjPointerDown) return;
      const diffX = e.clientX - startProjX;
      const diffY = e.clientY - startProjY;

      if (!isProjHorizontal) {
        if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
          isProjHorizontal = true;
          hasProjMoved = true;
          projWrapper.classList.add('is-dragging');
          projTrack.classList.add('is-dragging');
        } else if (Math.abs(diffY) > 8) {
          isProjPointerDown = false;
          projWrapper.classList.remove('is-dragging');
          projTrack.classList.remove('is-dragging');
          return;
        }
      }

      if (isProjHorizontal) {
        currentProjDeltaX = diffX;
        let resistance = 1;
        if ((currentProjSlide === 0 && diffX > 0) || (currentProjSlide === totalProjSlides - 1 && diffX < 0)) {
          resistance = 0.35;
        }
        const effectiveDelta = diffX * resistance;
        const wrapperWidth = projWrapper.offsetWidth || 1;
        const pctOffset = (effectiveDelta / wrapperWidth) * 100;
        projTrack.style.transform = `translateX(calc(-${currentProjSlide * 100}% + ${pctOffset}%))`;
      }
    });

    const finishProjDrag = (e) => {
      if (!isProjPointerDown) return;
      isProjPointerDown = false;
      projWrapper.classList.remove('is-dragging');
      projTrack.classList.remove('is-dragging');
      try { projWrapper.releasePointerCapture(e.pointerId); } catch (err) {}

      if (isProjHorizontal && hasProjMoved) {
        const wrapperWidth = projWrapper.offsetWidth || 1;
        const dragThreshold = Math.min(wrapperWidth * 0.12, 50);

        if (currentProjDeltaX < -dragThreshold) {
          goToNextProjSlide();
        } else if (currentProjDeltaX > dragThreshold) {
          goToPrevProjSlide();
        } else {
          updateProjCarousel();
        }
      } else {
        updateProjCarousel();
      }
      isProjHorizontal = false;
      currentProjDeltaX = 0;
    };

    projWrapper.addEventListener('pointerup', finishProjDrag);
    projWrapper.addEventListener('pointercancel', finishProjDrag);
    projWrapper.addEventListener('pointerleave', (e) => {
      if (isProjPointerDown) finishProjDrag(e);
    });

    // Keyboard Arrow Keys for Projects
    window.addEventListener('keydown', (e) => {
      if (currentSection === 'projects') {
        if (e.key === 'ArrowRight') {
          goToNextProjSlide();
        } else if (e.key === 'ArrowLeft') {
          goToPrevProjSlide();
        }
      }
    });
  }

  // ── Project Photo Gallery Thumbnail Switcher ──────────────────────────────
  document.querySelectorAll('.proj-thumb-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const newSrc = this.getAttribute('data-src');
      const titleTargetId = this.getAttribute('data-title-target');
      const newTitle = this.getAttribute('data-title');

      const targetImg = document.getElementById(targetId);
      if (targetImg && newSrc) {
        targetImg.style.opacity = '0.3';
        targetImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          targetImg.src = newSrc;
          targetImg.style.opacity = '1';
          targetImg.style.transform = 'scale(1)';
        }, 120);
      }

      if (titleTargetId && newTitle) {
        const titleEl = document.getElementById(titleTargetId);
        if (titleEl) titleEl.textContent = newTitle;
      }

      // Highlight active thumbnail in this group
      const parentGroup = this.closest('.grid');
      if (parentGroup) {
        parentGroup.querySelectorAll('.proj-thumb-btn').forEach(thumb => {
          thumb.classList.remove('active', 'border-brand-500', 'border-accent-500');
          thumb.classList.add('border-transparent');
        });
      }
      this.classList.add('active');
      if (this.getAttribute('data-target') === 'proj1-main-img') {
        this.classList.add('border-brand-500');
      } else if (this.getAttribute('data-target') === 'proj2-main-img') {
        this.classList.add('border-accent-500');
      } else {
        this.classList.add('border-brand-500');
      }
    });
  });

  // ==============================================================
  // 6. ANIMATED FLY GUIDE — FULL STATE MACHINE (READ → GUIDE)
  //    Phase 1 (READ)  : hover near content, let user read
  //    Phase 2 (GUIDE) : swoop to next button & orbit it with glowing ring
  // ==============================================================
  const flyContainer = document.getElementById('guide-fly-container');
  if (flyContainer) {
  const flySvg       = document.getElementById('fly-svg');
  const flySpeech    = document.getElementById('fly-speech');

  let lastLeft        = 50;
  let currentSection  = 'intro';
  let readPhaseTimer  = null;
  let circleAnimFrame = null;
  let circlePhase     = 0;
  let activeTargetButton  = null;   // tombol yang sedang ditunjuk lalat
  let scrollDebounceTimer = null;   // timer deteksi seksi saat scroll
  let driftTimer          = null;   // timer gerak halus saat fase baca
  let speechTimer         = null;
  let flyBase             = { l: 50, t: 120 };
  let onbActive           = false;  // true selama lalat memperkenalkan tombol tema & bahasa
  let onbToken            = 0;
  let onbPlayed           = false;  // demo tema & bahasa hanya boleh jalan sekali per kunjungan
  let onbStartY           = 0;      // posisi gulir saat demo dimulai

  // ── Teks pemandu dari guide-copy.js (window.FLY_COPY) ──────────────────────
  // Selalu membaca window.FLY_COPY terbaru, jadi otomatis ikut bahasa aktif
  const COPY = new Proxy({}, { get: function (_, k) { return (window.FLY_COPY || {})[k]; } });
  function copyAt(key, idx) {
    if (key === 'experience') return (COPY.experience || [])[idx];
    if (key === 'projects')   return (COPY.projects   || [])[idx];
    return COPY[key];
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function goTo(hash) { const a = document.querySelector('a[href="' + hash + '"]'); if (a) a.click(); }

  // ── Helper teks dinamis: isi bubble diambil dari konten halaman ────────────
  function clean(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function short(t, n) { return t.length > n ? t.slice(0, n - 1).trim() + '…' : t; }
  function countOf(sel) { return document.querySelectorAll(sel).length; }

  function expSpeech(i) {
    const slides = document.querySelectorAll('#exp-track .carousel-slide');
    const sl = slides[i];
    if (!sl) return T('fly.exp.fallback');
    const title  = short(clean(sl.querySelector('h3')), 70);
    const period = clean(sl.querySelector('[data-period]'));
    const result = clean(sl.querySelector('ul li span:last-child'));
    let t = T('fly.exp.head', { i: i + 1, n: slides.length, title: title });
    if (period) t += ' (' + period + ')';
    t += '. ';
    t += result ? T('fly.exp.result', { text: short(result, 110) }) : T('fly.exp.read');
    return t;
  }

  // ── Konfigurasi per seksi (teks boleh berupa string atau fungsi) ───────────
  // ── Helper Posisi Kustomisasi (bisa diedit di window.FLY_POSITIONS di guide-copy.js) ──
  function getCustomPos(key, isMobile) {
    const custom = window.FLY_POSITIONS && window.FLY_POSITIONS[key];
    if (custom) {
      const mode = isMobile ? custom.mobile : custom.desktop;
      if (mode && typeof mode.leftPct === 'number' && typeof mode.topPx === 'number') {
        return { leftPct: mode.leftPct, topPx: mode.topPx };
      }
    }
    return null;
  }

  function getSectionPos(key, isMobile) {
    const cp = getCustomPos(key, isMobile);
    if (cp) return cp;
    return isMobile
      ? { leftPct: 76, topPx: 80 }
      : { leftPct: 84, topPx: 110 };
  }

  // ── Konfigurasi per seksi (teks boleh berupa string atau fungsi) ───────────
  const FLY_CONFIG = {
    intro: {
      get readPos() { return getSectionPos('intro', window.innerWidth < 768); },
      get readSpeech() { return T('fly.intro.read'); },
      guideSel:   '#scroll-bottom-btn',
      get guideSpeech() { return T('fly.intro.guide'); },
      readMs:     8500,   // waktu untuk membaca perkenalan sebelum lalat menunjuk tombol ↓
    },
    // Pengalaman kerja memakai konfigurasi per kartu di bawah
    certifications: {
      get readPos() { return getSectionPos('certifications', window.innerWidth < 768); },
      get readSpeech() { return T('fly.cert.read'); },
      guideSel:   '#scroll-bottom-btn',
      get guideSpeech() { return T('fly.cert.guide'); },
      readMs:     5500,
    },
    projects: {
      get readPos() { return getSectionPos('projects', window.innerWidth < 768); },
      readSpeech: function () {
        const n = countOf('#proj-track .carousel-slide');
        return T('fly.proj.read', { n: n });
      },
      guideSel:   '#scroll-bottom-btn',
      get guideSpeech() { return T('fly.proj.guide'); },
      readMs:     5500,
    },
    organisasi: {
      get readPos() { return getSectionPos('organisasi', window.innerWidth < 768); },
      get readSpeech() { return T('fly.org.read'); },
      guideSel:   '#scroll-bottom-btn',
      get guideSpeech() { return T('fly.org.guide'); },
      readMs:     5000,
    },
    contact: {
      get readPos() { return getSectionPos('contact', window.innerWidth < 768); },
      get readSpeech() { return T('fly.contact.read'); },
      guideSel:   '#contact-whatsapp-btn',
      get guideSpeech() { return T('fly.contact.guide'); },
      readMs:     5000,
    },
  };

  // ── Konfigurasi tiap kartu pengalaman kerja ───────────────────────────────
  const EXP_SLIDES_CONFIG = Array.from({ length: countOf('#exp-track .carousel-slide') }, function (_, i) { return i; }).map(function (i) {
    const last = i === countOf('#exp-track .carousel-slide') - 1;
    return {
      get readPos() { return getSectionPos('experience', window.innerWidth < 768); },
      readSpeech: function () { return expSpeech(i); },
      guideSel:   last ? '#scroll-bottom-btn' : '#exp-next-btn',
      get guideSpeech() { return last ? T('fly.exp.guideLast') : T('fly.exp.guideNext'); },
      readMs:     5500,
    };
  });

  function resolveText(v) { return typeof v === 'function' ? v() : v; }

  // ── Posisi tujuan lalat (px) dari style left/top ───────────────────────────
  function flyTarget() {
    const l = flyContainer.style.left || '50%';
    const t = flyContainer.style.top  || '120px';
    return {
      x: l.indexOf('%') > -1 ? parseFloat(l) / 100 * window.innerWidth  : parseFloat(l),
      y: t.indexOf('%') > -1 ? parseFloat(t) / 100 * window.innerHeight : parseFloat(t)
    };
  }

  let autoDismissTimer = null;
  let currentPlacement = 'top';

  function hideSpeech() {
    if (!flySpeech) return;
    clearTimeout(speechTimer);
    clearTimeout(autoDismissTimer);
    flySpeech.style.opacity = '0';
    flySpeech.style.pointerEvents = 'none';
  }

  // ── Jaga bubble agar tidak terpotong di tepi layar ─────────────────────────
  function clampBubble() {
    if (!flySpeech || !flyContainer) return;
    if (flySpeech.classList.contains('bubble-left') || flySpeech.classList.contains('bubble-right')) {
      flySpeech.style.marginLeft = '0px';
      flySpeech.style.setProperty('--arrow-shift', '0px');
      return;
    }
    const scale = (flyContainer.getBoundingClientRect().width / (flyContainer.offsetWidth || 1)) || 1;
    const half  = (flySpeech.offsetWidth / 2) * scale;
    const cx    = flyTarget().x + (flyContainer.offsetWidth * scale) / 2;
    const vw    = window.innerWidth;
    let shift = 0;
    if (cx - half < 8)       shift = 8 - (cx - half);
    else if (cx + half > vw - 8) shift = (vw - 8) - (cx + half);
    flySpeech.style.marginLeft = (shift / scale) + 'px';
    flySpeech.style.setProperty('--arrow-shift', (shift / scale) + 'px');
  }

  // ── Tampilkan bubble dengan animasi & tombol dismiss ───────────────────────
  function showSpeech(text, placement) {
    if (!flySpeech) return;
    clearTimeout(speechTimer);
    clearTimeout(autoDismissTimer);
    flySpeech.style.opacity = '0';

    currentPlacement = placement || (flyTarget().y < 120 ? 'below' : 'top');

    speechTimer = setTimeout(function () {
      flySpeech.innerHTML = '<span class="fly-bubble-text">' + text + '</span><button type="button" class="fly-bubble-close" aria-label="Tutup pesan" title="Tutup">✕</button>';

      const closeBtn = flySpeech.querySelector('.fly-bubble-close');
      if (closeBtn) {
        closeBtn.onclick = function (e) {
          e.stopPropagation();
          hideSpeech();
        };
      }
      flySpeech.onclick = function () {
        hideSpeech();
      };

      flySpeech.className = 'fly-speech-bubble';
      flySpeech.style.pointerEvents = 'auto';
      flySpeech.style.marginLeft = '0px';

      if (currentPlacement === 'left') {
        flySpeech.classList.add('bubble-left');
      } else if (currentPlacement === 'right') {
        flySpeech.classList.add('bubble-right');
      } else if (currentPlacement === 'below') {
        flySpeech.classList.add('bubble-below');
      }

      flySpeech.style.opacity = '1';
      clampBubble();

      // Auto dismiss setelah 8.5 detik agar tidak menghalangi
      autoDismissTimer = setTimeout(hideSpeech, 8500);
    }, 250);
  }

  // ── Gerak halus saat fase baca agar lalat tidak terlihat diam ──────────────
  function stopDrift() {
    clearInterval(driftTimer);
    driftTimer = null;
  }

  function startDrift() {
    stopDrift();
    if (!flyContainer) return;
    driftTimer = setInterval(function () {
      if (flyContainer.classList.contains('guide-mode')) return;
      const rnd = function (a, b) { return a + Math.random() * (b - a); };
      const l = Math.min(Math.max(flyBase.l + rnd(-2.5, 2.5), 10), 88);
      const t = Math.max(flyBase.t + rnd(-8, 8), 70);
      flyContainer.style.left = l + '%';
      flyContainer.style.top  = t + 'px';
      if (flySvg) flySvg.style.transform = l >= lastLeft ? 'scaleX(1)' : 'scaleX(-1)';
      lastLeft = l;
      clampBubble();
    }, 2800);
  }

  // ── Clear button target highlights ────────────────────────────────────────
  function clearTargetHighlight() {
    stopDrift();
    if (activeTargetButton) {
      activeTargetButton.classList.remove('target-button-glow');
      activeTargetButton = null;
    }
    if (flyContainer) {
      flyContainer.classList.remove('guide-mode');
    }
  }

  // ── Smooth Aerodynamic Glide to Coordinates ───────────────────────────────
  function glideTo(leftPct, topPx, isMobile, isSmall, force) {
    if (!flyContainer) return;
    let l = leftPct;
    let t = topPx;

    if (isMobile && !force) {
      l = Math.min(Math.max(l, 12), 70);
      t = isSmall ? 82 : 96;
    }

    flyBase = { l: l, t: t };
    flyContainer.style.removeProperty('right');
    flyContainer.style.left = l + '%';
    flyContainer.style.top  = t + 'px';

    // Face direction of flight
    if (flySvg) {
      flySvg.style.transition = 'transform 0.28s ease';
      flySvg.style.transform  = l >= lastLeft ? 'scaleX(1)' : 'scaleX(-1)';
    }
    lastLeft = l;
  }

  // ── Posisi lalat relatif terhadap tombol target (Ngarahin, BUKAN ngalangin!) ──
  function anchorFor(btn) {
    const rect     = btn.getBoundingClientRect();
    const vw       = window.innerWidth;
    const vh       = window.innerHeight;
    const isMobile = vw < 768;
    const isNav    = !!btn.closest('#scroll-nav');
    const isCarouselNav = btn.id === 'proj-next-btn' || btn.id === 'exp-next-btn' ||
                          btn.id === 'proj-prev-btn' || btn.id === 'exp-prev-btn' ||
                          (btn.parentElement && btn.parentElement.children.length > 1);

    let leftPx, topPx, bubblePlacement = 'top';

    if (isNav) {
      // Tombol navigasi di kanan layar:
      // Lalat hinggap di ATAS tombol, bubble di ATAS lalat agar TIDAK menutupi ikon media sosial di kirinya!
      leftPx = rect.left + (rect.width / 2) - 20;
      topPx  = rect.top - 58;
      bubblePlacement = 'top';
    } else if (isCarouselNav) {
      // Tombol navigasi carousel (< dan >):
      // JANGAN PERNAH hinggap di sebelah KIRI tombol next!
      // Karena rect.left - 48 akan MENUTUPI tombol prev (<), membuat tombol back tidak terlihat dan tidak bisa diklik!
      // Lalat melayang aman di ATAS tombol (> 50px di atas) atau di KANAN jika mepet atas.
      // bubblePlacement harus 'top' atau 'right', JANGAN 'left' agar tidak menghalangi tombol prev!
      if (rect.top >= 95) {
        // Cukup ruang di atas tombol: melayang tepat di ATAS tombol (54px di atas tombol)
        leftPx = rect.left + (rect.width / 2) - 18;
        topPx  = rect.top - 54;
        bubblePlacement = 'top';
      } else if (vw - rect.right >= 140) {
        // Mepet tepi atas tapi ada ruang di kanan: melayang di KANAN tombol
        leftPx = rect.right + 14;
        topPx  = rect.top + (rect.height / 2) - 18;
        bubblePlacement = 'right';
      } else {
        // Fallback aman: di atas sedikit dengan margin aman
        leftPx = rect.left + (rect.width / 2) - 18;
        topPx  = Math.max(68, rect.top - 54);
        bubblePlacement = 'top';
      }
    } else if (rect.width <= 64) {
      // Tombol bulat / kecil mandiri (tanpa tombol saudara di sampingnya)
      if (rect.top >= 95) {
        leftPx = rect.left + (rect.width / 2) - 18;
        topPx  = rect.top - 54;
        bubblePlacement = 'top';
      } else if (rect.left > 130) {
        leftPx = rect.left - 48;
        topPx  = rect.top + (rect.height / 2) - 18;
        bubblePlacement = 'left';
      } else {
        leftPx = rect.right + 14;
        topPx  = rect.top + (rect.height / 2) - 18;
        bubblePlacement = 'right';
      }
    } else {
      // Kartu atau tombol lebar (seperti WhatsApp card di kontak):
      // JANGAN PERNAH menutupi tombol atau teks kartu!
      // Beri jarak aman di atas kartu jika cukup ruang, atau di samping/bawah
      if (rect.top >= 135) {
        // Cukup ruang di atas kartu
        leftPx = rect.left + Math.min(80, rect.width / 2) - 20;
        topPx  = rect.top - 58;
        bubblePlacement = 'top';
      } else if (vh - rect.bottom >= 135) {
        // Tidak cukup ruang di atas, tapi ada ruang di bawah
        leftPx = rect.left + Math.min(80, rect.width / 2) - 20;
        topPx  = rect.bottom + 18;
        bubblePlacement = 'below';
      } else if (rect.left >= 75) {
        // Hinggap di sebelah kiri kartu
        leftPx = rect.left - 48;
        topPx  = rect.top + 8;
        bubblePlacement = 'left';
      } else {
        leftPx = rect.left + 16;
        topPx  = Math.max(70, rect.top - 54);
        bubblePlacement = 'top';
      }
    }

    leftPx = Math.min(Math.max(leftPx, 16), vw - 64);
    topPx  = Math.min(Math.max(topPx, isMobile ? 65 : 60), vh - 60);

    return { left: leftPx, top: topPx, bubblePlacement: bubblePlacement };
  }

  // ── Purposeful Glide to Target Button with Glowing Highlight ──────────────
  function glideToButton(sel, speechText) {
    const btn = sel ? document.querySelector(sel) : null;
    if (!btn || !flyContainer) return;
    if (btn.offsetParent === null) {
      showSpeech(speechText);
      return;
    }

    clearTargetHighlight();
    activeTargetButton = btn;
    btn.classList.add('target-button-glow');
    flyContainer.classList.add('guide-mode');

    const rect     = btn.getBoundingClientRect();
    const vw       = window.innerWidth;
    const vh       = window.innerHeight;
    const pos      = anchorFor(btn);

    glideTo((pos.left / vw) * 100, pos.top, false, false, true);

    // Lalat selalu menoleh ke arah tombol target yang sedang ditunjuk
    if (flySvg) {
      const btnCenterX = rect.left + rect.width / 2;
      flySvg.style.transform = btnCenterX >= pos.left ? 'scaleX(1)' : 'scaleX(-1)';
    }

    let hint = speechText;
    if (rect.top > vh)        hint += T('fly.further.down');
    else if (rect.bottom < 0) hint += T('fly.further.up');
    showSpeech(hint, pos.bubblePlacement);
  }

  // ── Keep fly anchored to active target button on user scroll ──────────────
  window.addEventListener('scroll', function() {
    if (activeTargetButton && flyContainer && flyContainer.classList.contains('guide-mode')) {
      const pos = anchorFor(activeTargetButton);
      flyContainer.style.left = (pos.left / window.innerWidth) * 100 + '%';
      flyContainer.style.top  = pos.top + 'px';
      clampBubble();
    }
  }, { passive: true });

  // ── Handle Experience Slide Guidance ──────────────────────────────────────
  function enterExperienceSlide(slideIdx) {
    const cfg = EXP_SLIDES_CONFIG[slideIdx];
    if (!cfg || !flyContainer) return;

    clearTimeout(readPhaseTimer);
    clearTargetHighlight();

    // PHASE 1: PERCHED READING — hover steadily in safe customized margin
    const c = copyAt('experience', slideIdx) || {};
    glideTo(cfg.readPos.leftPct, cfg.readPos.topPx, false, false, true);
    showSpeech(c.hook || resolveText(cfg.readSpeech));
    startDrift();

    // PHASE 2: PURPOSEFUL GLIDE TO TARGET BUTTON
    readPhaseTimer = setTimeout(function() {
      if (currentSection !== 'experience' || currentExpSlide !== slideIdx) return;
      glideToButton(cfg.guideSel, c.nudge || cfg.guideSpeech);
    }, cfg.readMs);
  }

  function enterProjectSlide(i) {
    const cfg = FLY_CONFIG.projects;
    if (!cfg || !flyContainer) return;
    clearTimeout(readPhaseTimer);
    clearTargetHighlight();
    const c = copyAt('projects', i) || {};
    const last = i === totalProjSlides - 1;
    glideTo(cfg.readPos.leftPct, cfg.readPos.topPx, false, false, true);
    showSpeech(c.hook || resolveText(cfg.readSpeech));
    startDrift();
    readPhaseTimer = setTimeout(function() {
      if (currentSection !== 'projects' || currentProjSlide !== i) return;
      glideToButton(last ? '#scroll-bottom-btn' : '#proj-next-btn', c.nudge || cfg.guideSpeech);
    }, cfg.readMs);
  }

  // ── Update Active Navigation Link in Header & Mobile Menu ────────────────
  function updateActiveNav(key) {
    if (!key) return;
    const targetHref = '#slide-' + key;
    document.querySelectorAll('header nav a, #mobile-menu a').forEach(function(a) {
      a.classList.toggle('is-active', a.getAttribute('href') === targetHref);
    });
  }

  // ── Enter a Section with Stable Transition ────────────────────────────────
  function enterSection(key) {
    if (!key) return;
    if (onbActive) abortOnboarding();
    currentSection = key;
    updateActiveNav(key);

    clearTimeout(readPhaseTimer);
    clearTargetHighlight();

    if (key === 'experience') {
      enterExperienceSlide(currentExpSlide);
      return;
    }
    if (key === 'projects') {
      enterProjectSlide(currentProjSlide);
      return;
    }

    const cfg = FLY_CONFIG[key];
    if (!cfg || !flyContainer) return;

    // PHASE 1: PERCHED READING — hover calmly near section content in safe margin
    glideTo(cfg.readPos.leftPct, cfg.readPos.topPx, false, false, true);
    const c = copyAt(key) || {};
    showSpeech(c.hook || resolveText(cfg.readSpeech));
    startDrift();

    // PHASE 2: PURPOSEFUL GLIDE TO NEXT ACTION BUTTON
    if (cfg.readMs && cfg.guideSel) {
      readPhaseTimer = setTimeout(function() {
        if (currentSection !== key) return;
        glideToButton(cfg.guideSel, c.nudge || cfg.guideSpeech);
      }, cfg.readMs);
    }
  }

  // ── Jalan pintas: langsung ke tombol "lanjut" tanpa menunggu timer baca ────
  function guideToNext() {
    clearTimeout(readPhaseTimer);
    let sel, text, c;
    if (currentSection === 'experience') {
      const cfg = EXP_SLIDES_CONFIG[currentExpSlide];
      c = copyAt('experience', currentExpSlide) || {};
      sel = cfg.guideSel;  text = c.nudge || cfg.guideSpeech;
    } else if (currentSection === 'projects') {
      const cfg  = FLY_CONFIG.projects;
      const last = currentProjSlide === totalProjSlides - 1;
      c = copyAt('projects', currentProjSlide) || {};
      sel = last ? '#scroll-bottom-btn' : '#proj-next-btn';  text = c.nudge || cfg.guideSpeech;
    } else {
      const cfg = FLY_CONFIG[currentSection];
      if (!cfg) return;
      c = copyAt(currentSection) || {};
      sel = cfg.guideSel;  text = c.nudge || cfg.guideSpeech;
    }
    glideToButton(sel, text);
  }

  // ── Bulletproof Active Section Tracking ──────────────────────────────────
  const sections = document.querySelectorAll('.slide-section');

  function detectActiveSection() {
    const vTarget = window.innerHeight * 0.42; // Focal center line
    let currentStep = null;

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= vTarget && rect.bottom > vTarget) {
        currentStep = sections[i].getAttribute('data-step');
        break;
      }
    }

    if (!currentStep) {
      if (window.scrollY < 200) {
        currentStep = 'intro';
      } else if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100)) {
        currentStep = 'contact';
      }
    }

    if (currentStep && currentStep !== currentSection) {
      enterSection(currentStep);
    }
  }

  // Active section detection on scroll (debounced 100ms)
  window.addEventListener('scroll', function() {
    clearTimeout(scrollDebounceTimer);
    scrollDebounceTimer = setTimeout(detectActiveSection, 100);
  }, { passive: true });

  // Direct Click Navigation (Instant flight to target section)
  document.querySelectorAll('a[href^="#slide-"]').forEach(link => {
    link.addEventListener('click', function() {
      const hash = this.getAttribute('href');
      const targetSec = document.querySelector(hash);
      if (targetSec) {
        const step = targetSec.getAttribute('data-step');
        if (step) {
          clearTimeout(scrollDebounceTimer);
          enterSection(step);
        }
      }
    });
  });

  // ── Efek "swish": scroll cepat dengan kurva halus ke halaman tujuan ───────────
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let swishRaf = null;
  let swishEndY = null;   // tujuan scroll swish yang sedang berjalan

  function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function stopSwish() {
    if (swishRaf) cancelAnimationFrame(swishRaf);
    swishRaf = null;
    swishEndY = null;
    document.documentElement.classList.remove('is-swishing');
  }

  function swishTo(targetEl) {
    const header  = document.querySelector('header');
    const offset  = header ? header.offsetHeight : 0;
    const startY  = window.scrollY;
    const maxY    = document.documentElement.scrollHeight - window.innerHeight;
    const endY    = Math.min(Math.max(targetEl.getBoundingClientRect().top + startY - offset, 0), maxY);
    const dist    = endY - startY;

    stopSwish();
    if (reduceMotion || Math.abs(dist) < 2) {
      window.scrollTo(0, endY);
      return;
    }

    swishEndY = endY;
    const dur = Math.min(1000, Math.max(650, Math.abs(dist) * 0.45));
    const t0  = performance.now();
    document.documentElement.classList.add('is-swishing');

    targetEl.classList.remove('swish-in');
    void targetEl.offsetWidth;
    targetEl.classList.add('swish-in');
    setTimeout(function () { targetEl.classList.remove('swish-in'); }, dur + 600);

    function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      window.scrollTo(0, startY + dist * easeInOutQuart(p));
      if (p < 1) {
        swishRaf = requestAnimationFrame(step);
      } else {
        stopSwish();
      }
    }
    swishRaf = requestAnimationFrame(step);
  }

  // Pengguna menggulir sendiri → hentikan efek
  window.addEventListener('wheel', stopSwish, { passive: true });
  window.addEventListener('touchstart', stopSwish, { passive: true });

  document.querySelectorAll('a[href^="#slide-"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetSec = document.querySelector(this.getAttribute('href'));
      if (!targetSec) return;
      e.preventDefault();
      swishTo(targetSec);
      try { history.replaceState(null, '', this.getAttribute('href')); } catch (err) {}
    });
  });

  // Resize → re-clamp to current section read position or active target
  window.addEventListener('resize', function() {
    if (!currentSection || !flyContainer) return;
    const mobile = window.innerWidth < 768;
    const pos = getSectionPos(currentSection, mobile);
    if (!flyContainer.classList.contains('guide-mode')) {
      glideTo(pos.leftPct, pos.topPx, false, false, true);
      clampBubble();
    } else if (activeTargetButton) {
      const gPos = anchorFor(activeTargetButton);
      glideTo((gPos.left / window.innerWidth) * 100, gPos.top, false, false, true);
      clampBubble();
    }
  });

  // Initialize carousel & active navigation on load
  updateExpCarousel(false);
  updateActiveNav('intro');

  // ==============================================================
  // PENGENALAN KONTROL (sebelum perkenalan diri)
  //   1. Lalat terbang ke tombol tema, menekannya, lalu mengembalikannya.
  //   2. Lalat terbang ke tombol bahasa, menekannya, lalu mengembalikannya.
  //   3. Baru setelah itu lalat meminta pengunjung membaca profil.
  //   Jika pengunjung menyentuh tombolnya sendiri, pilihannya dihormati
  //   (lalat tidak mengembalikan tombol itu). Menggulir atau pindah
  //   halaman membatalkan pengenalan dan mengembalikan pengaturan awal.
  // ==============================================================
  const onbState = { theme: null, lang: null, touchedTheme: false, touchedLang: false, glowEl: null };

  document.addEventListener('click', function (e) {
    if (!onbActive || !e.isTrusted || !e.target.closest) return;
    if (e.target.closest('#theme-toggle')) onbState.touchedTheme = true;
    if (e.target.closest('[data-lang-toggle]')) onbState.touchedLang = true;
  }, true);

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function restoreControls() {
    if (!onbState.touchedTheme && onbState.theme !== null) {
      const isDark = htmlRoot.classList.contains('dark');
      if (isDark !== onbState.theme && themeToggleBtn) themeToggleBtn.click();
    }
    if (!onbState.touchedLang && onbState.lang && window.I18N.lang !== onbState.lang) {
      window.I18N.setLang(onbState.lang, { silent: true });
    }
  }

  const focusOverlay   = document.getElementById('firefly-focus-overlay');
  const skipOnbBtn     = document.getElementById('btn-skip-onboarding');
  const mainHeader     = document.querySelector('header');

  function showFocusOverlay() {
    if (focusOverlay) focusOverlay.classList.add('is-active');
    if (flyContainer) flyContainer.classList.add('in-focus');
    if (mainHeader) mainHeader.classList.add('in-focus');
  }

  function hideFocusOverlay() {
    if (focusOverlay) focusOverlay.classList.remove('is-active');
    if (flyContainer) flyContainer.classList.remove('in-focus');
    if (mainHeader) mainHeader.classList.remove('in-focus');
  }

  function clearOnbGlow() {
    if (onbState.glowEl) { onbState.glowEl.classList.remove('target-button-glow', 'fly-press'); onbState.glowEl = null; }
    if (flyContainer) { flyContainer.classList.remove('guide-mode'); flyContainer.style.transition = ''; }
  }

  function abortOnboarding() {
    onbToken++;            // semua langkah yang masih menunggu ikut berhenti
    onbActive = false;
    clearOnbGlow();
    hideFocusOverlay();
    restoreControls();
  }

  // Pengunjung mulai menggulir saat demo berjalan: hentikan demo, kembalikan tema/bahasa, lanjut memandu
  window.addEventListener('scroll', function () {
    if (!onbActive) return;
    if (Math.abs(window.scrollY - onbStartY) < 40) return;
    abortOnboarding();
    currentSection = null;
    clearTimeout(scrollDebounceTimer);
    detectActiveSection();
  }, { passive: true });

  // Terbang ke bawah sebuah tombol di header dan menyorotnya
  function flyToControl(btn, text) {
    clearOnbGlow();
    stopDrift();
    onbState.glowEl = btn;
    btn.classList.add('target-button-glow');
    flyContainer.classList.add('guide-mode');
    const r  = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    glideTo(((r.left + r.width / 2 - 20) / vw) * 100, r.bottom + 8, false, false, true);
    showSpeech(text);
  }

  // Lalat menyentuh tombol: naik sebentar, tombol terlihat tertekan, lalu aksi dijalankan
  async function tapControl(btn, action, alive) {
    const y0 = parseFloat(flyContainer.style.top) || 70;
    flyContainer.style.transition = 'top 0.14s ease-out';
    flyContainer.style.top = (y0 - 12) + 'px';
    await wait(150);
    if (!alive()) return;
    btn.classList.add('fly-press');
    action();
    flyContainer.style.top = y0 + 'px';
    await wait(220);
    btn.classList.remove('fly-press');
    flyContainer.style.transition = '';
  }

  async function runOnboarding() {
    if (onbPlayed) return;            // sudah pernah jalan: jangan diulang
    onbPlayed = true;
    if (window.scrollY > 80) {        // pengunjung sudah menggulir: lewati demo, pandu sesuai posisi
      hideFocusOverlay();
      currentSection = null;
      detectActiveSection();
      return;
    }
    const token = ++onbToken;
    const alive = function () { return token === onbToken; };
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn  = document.querySelector('header [data-lang-toggle]');

    if (!flyContainer || !themeBtn || !langBtn) {
      hideFocusOverlay();
      enterSection('intro');
      return;
    }

    onbActive = true;
    onbStartY = window.scrollY;
    onbState.theme = htmlRoot.classList.contains('dark');
    onbState.lang = window.I18N.lang;
    onbState.touchedTheme = false;
    onbState.touchedLang = false;
    clearTimeout(readPhaseTimer);
    clearTargetHighlight();
    currentSection = 'intro';

    showFocusOverlay();

    // ── 0. Salam pembuka ──
    showSpeech(T('fly.onb.hello'));
    await wait(3600); if (!alive()) return;

    // ── 1. Tema ──
    flyToControl(themeBtn, T('fly.onb.theme'));
    await wait(3400); if (!alive()) return;
    if (!onbState.touchedTheme) {
      await tapControl(themeBtn, function () { themeBtn.click(); }, alive); if (!alive()) return;
      showSpeech(T('fly.onb.themeDone'));
      await wait(2600); if (!alive()) return;
      if (!onbState.touchedTheme && htmlRoot.classList.contains('dark') !== onbState.theme) {
        await tapControl(themeBtn, function () { themeBtn.click(); }, alive); if (!alive()) return;
        showSpeech(T('fly.onb.themeBack'));
        await wait(2200); if (!alive()) return;
      }
    }

    // ── 2. Bahasa ──
    flyToControl(langBtn, T('fly.onb.lang'));
    await wait(3400); if (!alive()) return;
    if (!onbState.touchedLang) {
      const other = onbState.lang === 'id' ? 'en' : 'id';
      await tapControl(langBtn, function () { window.I18N.setLang(other, { silent: true }); }, alive); if (!alive()) return;
      showSpeech(T('fly.onb.langDone'));
      await wait(2800); if (!alive()) return;
      if (!onbState.touchedLang && window.I18N.lang !== onbState.lang) {
        await tapControl(langBtn, function () { window.I18N.setLang(onbState.lang, { silent: true }); }, alive); if (!alive()) return;
        showSpeech(T('fly.onb.langBack'));
        await wait(2200); if (!alive()) return;
      }
    }

    // ── 3. Selesai: tutup overlay fokus, lanjut ke perkenalan diri ──
    onbActive = false;
    clearOnbGlow();
    hideFocusOverlay();
    enterSection('intro');
  }

  // ── Welcome Spotlight Modal Controller: Firdy Pengenalan Awal (Opsional) ──────────
  const firdyModal         = document.getElementById('firdy-intro-modal');
  const btnStartTour       = document.getElementById('btn-start-tour');
  const modalFlyIcon       = document.getElementById('modal-firdy-icon');
  const btnCloseIntroModal = document.getElementById('btn-close-intro-modal');
  const reopenTourBtn      = document.getElementById('reopen-firdy-tour');
  const openTourBtns       = document.querySelectorAll('#open-intro-tour-btn, #open-intro-tour-btn-mobile, #open-intro-tour-btn-hero, #reopen-firdy-tour');

  function openFirdyModal() {
    if (!firdyModal) return;
    firdyModal.style.display = 'block';
    requestAnimationFrame(() => {
      firdyModal.classList.remove('opacity-0', 'pointer-events-none');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeFirdyModal() {
    if (!firdyModal) return;
    firdyModal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      firdyModal.style.display = 'none';
      if (window.I18N && window.I18N.syncWidths) window.I18N.syncWidths();
    }, 450);
  }

  openTourBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openFirdyModal();
    });
  });

  if (btnCloseIntroModal) {
    btnCloseIntroModal.addEventListener('click', (e) => {
      e.stopPropagation();
      closeFirdyModal();
    });
  }

  let tourStarted = false;
  function startFirdyExperience() {
    tourStarted = true;
    if (firdyModal) {
      firdyModal.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        firdyModal.style.display = 'none';
        if (window.I18N && window.I18N.syncWidths) window.I18N.syncWidths();
      }, 500);
    }

    showFocusOverlay();

    if (flyContainer) {
      flyContainer.style.opacity = '1';
      // Start near center before swooping smoothly to Section 01
      flyContainer.style.top = '45%';
      flyContainer.style.left = '50%';
    }

    setTimeout(() => {
      runOnboarding();
    }, 400);
  }

  // Tombol Lewati & Klik overlay untuk menutup mode fokus
  if (skipOnbBtn) {
    skipOnbBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      abortOnboarding();
      hideFocusOverlay();
      enterSection('intro');
    });
  }
  if (focusOverlay) {
    focusOverlay.addEventListener('click', function (e) {
      if (e.target === focusOverlay) {
        abortOnboarding();
        hideFocusOverlay();
        enterSection('intro');
      }
    });
  }

  if (firdyModal && btnStartTour) {
    if (flyContainer) flyContainer.style.opacity = '0';

    btnStartTour.addEventListener('click', (e) => {
      e.stopPropagation();
      startFirdyExperience();
    });
    if (modalFlyIcon) {
      modalFlyIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        startFirdyExperience();
      });
    }
    // Clicking backdrop also closes modal
    firdyModal.addEventListener('click', (e) => {
      if (e.target === firdyModal) closeFirdyModal();
    });
  }

  // Sabuk pengaman: setelah semua aset termuat, pastikan masih di atas selama modal pembuka tampil
  window.addEventListener('load', function () {
    if (firdyModal && firdyModal.style.display !== 'none' && window.scrollY > 0) window.scrollTo(0, 0);
  });

  // "Mulai ulang" dari footer: muat ulang halaman supaya semuanya kembali bersih
  // (posisi di atas, kartu pertama, modal pembuka, kunang-kunang di awal).
  // Pilihan tema & bahasa pengunjung tetap tersimpan.
  function restartFromTop() {
    if (onbActive) abortOnboarding();      // kembalikan tema/bahasa bila demo sedang jalan
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    window.scrollTo(0, 0);
    location.reload();
  }
  if (reopenTourBtn && firdyModal) {
    reopenTourBtn.addEventListener('click', restartFromTop);
  }

  // Tombol back/forward yang memulihkan halaman dari cache (bfcache): mulai ulang dari awal
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
  });
  // Pengunjung menutup/reload di tengah demo: pastikan tema & bahasa kembali seperti semula
  window.addEventListener('pagehide', function () {
    if (onbActive) abortOnboarding();
  });

  // ── Ganti bahasa: teks lalat langsung diperbarui ke bahasa baru ───────────
  document.addEventListener('langchange', function (e) {
    // Judul foto proyek mengikuti thumbnail yang sedang aktif
    document.querySelectorAll('.proj-thumb-btn.active').forEach(function (btn) {
      const t = document.getElementById(btn.getAttribute('data-title-target'));
      if (t) t.textContent = btn.getAttribute('data-title');
    });
    if (e.detail && e.detail.silent) return;
    showToast(T('toast.lang'));
    const modalOpen = firdyModal && firdyModal.style.display !== 'none' && !firdyModal.classList.contains('opacity-0');
    if (modalOpen || !currentSection || onbActive) return;
    enterSection(currentSection);
  });

  // Klik lalat → putar sekali, lalu langsung menunjuk tombol lanjut
  if (flyContainer) {
    flyContainer.style.pointerEvents = 'none'; // Tetap none agar tidak memblokir tombol apa pun di baliknya
  }
  if (flySvg) {
    flySvg.style.pointerEvents = 'auto'; // HANYA grafis lalat yang menerima pointer event
    flySvg.style.cursor = 'pointer';
    flySvg.addEventListener('click', function(e) {
      e.stopPropagation();
      // Klik saat pengenalan tema/bahasa = lewati, kembalikan pengaturan, langsung ke intro
      if (onbActive) { abortOnboarding(); currentSection = 'intro'; }
      flySvg.style.transform = 'rotate(360deg) scale(1.4)';
      setTimeout(function() { flySvg.style.transform = 'scaleX(1)'; }, 500);
      // Klik = pengunjung ingin cepat: langsung tunjuk tombol lanjut
      guideToNext();
    });
  }

    // Reaksi saat kursor di atas skill
  (function skillReactions() {
    let last = 0;
    document.querySelectorAll('.skill-chip').forEach(function (chip) {
      chip.addEventListener('mouseenter', function () {
        if (!flySpeech || onbActive) return;
        const now = Date.now();
        if (now - last < 7000) return;
        last = now;
        const name   = chip.textContent.trim();
        const slides = document.querySelectorAll('#exp-track .carousel-slide, #proj-track .carousel-slide');
        let n = 0;
        slides.forEach(function (sl) {
          if (Array.prototype.some.call(sl.querySelectorAll('.skill-chip'), function (c) { return c.textContent.trim() === name; })) n++;
        });
        if (!n) return;
        showSpeech(n === slides.length
          ? T('fly.skill.every', { name: name })
          : T('fly.skill.some', { name: name, n: n, total: slides.length }));
      });
    });
  })();
  } // end if (flyContainer)

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-contact');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${T('form.sending')}</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast(T('form.sent'));
      }, 1000);
    });
  }

  // ==============================================================
  // 8. TOMBOL NAVIGASI MELAYANG — LONCAT PER HALAMAN SECARA MULUS
  //    ↑ = halaman sebelumnya (atau awal halaman yang sedang dibaca)
  //    ↓ = halaman berikutnya (setelah Kontak → footer / paling bawah)
  // ==============================================================
  (function initScrollNav() {
    const topBtn    = document.getElementById('scroll-top-btn');
    const bottomBtn = document.getElementById('scroll-bottom-btn');
    if (!topBtn || !bottomBtn) return;

    let ticking = false;

    function getScrollY() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function getMaxScrollY() {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      return Math.max(0, docHeight - window.innerHeight);
    }

    function getHeaderOffset() {
      const header = document.querySelector('header');
      return header ? header.offsetHeight : 70;
    }

    function smoothScrollTo(targetY) {
      const maxY = getMaxScrollY();
      const clampedY = Math.max(0, Math.min(Math.round(targetY), maxY));
      try {
        window.scrollTo({
          top: clampedY,
          behavior: 'smooth'
        });
      } catch (e) {
        window.scrollTo(0, clampedY);
      }
    }

    // Mengambil seluruh titik tujuan: semua .slide-section dan footer
    function getSectionTargets() {
      const currentY = getScrollY();
      const offset   = getHeaderOffset();
      const sections = Array.from(document.querySelectorAll('.slide-section'));
      
      const targets = sections.map(function(sec) {
        const rect = sec.getBoundingClientRect();
        return {
          el: sec,
          top: Math.round(rect.top + currentY - offset)
        };
      });

      const footer = document.querySelector('footer');
      if (footer) {
        const fRect = footer.getBoundingClientRect();
        targets.push({
          el: footer,
          top: Math.round(fRect.top + currentY - offset)
        });
      }

      // Urutkan berdasarkan koordinat vertikal
      targets.sort(function(a, b) { return a.top - b.top; });
      return targets;
    }

    function goPage(dir) {
      const currentY = getScrollY();
      const targets  = getSectionTargets();
      const TOL      = 25; // toleransi posisi piksel

      if (dir > 0) {
        // Cari seksi berikutnya di bawah posisi scroll saat ini
        const next = targets.find(function(t) { return t.top > currentY + TOL; });
        if (next) {
          smoothScrollTo(next.top);
        } else {
          // Bila sudah berada di seksi terakhir, gulir ke paling bawah halaman
          smoothScrollTo(getMaxScrollY());
        }
      } else {
        // Cari seksi sebelumnya di atas posisi scroll saat ini
        let prev = null;
        for (let i = targets.length - 1; i >= 0; i--) {
          if (targets[i].top < currentY - TOL) {
            prev = targets[i];
            break;
          }
        }
        if (prev) {
          smoothScrollTo(prev.top);
        } else {
          // Bila sudah di seksi pertama atau mendekati atas, gulir ke 0 (paling atas)
          smoothScrollTo(0);
        }
      }
    }

    function update() {
      ticking = false;
      const y    = getScrollY();
      const maxY = getMaxScrollY();
      topBtn.classList.toggle('is-hidden', y <= 50);
      bottomBtn.classList.toggle('is-hidden', maxY <= 50 || y >= maxY - 50);
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    // Handler klik dan touch responsif langsung
    function handleTopClick(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      goPage(-1);
    }

    function handleBottomClick(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      goPage(1);
    }

    topBtn.addEventListener('click', handleTopClick);
    bottomBtn.addEventListener('click', handleBottomClick);

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate);
    update();
  })();

  // ── Global Helper: Unduh PDF Sertifikat ──────────────────────────
  window.downloadCertPdf = function(url, filename) {
    if (!url) return;
    const cleanName = filename || url.split('/').pop();
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', cleanName);
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 150);
  };

  // ── Showcase Sertifikat & Modal Lightbox Controller ────────────────
  (function initCertificateShowcase() {
    const certImg = document.getElementById('cert-display-img');
    const certLabel = document.getElementById('cert-display-label');
    const tabPage1 = document.getElementById('cert-tab-page1');
    const tabPage2 = document.getElementById('cert-tab-page2');
    const previewTrigger = document.getElementById('cert-preview-trigger');
    const modal = document.getElementById('cert-lightbox-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalClose = document.getElementById('cert-modal-close');

    if (!certImg) return;

    const page1Src = 'assets/docs/sertifikat-coding-camp-page-1.jpg';
    const page2Src = 'assets/docs/sertifikat-coding-camp-page-2.jpg';

    // Preload image transkrip
    const p2Preload = new Image();
    p2Preload.src = page2Src;

    function setPage(pageNum) {
      if (pageNum === 1) {
        certImg.src = page1Src;
        if (certLabel) certLabel.textContent = 'Halaman 1: Sertifikat Kelulusan';
        if (tabPage1) {
          tabPage1.className = 'cert-tab-btn active px-3 py-2 rounded-xl border-2 border-brand-500 bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm';
        }
        if (tabPage2) {
          tabPage2.className = 'cert-tab-btn px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-1.5 hover:border-brand-500/50 hover:text-brand-500 transition-all shadow-sm';
        }
      } else {
        certImg.src = page2Src;
        if (certLabel) certLabel.textContent = 'Halaman 2: Transkrip Nilai Lengkap';
        if (tabPage2) {
          tabPage2.className = 'cert-tab-btn active px-3 py-2 rounded-xl border-2 border-brand-500 bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm';
        }
        if (tabPage1) {
          tabPage1.className = 'cert-tab-btn px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-1.5 hover:border-brand-500/50 hover:text-brand-500 transition-all shadow-sm';
        }
      }
    }

    if (tabPage1) {
      tabPage1.addEventListener('click', () => setPage(1));
    }
    if (tabPage2) {
      tabPage2.addEventListener('click', () => setPage(2));
    }

    function openModal() {
      if (!modal || !modalImg) return;
      modalImg.src = certImg.src;
      if (modalTitle) {
        modalTitle.textContent = certImg.src.includes('page-2')
          ? 'Transkrip Nilai Akademik Lengkap - Coding Camp 2025'
          : 'Sertifikat Kelulusan Resmi - Coding Camp 2025';
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (previewTrigger) {
      previewTrigger.addEventListener('click', openModal);
    }
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  })();

  // ── The Credential Command Center (Interactive Syllabus & Vault Controller) ──
  (function initCredentialVault() {
    const listContainer = document.getElementById('cert-vault-list');
    if (!listContainer) return;

    const dirCount = document.getElementById('cert-dir-count');
    const searchInput = document.getElementById('cert-search-input');
    const searchClear = document.getElementById('cert-search-clear');
    const toggleBtn = document.getElementById('toggle-modules-btn');
    const collapseContainer = document.getElementById('modules-collapse-container');
    const toggleLabel = document.getElementById('toggle-modules-label');
    const toggleIcon = document.getElementById('toggle-modules-icon');

    if (toggleBtn && collapseContainer) {
      toggleBtn.addEventListener('click', function() {
        const isHidden = collapseContainer.classList.contains('hidden');
        if (isHidden) {
          collapseContainer.classList.remove('hidden');
          toggleBtn.setAttribute('aria-expanded', 'true');
          if (toggleLabel) toggleLabel.textContent = 'Tutup Silabus';
          if (toggleIcon) toggleIcon.classList.add('rotate-180');
        } else {
          collapseContainer.classList.add('hidden');
          toggleBtn.setAttribute('aria-expanded', 'false');
          if (toggleLabel) toggleLabel.textContent = 'Buka Silabus';
          if (toggleIcon) toggleIcon.classList.remove('rotate-180');
        }
      });
    }

    const CERTS_DATA = [
      // 2. Modul Front-End & Web Development (4 Berkas)
      {
        id: "dbs-fe-pemula",
        category: "frontend",
        title: "Belajar Membuat Front-End Web untuk Pemula",
        issuer: "Dicoding Indonesia",
        type: "Modul Praktik",
        hours: "40 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-front-end-pemula.pdf",
        icon: "code",
        desc: "Kompetensi manipulasi DOM mendalam, pengelolaan event browser, Web Storage API, dan pembangunan aplikasi interaktif."
      },
      {
        id: "dbs-fe-fund",
        category: "frontend",
        title: "Belajar Fundamental Front-End Web Development",
        issuer: "Dicoding Indonesia",
        type: "Modul Praktik",
        hours: "75 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-fundamental-front-end.pdf",
        icon: "layers",
        desc: "Standar industri JavaScript ES6+, Web Components kustom, modularisasi script, NPM build pipeline, dan integrasi asynchronous REST API."
      },
      {
        id: "dbs-fe-dasar",
        category: "frontend",
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding Indonesia",
        type: "Modul Fondasi",
        hours: "45 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-dasar-pemrograman-web.pdf",
        icon: "layout",
        desc: "Fondasi semantik HTML5, arsitektur tata letak CSS3 modern Flexbox dan CSS Grid, responsive web design, dan aksesibilitas web."
      },
      {
        id: "dbs-fe-expert",
        category: "frontend",
        title: "Menjadi Front-End Web Developer Expert",
        issuer: "Dicoding Indonesia",
        type: "Modul Lanjutan",
        hours: "60 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-web-intermediate.pdf",
        icon: "sparkles",
        desc: "Arsitektur Progressive Web Apps, Service Worker offline caching, optimasi performa web, dan Continuous Integration."
      },

      // 3. Modul JavaScript & Back-End (3 Berkas)
      {
        id: "dbs-js-dasar",
        category: "backend",
        title: "Belajar Dasar Pemrograman JavaScript",
        issuer: "Dicoding Indonesia",
        type: "Modul Fondasi",
        hours: "45 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-dasar-javascript.pdf",
        icon: "file-code",
        desc: "Struktur data array & objek, OOP berbasis prototipe/class, Functional Programming murni, Promise & Async/Await, serta modularisasi Node.js."
      },
      {
        id: "dbs-be-pemula",
        category: "backend",
        title: "Belajar Membuat Aplikasi Back-End Pemula",
        issuer: "Dicoding Indonesia",
        type: "Modul Praktik",
        hours: "50 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-back-end-pemula-javascript.pdf",
        icon: "server",
        desc: "Pengembangan RESTful API backend menggunakan Node.js dan Hapi Framework, validasi schema, pengujian otomasi Postman, dan deployment cloud."
      },
      {
        id: "dbs-git",
        category: "backend",
        title: "Belajar Dasar Git dengan GitHub",
        issuer: "Dicoding Indonesia",
        type: "Tooling & VCS",
        hours: "15 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-dasar-git-github.pdf",
        icon: "git-branch",
        desc: "Penerapan Version Control System Git, branching strategy, pull requests, resolving merge conflicts, dan kolaborasi tim via GitHub."
      },

      // 4. Fondasi, Cloud, AI & Soft Skills (5 Berkas)
      {
        id: "dbs-cloud-ai",
        category: "foundations",
        title: "Belajar Dasar Cloud dan Gen AI di AWS",
        issuer: "Dicoding x AWS Cloud",
        type: "Cloud Computing",
        hours: "20 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-cloud-gen-ai-aws.pdf",
        icon: "cloud",
        desc: "Prinsip komputasi awan Amazon Web Services, arsitektur serverless, storage S3, compute EC2, serta fondasi aplikasi Generative AI."
      },
      {
        id: "dbs-tbi",
        category: "foundations",
        title: "Business English & Communication Skills",
        issuer: "The British Institute bersama DBS",
        type: "Soft Skills Global",
        hours: "50 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/tbi-english-business-communication.pdf",
        icon: "languages",
        desc: "Pelatihan komunikasi bisnis bahasa Inggris intensif untuk presentasi teknis, wawancara kerja profesional, dan kolaborasi global."
      },
      {
        id: "dbs-dasar-prog",
        category: "foundations",
        title: "Memulai Dasar Pemrograman untuk Pengembang Software",
        issuer: "Dicoding Indonesia",
        type: "Modul Fondasi",
        hours: "16 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-memulai-dasar-pemrograman.pdf",
        icon: "terminal",
        desc: "Etika disiplin rekayasa perangkat lunak, paradigma pemrograman terstruktur, algoritma dasar, dan tata kelola kode bersih."
      },
      {
        id: "dbs-logika",
        category: "foundations",
        title: "Pengenalan ke Logika Pemrograman",
        issuer: "Dicoding Indonesia",
        type: "Modul Fondasi",
        hours: "16 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-logika-pemrograman.pdf",
        icon: "cpu",
        desc: "Pemecahan masalah komputasi, gerbang logika boolean, pemetaan pseudocode, dan perancangan flowchart sistem."
      },
      {
        id: "dbs-finance",
        category: "foundations",
        title: "Financial Literacy 101 & Professional Mindset",
        issuer: "DBS Foundation",
        type: "Literasi Finansial",
        hours: "15 Jam Pembelajaran",
        year: "2024",
        file: "assets/docs/dicoding-financial-literacy-101.pdf",
        icon: "wallet",
        desc: "Pengembangan etos kerja profesional, pemahaman literasi keuangan pribadi & bisnis, dan orientasi karir di industri teknologi."
      }
    ];

    let currentCategory = 'all';
    let searchQuery = '';
    let filteredCerts = CERTS_DATA;
    let activeCert = CERTS_DATA[0];

    function applyFilterAndSearch() {
      filteredCerts = CERTS_DATA.filter(cert => {
        const matchCategory = (currentCategory === 'all') || (cert.category === currentCategory);
        if (!matchCategory) return false;

        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          cert.title.toLowerCase().includes(q) ||
          cert.issuer.toLowerCase().includes(q) ||
          cert.desc.toLowerCase().includes(q) ||
          cert.type.toLowerCase().includes(q) ||
          cert.hours.toLowerCase().includes(q)
        );
      });

      renderList();
      if (dirCount) {
        dirCount.textContent = `${filteredCerts.length} Modul`;
      }
    }

    function renderList() {
      listContainer.innerHTML = '';

      if (filteredCerts.length === 0) {
        listContainer.innerHTML = `
          <div class="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
            <i data-lucide="file-search" class="w-6 h-6 mx-auto mb-2 text-slate-400"></i>
            Tidak ada modul yang cocok dengan pencarian "${searchQuery}".
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      filteredCerts.forEach((cert, idx) => {
        const item = document.createElement('div');
        item.className = 'px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/90 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group';
        item.setAttribute('data-id', cert.id);

        const num = String(idx + 1).padStart(2, '0');

        item.innerHTML = `
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <span class="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 w-5 shrink-0 text-center">${num}</span>
            <div class="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <i data-lucide="${cert.icon}" class="w-3.5 h-3.5"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h5 class="text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">${cert.title}</h5>
              <div class="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                <span>${cert.type}</span>
                <span class="text-slate-300 dark:text-slate-600">•</span>
                <span class="font-mono text-[10px] text-slate-400 dark:text-slate-500">${cert.hours.replace(' Pembelajaran', '')}</span>
                <span class="text-slate-300 dark:text-slate-600">•</span>
                <span>${cert.year}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center shrink-0">
            <a href="${cert.file}" target="_blank" rel="noopener noreferrer" title="Buka Dokumen PDF" onclick="event.stopPropagation();" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-brand-500 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-500 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors">
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        `;

        item.addEventListener('click', () => {
          window.open(cert.file, '_blank');
        });

        listContainer.appendChild(item);
      });

      if (window.lucide) window.lucide.createIcons();
    }

    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.trim();
        if (searchClear) {
          if (searchQuery.length > 0) {
            searchClear.classList.remove('hidden');
          } else {
            searchClear.classList.add('hidden');
          }
        }
        applyFilterAndSearch();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        this.classList.add('hidden');
        applyFilterAndSearch();
        if (searchInput) searchInput.focus();
      });
    }

    // Initial Load
    applyFilterAndSearch();
  })();

  // ── Showcase Sertifikat Utama (Tab Switcher: Sertifikat vs Transkrip) ──
  (function initCertShowcase() {
    const tab1 = document.getElementById('cert-tab-page1');
    const tab2 = document.getElementById('cert-tab-page2');
    const displayImg = document.getElementById('cert-display-img');
    const displayLabel = document.getElementById('cert-display-label');
    const pdfLink = document.getElementById('cert-primary-pdf-link');
    const pdfBtnLabel = document.getElementById('cert-pdf-btn-label');
    const previewTrigger = document.getElementById('cert-preview-trigger');

    if (!tab1 || !tab2 || !displayImg) return;

    function setPage(page) {
      if (page === 1) {
        displayImg.src = 'assets/docs/sertifikat-coding-camp-page-1.jpg';
        displayImg.alt = 'Sertifikat Kelulusan Coding Camp 2025 Firdy Dwi Aryani';
        if (displayLabel) displayLabel.textContent = 'Halaman 1: Sertifikat Kelulusan';
        if (pdfLink) pdfLink.href = 'assets/docs/sertifikat-coding-camp-2025.pdf';
        if (pdfBtnLabel) pdfBtnLabel.textContent = 'Buka Dokumen PDF Resmi (Sertifikat)';

        tab1.className = 'cert-tab-btn active px-3 py-2 rounded-xl border-2 border-brand-500 bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm';
        tab2.className = 'cert-tab-btn px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-1.5 hover:border-brand-500/50 hover:text-brand-500 transition-all shadow-sm';
      } else {
        displayImg.src = 'assets/docs/sertifikat-coding-camp-page-2.jpg';
        displayImg.alt = 'Transkrip Nilai Akademik Coding Camp 2025 Firdy Dwi Aryani';
        if (displayLabel) displayLabel.textContent = 'Halaman 2: Transkrip Nilai Lengkap';
        if (pdfLink) pdfLink.href = 'assets/docs/transkrip-akhir-coding-camp-2025.pdf';
        if (pdfBtnLabel) pdfBtnLabel.textContent = 'Buka Dokumen PDF Resmi (Transkrip)';

        tab2.className = 'cert-tab-btn active px-3 py-2 rounded-xl border-2 border-brand-500 bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm';
        tab1.className = 'cert-tab-btn px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-1.5 hover:border-brand-500/50 hover:text-brand-500 transition-all shadow-sm';
      }
    }

    tab1.addEventListener('click', () => setPage(1));
    tab2.addEventListener('click', () => setPage(2));

    if (previewTrigger) {
      previewTrigger.addEventListener('click', () => {
        if (pdfLink && pdfLink.href) {
          window.open(pdfLink.href, '_blank');
        }
      });
    }
  })();

});
