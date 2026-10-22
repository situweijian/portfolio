document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const film = document.querySelector('#portfolio-film');
const filmStage = film?.closest('.film-stage');
const playButton = document.querySelector('[data-play-film]');
const timecode = document.querySelector('[data-timecode]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (film && filmStage && playButton) {
  const showPlayButton = () => filmStage.classList.remove('is-playing');
  const hidePlayButton = () => filmStage.classList.add('is-playing');

  playButton.addEventListener('click', () => {
    hidePlayButton();
    film.play().catch(() => {
      showPlayButton();
      film.controls = true;
    });
  });

  film.addEventListener('play', hidePlayButton);
  film.addEventListener('pause', showPlayButton);
  film.addEventListener('ended', showPlayButton);

  if (timecode) {
    film.addEventListener('timeupdate', () => {
      const current = Math.min(film.currentTime || 0, 40);
      const seconds = String(Math.floor(current)).padStart(2, '0');
      timecode.textContent = `00:${seconds} / 00:40`;
    });
  }
}

const revealItems = [...document.querySelectorAll('.reveal')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if ('IntersectionObserver' in window && film) {
  const videoObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting && !film.paused) {
        film.pause();
      }
    },
    { threshold: 0.15 },
  );

  videoObserver.observe(film);
}
