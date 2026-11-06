"use strict";
const caseTarget = document.body.dataset.caseTarget;
if (['survillo.html','kuzemin.html'].includes(caseTarget)) location.replace(caseTarget + (location.hash || '#evidence'));
