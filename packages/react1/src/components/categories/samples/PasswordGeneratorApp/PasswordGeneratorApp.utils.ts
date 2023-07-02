const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    console.error("You are using old browser, try to update to the latest version");
    return;
  }
  navigator.clipboard.writeText(text).catch((err) => {
    console.error("Could not copy text: ", err);
  });
};

export { copyTextToClipboard };
