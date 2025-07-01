# Foreword

This is the first of my upcoming portfolio website. I wanted to create this website as a way to practice my coding but by also incorporating something that I am passionate about.
I was aiming for a sleek, minimalist, and professional style that shows off some of my music in a way that creates a pleasant user experience.
This site is currently live, so please check it out at www.zaccallahanmusic.com

# Zac Callahan - Composer Website

A modern, responsive portfolio website for my composer and musician alter ego, featuring original compositions, sheet music, and background information.

## Features

### Core Functionality

- **Background Video Hero Section** - Autoplay sizzle reel on homepage
- **Audio Compositions** - SoundCloud embedded tracks with lazy loading optimisation
- **Sheet Music Gallery** - Downloadable PDF scores with preview images
- **About Page** - Personal biography and musical background
- **Dark/Light Mode** - Toggle between themes with persistence
- **Fully Responsive** - Mobile-friendly design with hamburger navigation

### Performance Optimisations

- **Lazy Loading** - SoundCloud iframes load only when needed
- **DNS Prefetching** - Preloads SoundCloud domains for faster loading
- **Progressive Loading** - Staggered track preloading on homepage

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, optimised performance
- **FontAwesome** - Icon library
- **SoundCloud** - Audio hosting and playback

## Project Structure

```
zac-callahan-music/
├── Assets/
│   ├── logo.png                    # Light mode logo
│   ├── logo-dark.png              # Dark mode logo
│   ├── portrait.png               # About page photo
│   ├── sizzle-reel.mp4           # Background video (MP4)
│   ├── sizzle-reel.webm          # Background video (WebM)
│   ├── [composition-name].png     # Sheet music previews
│   └── [composition-name].pdf     # Downloadable scores
├── CSS/
│   └── styles.css                 # Main stylesheet
├── Script/
│   └── script.js                  # Main JavaScript functionality
├── index.html                     # Homepage with video background
├── compositions.html              # Audio tracks page
├── sheet-music.html              # Downloadable scores
├── about.html                    # Biography page
└── README.md                     # Project documentation
```

## Setup & Installation

1. **Clone or download** the project files
2. **Add your assets** to the `Assets/` folder:
   - `sizzle-reel.mp4` (background video)
   - `sizzle-reel.webm` (optional, for better browser support)
   - Logo files (`logo.png`, `logo-dark.png`)
   - Portrait photo (`portrait.png`)
   - Sheet music PDFs and preview images
3. **Update SoundCloud URLs** in `compositions.html` with your tracks
4. **Customise content** in HTML files (bio, compositions, etc.)
5. **Deploy** to any web server or hosting platform

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**:
  - Intersection Observer (with fallback)
  - CSS Grid/Flexbox
  - HTML5 Video
  - LocalStorage

## Customisation

### Colors

Update the CSS custom properties in `styles.css`:

```css
:root {
  --primary-gold: #cca764;
  --primary-gold-dark: #b39c5d;
  --text-dark: #222;
  --text-light: #e0e0e0;
}
```

## Privacy & Security

- **No tracking**: No analytics or user tracking
- **External resources**: Only FontAwesome and SoundCloud
- **Local storage**: Only stores dark mode preference
- **HTTPS ready**: All external resources use HTTPS

© 2025 Zac Callahan - All rights reserved

## 🤝 Contributing

This is a personal portfolio website. For questions or suggestions:

- Email: calla1296@gmail.com
- [Spotify](https://open.spotify.com/artist/1PnvmzPFCPSqe1toCb2gGx)

## 🔄 Updates & Maintenance

### Regular Tasks

- Update compositions in `compositions.html`
- Add new sheet music to `sheet-music.html`
- Refresh SoundCloud URLs if needed
- Optimise images before uploading

### Browser Testing

Test across devices and browsers, especially:

- Mobile navigation functionality
- Video autoplay behavior
- Dark mode persistence
- Audio loading performance
