"use strict";
const sharePanel = document.querySelector('.share-panel');
const shareText = document.querySelector('#share-text').textContent.trim();
function publicShareUrl() {
  const host = location.hostname;
  const local = !host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host === '[::1]' || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);
  if (!/^https?:$/.test(location.protocol) || local || location.pathname.endsWith('/Сайт_для_согласования.html') || /%D0%A1%D0%B0%D0%B9%D1%82_/i.test(location.pathname)) return sharePanel.dataset.publicUrl;
  // Share the main page without query parameters or the visitor's current section.
  return new URL('.', location.href).href;
}
const shareUrl = publicShareUrl();
document.querySelector('#share-telegram').href = 'https://t.me/share/url?' + new URLSearchParams({url:shareUrl, text:shareText});
document.querySelector('#share-vk').href = 'https://vk.com/share.php?' + new URLSearchParams({url:shareUrl});

async function copyForSharing(text, button, feedback, message) {
  feedback.textContent = '';
  const previousManual = feedback.nextElementSibling;
  if (previousManual && previousManual.classList.contains('manual-copy')) previousManual.remove();
  let copied = false;
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); copied = true; } catch { /* Try the browser's copy fallback. */ }
  }
  if (!copied) {
    const area = document.createElement('textarea');
    area.className = 'clipboard-buffer'; area.value = text; area.readOnly = true;
    area.setAttribute('aria-label', 'Текст для копирования');
    document.body.append(area); area.select();
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    area.remove(); button.focus({preventScroll:true});
  }
  if (copied) { feedback.textContent = message; return; }
  feedback.textContent = 'Не удалось скопировать автоматически. Скопируйте выделенный текст ниже.';
  const label = document.createElement('label'); label.className = 'manual-copy';
  label.textContent = 'Текст для копирования';
  const area = document.createElement('textarea'); area.value = text; area.readOnly = true;
  area.rows = text.includes('\n') ? 6 : 3;
  label.append(area); feedback.after(label); area.focus(); area.select();
}
const copyLink = document.querySelector('#copy-link');
const copyStory = document.querySelector('#copy-story');
copyLink.hidden = false; copyStory.hidden = false;
copyLink.addEventListener('click', () => copyForSharing(shareUrl, copyLink, document.querySelector('#link-feedback'), 'Ссылка скопирована.'));
copyStory.addEventListener('click', () => copyForSharing(shareText + '\n\n' + shareUrl, copyStory, document.querySelector('#copy-feedback'), 'Текст и ссылка скопированы.'));
function revealHashTarget() {
  let id; try {id=decodeURIComponent(location.hash.slice(1));} catch {return;}
  if (!id) return; if (id === 'story') { location.replace('survillo.html#story'); return; } const target=document.getElementById(id);
  if (!target && ['evidence','timeline','fact-payment','fact-contract','fact-link','fact-ruling','fact-money','fact-limitation'].includes(id)) {
    location.replace('survillo.html' + location.hash); return;
  }
  if (target && target.tagName==='DETAILS') target.open=true;
}
window.addEventListener('hashchange',revealHashTarget); revealHashTarget();
