class Configuration {
  serverPort() {
    return process.env.PORT || 8080;
  }

  axiosTimeout() {
    return 3000;
  }
  obsURL() {
    return "ws://127.0.0.1:4455";
  }
  obsPassword() {
    return "zeinebtest";
  }
}

module.exports = new Configuration();
