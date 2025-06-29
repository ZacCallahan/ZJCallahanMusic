window.addEventListener('DOMContentLoaded', () => {
  // Get toggle element first
  const toggle = document.querySelector('.dark-mode-toggle input');

  // Load dark mode preference
  const isDark = localStorage.getItem('darkMode') === 'true';

  // Apply dark mode class if enabled
  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  // Set toggle checkbox state if toggle exists
  if (toggle) {
    toggle.checked = isDark;

    // Add listener for toggle changes
    toggle.addEventListener('change', () => {
      const checked = toggle.checked;
      document.body.classList.toggle('dark', checked);
      localStorage.setItem('darkMode', checked);
    });
  }

const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedPref = localStorage.getItem('darkMode');

if (savedPref === null) {
  if (userPref) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }
}

});