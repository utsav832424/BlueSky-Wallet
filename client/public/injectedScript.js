(function () {
  const myWallet = {
    enable: function () {
      console.log("Wallet enabled");
    },
    isConnected: function () {
      return true;
    },
  };

  window.myWallet = myWallet;
  console.log("My Wallet object injected into the page.");
})();
