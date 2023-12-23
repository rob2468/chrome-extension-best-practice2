import { mount } from './controlPanel';

// 接收 content-scripts 发来的消息
window.addEventListener(
  'message',
  (message) => {
    showControlPanel();
    return;
  },
  false
);

const showControlPanel = () => {
  mount();
};
