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

test('portfolio includes the six evidence-backed projects', () => {
  assert.match(html, /data-project="film"/);
  assert.match(html, /data-project="rag"/);
  assert.match(html, /data-project="ai-job-helper"/);
  assert.match(html, /data-project="xiangban"/);
  assert.match(html, /data-project="handpose"/);
  assert.match(html, /data-project="zhigan"/);
  assert.match(html, /六件作品/);
  assert.deepEqual(
    [...html.matchAll(/data-project="([^"]+)"/g)].map((match) => match[1]),
    ['film', 'rag', 'ai-job-helper', 'xiangban', 'handpose', 'zhigan'],
  );
  assert.match(html, /58 题/);
  assert.match(html, /13 篇文档/);
  assert.match(html, /14 个检索片段/);
  assert.doesNotMatch(html, /14 篇文档 \/ 14 个检索片段/);
  assert.match(html, /响应时间缩短/);
  assert.match(html, /40%/);
});

test('AI job helper is presented as a real product loop with a live demo and honest ownership boundary', () => {
  assert.match(html, /id="ai-job-helper"/);
  assert.match(html, /AI 求职好帮手/);
  assert.match(html, /简历诊断/);
  assert.match(html, /岗位匹配/);
  assert.match(html, /多轮模拟面试/);
  assert.match(html, /云端记录/);
  assert.match(html, /本地测试 FCP 降低约 32%/);
  assert.match(html, /WorkBuddy BaaS/);
  assert.match(html, /不是自研基础模型/);
  assert.match(html, /https:\/\/ai-job-helper-85993\.app\.workbuddy\.host\//);
  assert.match(html, /assets\/ai-job-helper-home\.webp/);
  assert.match(html, /assets\/ai-job-helper-resume\.webp/);
  assert.match(html, /assets\/ai-job-helper-match\.webp/);
});

test('Xiangban documents the avatar generation, voice and mouth motion loop without inventing a public URL', () => {
  assert.match(html, /id="xiangban"/);
  assert.match(html, /像伴/);
  assert.match(html, /轻 Q/);
  assert.match(html, /人物照片/);
  assert.match(html, /虚拟形象/);
  assert.match(html, /拟人语音/);
  assert.match(html, /真实语音包络驱动嘴型/);
  assert.match(html, /本地运行应用/);
  assert.match(html, /assets\/xiangban-avatar\.webp/);
  assert.match(html, /assets\/xiangban-studio\.webp/);
  assert.doesNotMatch(html, /href="[^"]*127\.0\.0\.1/);
});

test('computer-vision project explains the real gesture interaction boundary', () => {
  assert.match(html, /隔空手势画图/);
  assert.match(html, /MediaPipe Hands/);
  assert.match(html, /21 个手部关键点/);
  assert.match(html, /38 项/);
  assert.match(html, /6 类/);
  assert.match(html, /One Euro 平滑/);
  assert.match(html, /原生 DPI 显示适配/);
  assert.match(html, /两帧手势确认/);
  assert.match(html, /真实演示视频验证/);
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

test('both films sit side by side in the opening and stack on narrow screens', () => {
  const projectsIndex = html.indexOf('<section class="projects"');
  const familyFilmIndex = html.indexOf('id="family-experiment"');
  const filmPairIndex = html.indexOf('class="film-duo"');

  assert.ok(filmPairIndex > 0);
  assert.ok(familyFilmIndex > filmPairIndex);
  assert.ok(familyFilmIndex < projectsIndex);
  assert.equal((html.match(/data-film-card/g) || []).length, 2);
  assert.doesNotMatch(html, /class="motion-feature"/);
  assert.match(css, /\.film-duo\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(css, /@media \(max-width: 980px\)[\s\S]*?\.film-duo\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(js, /querySelectorAll\('\[data-film-card\]'\)/);
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

test('motion is progressive, readable and respects reduced-motion preferences', () => {
  assert.match(css, /--reveal-distance/);
  assert.match(css, /@starting-style/);
  assert.match(css, /transition-delay/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.js \.reveal,[\s\S]*?opacity:\s*1/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.js \.reveal\.is-visible[\s\S]*?transition:\s*none/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation-duration:\s*0s\s*!important/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition-duration:\s*0s\s*!important/s);
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
