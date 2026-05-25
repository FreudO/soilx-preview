/* SoilX — shared site scripts */

(function () {
  const nav = document.getElementById('site-nav');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');

  function currentPage() {
    let page = window.location.pathname.split('/').pop() || '';
    if (!page || page.endsWith('/')) page = 'index.html';
    return page;
  }

  function setActiveNavLink() {
    const page = currentPage();
    document.querySelectorAll('.nav-links a').forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === page);
    });
  }

  function initNavToggle() {
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute(
        'aria-expanded',
        navLinks.classList.contains('open')
      );
    });
  }

  function initNavScroll() {
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMediaTabs() {
    const tabs = document.querySelectorAll('.media-tab');
    const panels = document.querySelectorAll('.media-tab-panel');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active);
        });

        panels.forEach((panel) => {
          const active = panel.id === `tab-${target}`;
          panel.hidden = !active;
          panel.classList.toggle('is-active', active);
        });
      });
    });
  }

  function initYouTubeFacades() {
    document.querySelectorAll('.yt-facade').forEach((facade) => {
      const play = () => {
        const id = facade.dataset.videoId;
        if (!id || facade.dataset.loaded) return;
        facade.dataset.loaded = 'true';
        facade.innerHTML =
          '<iframe src="https://www.youtube.com/embed/' +
          id +
          '?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen style="width:100%;height:100%;position:absolute;top:0;left:0;border:0"></iframe>';
      };

      facade.addEventListener('click', play);
      facade.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          play();
        }
      });
    });
  }

  function initPublicationFilters() {
    const filters = document.querySelectorAll('.pub-filter');
    const cards = document.querySelectorAll('.pub-list .pub-card');
    if (!filters.length || !cards.length) return;

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filters.forEach((f) => {
          f.classList.toggle('is-active', f === btn);
        });

        cards.forEach((card) => {
          const type = card.dataset.type;
          const show = filter === 'all' || type === filter;
          card.hidden = !show;
        });
      });
    });
  }

  function initGalleryLightbox() {
    const gallery = document.querySelector('.gallery-masonry');
    const lightbox = document.getElementById('lightbox');
    if (!gallery || !lightbox) return;

    const images = Array.from(gallery.querySelectorAll('[data-gallery]'));
    const lbImg = lightbox.querySelector('.lightbox__img');
    const btnClose = lightbox.querySelector('.lightbox__close');
    const btnPrev = lightbox.querySelector('.lightbox__prev');
    const btnNext = lightbox.querySelector('.lightbox__next');
    let currentIndex = 0;

    function show(index) {
      currentIndex = (index + images.length) % images.length;
      const img = images[currentIndex];
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.src = '';
    }

    function step(delta) {
      show(currentIndex + delta);
    }

    images.forEach((img, i) => {
      img.addEventListener('click', () => show(i));
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => step(-1));
    btnNext.addEventListener('click', () => step(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initNavToggle();
    initNavScroll();
    initMediaTabs();
    initYouTubeFacades();
    initGalleryLightbox();
    initPublicationFilters();
  });
})();
