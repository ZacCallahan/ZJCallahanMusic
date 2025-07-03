window.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-mode-toggle input');
  const hamburger = document.querySelector('.hamburger');
  const navCenter = document.querySelector('.nav-center');
  const navRight = document.querySelector('.nav-right');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Logo navigation
  const setupLogoNavigation = () => {
    const logos = document.querySelectorAll('.logo');
    
    logos.forEach(logo => {
      logo.style.cursor = 'pointer';
      
      logo.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
      
      logo.setAttribute('tabindex', '0');
      logo.setAttribute('role', 'button');
      logo.setAttribute('aria-label', 'Go to homepage');
      
      logo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = 'index.html';
        }
      });
    });
  };

  // Performance optimisations
  const preloadSoundCloudAPI = () => {
    if (!window.SC && !document.querySelector('script[src*="soundcloud"]')) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const addDNSPrefetch = () => {
    const domains = [
      'https://w.soundcloud.com',
      'https://api.soundcloud.com',
      'https://i1.sndcdn.com',
      'https://cf-hls-media.sndcdn.com'
    ];
    
    domains.forEach(domain => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      }
    });
  };

  const preloadFirstTracks = () => {
    const iframes = document.querySelectorAll('.track-card iframe[data-src]');
    const firstThree = Array.from(iframes).slice(0, 3);
    
    firstThree.forEach((iframe) => {
      if (iframe.dataset.src) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = iframe.dataset.src;
        document.head.appendChild(link);
      }
    });
  };

  // Lazy loading for compositions page
  const setupLazyLoading = () => {
    const iframes = document.querySelectorAll('.track-card iframe[data-src]:not([src])');
    
    if (iframes.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            
            if (!iframe.src && iframe.dataset.src) {
              iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
              iframe.src = iframe.dataset.src;
              observer.unobserve(iframe);
            }
          }
        });
      }, {
        rootMargin: '100px',
        threshold: 0.1
      });

      iframes.forEach(iframe => {
        observer.observe(iframe);
      });
    } else {
      // Fallback for older browsers
      iframes.forEach((iframe, index) => {
        setTimeout(() => {
          if (!iframe.src && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
          }
        }, index * 1000);
      });
    }
  };

  const preloadAllTracks = () => {
    const trackUrls = [
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/symphony-no-1-excerpt&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/hisaishi-mood&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/ripple&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/kangaroo-waltz&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/natsu-wip&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/whimsy&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false'
    ];
    
    trackUrls.forEach((url, index) => {
      setTimeout(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      }, index * 200);
    });

    setTimeout(() => {
      const pageLink = document.createElement('link');
      pageLink.rel = 'prefetch';
      pageLink.href = 'compositions.html';
      document.head.appendChild(pageLink);
    }, 1000);
  };

  // Preload on hover
  const setupCompositionsPreload = () => {
    const compositionsLinks = document.querySelectorAll('a[href="compositions.html"], a[href*="compositions"]');
    
    compositionsLinks.forEach(link => {
      let preloadTriggered = false;
      
      const triggerPreload = () => {
        if (!preloadTriggered) {
          preloadTriggered = true;
          
          const pageLink = document.createElement('link');
          pageLink.rel = 'prefetch';
          pageLink.href = 'compositions.html';
          document.head.appendChild(pageLink);
          
          preloadFirstTracks();
        }
      };

      link.addEventListener('mouseenter', triggerPreload, { once: true });
      link.addEventListener('touchstart', triggerPreload, { once: true });
    });
  };

  const initOptimisations = () => {
    addDNSPrefetch();
    preloadSoundCloudAPI();
    
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.includes('index') ||
                      (!window.location.pathname.includes('compositions') && 
                       !window.location.pathname.includes('sheet-music') && 
                       !window.location.pathname.includes('about'));
    
    const isCompositionsPage = window.location.pathname.includes('compositions') || 
                              document.querySelector('.compositions-page');

    if (isHomepage) {
      setTimeout(() => {
        preloadAllTracks();
      }, 2000);
      
      setupCompositionsPreload();
    } else if (isCompositionsPage) {
      setTimeout(() => {
        setupLazyLoading();
      }, 100);
    } else {
      setupCompositionsPreload();
    }
  };

  // Dark mode
  const toggleMobile = document.querySelector('#darkToggleMobile');
  
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }
  
  if (toggle) toggle.checked = isDark;
  if (toggleMobile) toggleMobile.checked = isDark;
  
  const handleDarkModeChange = (checked) => {
    document.documentElement.classList.toggle('dark', checked);
    document.body.classList.toggle('dark', checked);
    localStorage.setItem('darkMode', checked);
    if (toggle) toggle.checked = checked;
    if (toggleMobile) toggleMobile.checked = checked;
  };
  
  if (toggle) {
    toggle.addEventListener('change', () => {
      handleDarkModeChange(toggle.checked);
    });
  }
  
  if (toggleMobile) {
    toggleMobile.addEventListener('change', () => {
      handleDarkModeChange(toggleMobile.checked);
    });
  }
  
  const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedPref = localStorage.getItem('darkMode');
  if (savedPref === null && userPref) {
    handleDarkModeChange(true);
  }

  // Mobile menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Reset mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  });

  // Initialise
  setupLogoNavigation();
  initOptimisations();
});