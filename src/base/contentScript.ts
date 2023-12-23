import { addJs } from '../utils/dom';

// 将插件注入到网页中
setTimeout(() => {
  addJs('plugins/plugins.js');
}, 100);

// 接收 popup 发来的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  window.postMessage(message, '*');
  sendResponse();
});
