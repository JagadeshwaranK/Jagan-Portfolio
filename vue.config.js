module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
      
    }
  }
}