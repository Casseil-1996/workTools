const baseURL_v1 = 'http://localhost:3000/'
module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/v1': {
        target: baseURL_v1,
      },
    },
  },
}
