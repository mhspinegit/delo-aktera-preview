"use strict";
function revealDocumentTarget() {
  let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (target && target.tagName === 'DETAILS') target.open = true;
}
window.addEventListener('hashchange', revealDocumentTarget);
revealDocumentTarget();
