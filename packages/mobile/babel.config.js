module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "~Navigation": "./src/global/navigation",
            "~Flow": "./src/flows",
            "~Components": "./src/components",
            "~BaseUI": "./src/shared/styles/baseUi.style",
          }
        }
      ]
    ]
  };
};
