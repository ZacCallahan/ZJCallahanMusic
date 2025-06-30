window.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-mode-toggle input');
  const hamburger = document.querySelector('.hamburger');
  const navCenter = document.querySelector('.nav-center');
  const navRight = document.querySelector('.nav-right');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Logo click navigation
  const setupLogoNavigation = () => {
    const logos = document.querySelectorAll('.logo');
    
    logos.forEach(logo => {
      // Make logos clickable with proper cursor
      logo.style.cursor = 'pointer';
      
      // Add click event listener
      logo.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
      
      // Add keyboard navigation for accessibility
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

  // Preload SoundCloud widget API on all pages
  const preloadSoundCloudAPI = () => {
    if (!window.SC && !document.querySelector('script[src*="soundcloud"]')) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      document.head.appendChild(script);
    }
  };

  // DNS prefetch for SoundCloud domains
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

  // Preload critical SoundCloud resources for first few tracks
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

  // Main lazy loading function with Intersection Observer
  const setupLazyLoading = () => {
    const iframes = document.querySelectorAll('.track-card iframe[data-src]:not([src])');
    
    if (iframes.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            
            // Only load if it hasn't been loaded yet
            if (!iframe.src && iframe.dataset.src) {
              console.log('Loading iframe:', iframe.dataset.src);
              
              // Add performance attributes before setting src
              iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
              
              // Set the src to start loading
              iframe.src = iframe.dataset.src;
              
              // Unobserve this iframe since it's now loading
              observer.unobserve(iframe);
            }
          }
        });
      }, {
        rootMargin: '100px', // Start loading 100px before coming into view
        threshold: 0.1
      });

      // Observe all iframes that need lazy loading
      iframes.forEach(iframe => {
        observer.observe(iframe);
      });
      
      console.log(`Set up lazy loading for ${iframes.length} iframes`);
    } else {
      // Fallback for browsers without Intersection Observer
      console.log('No Intersection Observer support, loading with delays');
      iframes.forEach((iframe, index) => {
        setTimeout(() => {
          if (!iframe.src && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
          }
        }, index * 1000); // Load each iframe 1 second apart
      });
    }
  };

  // Preload all SoundCloud tracks (for homepage)
  const preloadAllTracks = () => {
    const trackUrls = [
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/symphony-no-1-excerpt&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/hisaishi-mood&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/ripple&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/kangaroo-waltz&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/natsu-wip&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false',
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/zac-callahan-9526532/whimsy&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&visual=false'
    ];

    console.log('Preloading all SoundCloud tracks from homepage...');
    
    trackUrls.forEach((url, index) => {
      // Stagger the preloading to avoid overwhelming the browser
      setTimeout(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        console.log(`Preloaded track ${index + 1}:`, url.match(/soundcloud\.com\/[^&]+/)[0]);
      }, index * 200); // 200ms delay between each preload
    });

    // Also preload the compositions page
    setTimeout(() => {
      const pageLink = document.createElement('link');
      pageLink.rel = 'prefetch';
      pageLink.href = 'compositions.html';
      document.head.appendChild(pageLink);
      console.log('Preloaded compositions.html page');
    }, 1000);
  };

  // Preload compositions page resources when hovering over compositions link
  const setupCompositionsPreload = () => {
    const compositionsLinks = document.querySelectorAll('a[href="compositions.html"], a[href*="compositions"]');
    
    compositionsLinks.forEach(link => {
      let preloadTriggered = false;
      
      const triggerPreload = () => {
        if (!preloadTriggered) {
          preloadTriggered = true;
          
          // Preload the compositions page itself
          const pageLink = document.createElement('link');
          pageLink.rel = 'prefetch';
          pageLink.href = 'compositions.html';
          document.head.appendChild(pageLink);
          
          // Preload first few tracks
          preloadFirstTracks();
        }
      };

      // Trigger preload on hover (desktop) or touch start (mobile)
      link.addEventListener('mouseenter', triggerPreload, { once: true });
      link.addEventListener('touchstart', triggerPreload, { once: true });
    });
  };

  // Initialize optimizations
  const initOptimizations = () => {
    // Always add DNS prefetch
    addDNSPrefetch();
    
    // Preload SoundCloud API
    preloadSoundCloudAPI();
    
    // Check which page we're on
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.includes('index') ||
                      (!window.location.pathname.includes('compositions') && 
                       !window.location.pathname.includes('sheet-music') && 
                       !window.location.pathname.includes('about'));
    
    const isCompositionsPage = window.location.pathname.includes('compositions') || 
                              document.querySelector('.compositions-page');

    if (isHomepage) {
      console.log('On homepage - starting aggressive preloading...');
      
      // Wait a bit for the page to load, then start preloading
      setTimeout(() => {
        preloadAllTracks();
      }, 2000); // Wait 2 seconds after page load
      
      // Also setup hover preloading as backup
      setupCompositionsPreload();
      
    } else if (isCompositionsPage) {
      console.log('On compositions page, setting up lazy loading...');
      
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        setupLazyLoading();
      }, 100);
      
    } else {
      // On other pages, just setup hover preloading
      setupCompositionsPreload();
    }
  };

  // Dark mode code with mobile toggle support
  const toggleMobile = document.querySelector('#darkToggleMobile');
  
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  
  // Set both toggles to the same state
  if (toggle) toggle.checked = isDark;
  if (toggleMobile) toggleMobile.checked = isDark;
  
  // Function to handle dark mode changes
  const handleDarkModeChange = (checked) => {
    document.body.classList.toggle('dark', checked);
    localStorage.setItem('darkMode', checked);
    // Sync both toggles
    if (toggle) toggle.checked = checked;
    if (toggleMobile) toggleMobile.checked = checked;
  };
  
  // Add event listeners to both toggles
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
  
  // Set initial state based on user preference
  const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedPref = localStorage.getItem('darkMode');
  if (savedPref === null && userPref) {
    handleDarkModeChange(true);
  }

  // Hamburger toggle logic
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Handle window resize to ensure proper display
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      // Reset mobile menu state when switching to desktop
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  });

  // Initialize logo navigation
  setupLogoNavigation();
  
  // Initialize all optimizations
  initOptimizations();
});