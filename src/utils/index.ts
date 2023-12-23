/**
 * 获取当前标签页的信息
 */
export const getCurrentTabInfo = async () => {
  const tabInfo = await new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        resolve(tabs[0]);
      }
    );
  });

  return tabInfo as chrome.tabs.Tab | undefined;
};
