import createHasherWidget from './createHasherWidget.js';

const bodyEl = document.querySelector('body');
const hasherWidget = createHasherWidget(['MD5', 'SHA1', 'SHA256', 'SHA512']);
bodyEl.insertBefore(hasherWidget, bodyEl.firstChild);
