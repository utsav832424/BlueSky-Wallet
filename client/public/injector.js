(function () {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("injectedScript.js");
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
})();
