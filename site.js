document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const filmControllers = [...document.querySelectorAll('[data-film-card]')]
  .map((card) => ({
    card,
    film: card.querySelector('video'),
    stage: card.querySelector('[data-film-stage]'),
    playButton: card.querySelector('[data-play-film]'),
    timecode: card.querySelector('[data-timecode]'),
  }))
  .filter(({ film, stage, playButton }) => film && stage && playButton);

filmControllers.forEach(({ film, stage, playButton, timecode }) => {
  const showPlayButton = () => stage.classList.remove('is-playing');
  const hidePlayButton = () => stage.classList.add('is-playing');
  const duration = Number(timecode?.dataset.duration) || 0;

  const writeTimecode = () => {
    if (!timecode) return;
    const current = Math.min(film.currentTime || 0, duration);
    const seconds = String(Math.floor(current)).padStart(2, '0');
    timecode.textContent = `00:${seconds} / 00:${String(duration).padStart(2, '0')}`;
  };

  playButton.addEventListener('click', () => {
    hidePlayButton();
    filmControllers.forEach((controller) => {
      if (controller.film !== film) controller.film.pause();
    });
    film.play().catch(() => {
      showPlayButton();
      film.controls = true;
    });
  });

  film.addEventListener('play', hidePlayButton);
  film.addEventListener('pause', showPlayButton);
  film.addEventListener('ended', showPlayButton);

  film.addEventListener('timeupdate', writeTimecode);
});

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

if ('IntersectionObserver' in window) {
  const portfolioVideos = [...document.querySelectorAll('video')];
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && !entry.target.paused) {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.15 },
  );

  portfolioVideos.forEach((video) => videoObserver.observe(video));
}
