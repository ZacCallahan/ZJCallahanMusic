window.addEventListener('DOMContentLoaded', () => {
      const toggle = document.querySelector('.dark-mode-toggle input');
      const hamburger = document.querySelector('.hamburger');
      const mobileMenu = document.querySelector('.mobile-menu');
      const toggleMobile = document.querySelector('#darkToggleMobile');

      // Logo navigation
      const logos = document.querySelectorAll('.logo');
      logos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
          window.location.href = 'index.html';
        });
      });

      // Dark mode handling
      const isDark = localStorage.getItem('darkMode') === 'true';
      if (isDark) document.body.classList.add('dark');
      
      if (toggle) toggle.checked = isDark;
      if (toggleMobile) toggleMobile.checked = isDark;
      
      const handleDarkModeChange = (checked) => {
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

      // Mobile menu functionality
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

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          if (mobileMenu) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
        }
      });

      // Mobile video optimization - pause video when not visible
      const video = document.querySelector('.video-background video');
      if (video && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        }, { threshold: 0.1 });
        
        videoObserver.observe(video);
      }
    });