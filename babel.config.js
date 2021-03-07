module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // below plugin added for react-native-dotenv library
    // which uses .env file to create a js config file
    // which we do not see in the file system directly
    plugins: [["module:react-native-dotenv"]]
  };
};
