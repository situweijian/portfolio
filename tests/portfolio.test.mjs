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
  assert.match(html, /poster="assets\/film\/film-poster\.jpg"/);
  assert.match(html, /src="assets\/film\/portfolio-film\.mp4"/);
  assert.match(html, /<track[^>]+kind="captions"/);
  assert.doesNotMatch(html, /autoplay/);
});

test('portfolio exposes the dual AI application and AIGC positioning', () => {
  assert.match(html, /AI 应用/);
  assert.match(html, /AIGC/);
  assert.match(html, /把业务问题，做成能运行、能证明的 AI 作品/);
});

test('portfolio includes the four evidence-backed projects', () => {
  assert.match(html, /data-project="film"/);
  assert.match(html, /data-project="rag"/);
  assert.match(html, /data-project="handpose"/);
  assert.match(html, /data-project="zhigan"/);
  assert.match(html, /58 题/);
  assert.match(html, /13 篇文档/);
  assert.match(html, /14 个检索片段/);
  assert.doesNotMatch(html, /14 篇文档 \/ 14 个检索片段/);
  assert.match(html, /响应时间缩短/);
  assert.match(html, /40%/);
});

test('computer-vision project explains the real gesture interaction boundary', () => {
  assert.match(html, /隔空手势画图/);
  assert.match(html, /MediaPipe Hands/);
  assert.match(html, /21 个手部关键点/);
  assert.match(html, /30 项/);
  assert.match(html, /6 类/);
  assert.match(html, /One Euro 平滑/);
  assert.match(html, /120 帧真实视频验证/);
  assert.match(html, /固定阈值判断手指状态/);
  assert.match(html, /没有训练新的手势分类模型/);
  assert.match(html, /assets\/handpose-studio\.webp/);
  assert.doesNotMatch(html, /assets\/handpose-session\.webp/);
  assert.match(html, /assets\/handpose-landmarks\.webp/);
  assert.match(html, /1440×900 界面预览/);
  assert.doesNotMatch(html, /1440×900 实机界面/);
  assert.match(css, /aspect-ratio:\s*16\s*\/\s*10/);
});

test('AIGC project includes the new family-scene experiment', () => {
  assert.match(html, /id="family-experiment"/);
  assert.match(html, /src="assets\/film\/family-experiment\.mp4"/);
  assert.match(html, /poster="assets\/film\/family-experiment-poster\.webp"/);
  assert.match(html, /family-experiment\.zh-CN\.vtt/);
  assert.match(html, /家庭生活场景实验/);
  assert.match(html, /MiniMax H3/);
  assert.match(html, /3072×1728/);
  assert.match(js, /querySelectorAll\('video'\)/);
});

test('portfolio shows the current RAG product interface', () => {
  assert.match(html, /class="rag-interface"/);
  assert.match(html, /class="rag-interface-main"/);
  assert.match(html, /class="rag-interface-mobile"/);
  assert.match(html, /assets\/rag-interface\.webp/);
  assert.match(html, /assets\/rag-interface-mobile\.webp/);
  assert.match(html, /桌面与手机实机界面/);
  assert.doesNotMatch(html, /class="rag-console"/);
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
  assert.match(html, /assets\/film\/still-s01\.webp/);
  assert.match(html, /assets\/zhigan_sys-ui\.webp/);
  assert.match(html, /assets\/rag-interface\.webp/);
  assert.match(html, /assets\/rag-interface-mobile\.webp/);
  assert.match(html, /assets\/handpose-studio\.webp/);
  assert.match(html, /assets\/handpose-landmarks\.webp/);
  assert.match(html, /alt="[^"]+"[^>]*width="[0-9]+"[^>]*height="[0-9]+"/);
});
