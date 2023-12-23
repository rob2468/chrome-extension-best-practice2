export function addJs(plugin: string, onload?: any) {
  onload = onload || function () {};
  var file = chrome.runtime.getURL(plugin);
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = file;

  s.onload = function (ev) {
    onload();
  };
  s.defer = true;
  document.body.appendChild(s);
}
