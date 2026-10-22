import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [html, css, js] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../site.js', import.meta.url), 'utf8'),
]);

test('portfolio presents a playable film hero without autoplay', () => {
  assert.match(html, /<video[^>]+id="portfolio-film"/);
  assert.match(html, /controls/);
  assert.match(html, /preload="none"/);
  assert.match(html, /poster="assets\/film\/film-poster\.png"/);
  assert.match(html, /src="assets\/film\/portfolio-film\.mp4"/);
  assert.match(html, /<track[^>]+kind="captions"/);
  assert.doesNotMatch(html, /autoplay/);
});

test('portfolio exposes the dual AI application and AIGC positioning', () => {
  assert.match(html, /AI 应用/);
  assert.match(html, /AIGC/);
  assert.match(html, /把业务问题，做成能运行、能证明的 AI 作品/);
});

test('portfolio includes the three evidence-backed projects', () => {
  assert.match(html, /data-project="film"/);
  assert.match(html, /data-project="rag"/);
  assert.match(html, /data-project="zhigan"/);
  assert.match(html, /58 题/);
  assert.match(html, /14 篇文档/);
  assert.match(html, /响应时间缩短/);
  assert.match(html, /40%/);
});

test('portfolio provides navigation, accessible focus, and reduced motion support', () => {
  assert.match(html, /href="#film"/);
  assert.match(html, /href="#projects"/);
  assert.match(html, /href="#about"/);
  assert.match(html, /class="skip-link"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(js, /IntersectionObserver/);
});

test('portfolio includes sharing metadata and avoids exposed phone numbers', () => {
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<meta property="og:description"/);
  assert.doesNotMatch(html, /tel:\+?[\d-]+/);
});

test('project imagery loads reliably and carries useful alternative text', () => {
  assert.match(html, /class="skip-link"/);
  assert.match(html, /decoding="async"/);
  assert.match(html, /alt="[^"]+"[^>]*decoding="async"/);
  assert.doesNotMatch(html, /loading="lazy"/);
});
