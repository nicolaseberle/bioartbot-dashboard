module.exports = {
  devServer: {
    public: process.env.VUE_APP_FRONTEND_URL,
    port: process.env.PORT,
  },
};
