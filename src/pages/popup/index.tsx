import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd/es';
import { getCurrentTabInfo } from '../../utils/index';
import styles from './index.less';

class Popup extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={styles.popup}>
        <Button
          type="primary"
          onClick={async () => {
            // 获取当前 tab
            const currentTabInfo = await getCurrentTabInfo();
            const { url, id: tabId } = currentTabInfo || {};
            if (!tabId) {
              return;
            }

            chrome.tabs.sendMessage(tabId, {}, (response) => {});
          }}
        >
          test
        </Button>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Popup></Popup>
  </React.StrictMode>,
  document.getElementById('root')
);
