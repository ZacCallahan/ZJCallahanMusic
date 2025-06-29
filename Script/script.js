window.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-mode-toggle input');
  const hamburger = document.querySelector('.hamburger');
  const navCenter = document.querySelector('.nav-center');
  const navRight = document.querySelector('.nav-right');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Dark mode code (unchanged)
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  if (toggle) {
    toggle.checked = isDark;
    toggle.addEventListener('change', () => {
      const checked = toggle.checked;
      document.body.classList.toggle('dark', checked);
      localStorage.setItem('darkMode', checked);
    });
  }
  const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedPref = localStorage.getItem('darkMode');
  if (savedPref === null && userPref) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
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
});