"use strict";
const documentDialog = document.querySelector('#document-dialog');
const enlargedDocument = documentDialog.querySelector('img');
const documentTitle = documentDialog.querySelector('h2');
document.querySelectorAll('.story-document a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const image = link.querySelector('img');
    enlargedDocument.src = image.src;
    enlargedDocument.alt = image.alt;
    documentTitle.textContent = image.alt;
    documentDialog.showModal();
  });
});
documentDialog.querySelector('button').addEventListener('click', () => documentDialog.close());
