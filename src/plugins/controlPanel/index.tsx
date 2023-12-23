import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

class ControlPanel extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown, false);
  }

  onKeydown = (event: any) => {
    const keyName = event?.key;
    if (keyName === 'Escape') {
      // 按下 Esc 键
      unmount();
    }
  };

  render() {
    return <div className={styles.controlPanel}></div>;
  }
}

export function mount() {
  const container = document.createElement('div');
  container.id = 'chrome-extension-best-practice2';
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.right = '0';
  container.style.top = '0';
  container.style.bottom = '0';
  container.style.zIndex = '999';
  container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  document.body.appendChild(container);

  ReactDOM.render(
    <React.StrictMode>
      <ControlPanel />
    </React.StrictMode>,
    container
  );
}

function unmount() {
  document.getElementById('chrome-extension-best-practice2')?.remove();
}
