// const path = require('path')

// function resolve(dir) {
// 	return path.join(__dirname, dir)
// }
module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static', //放置生成的静态资源
	devServer: {
		open: true,
		hot: true,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				// target: 'http://101.35.109.105:3006',
				// target: 'http://10.0.9.62:8080', //代理地址，这里设置的地址会代替axios中设置的baseURL
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				//ws: true, // proxy websockets
				//pathRewrite方法重写url
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = '音乐'
				return args
			})
	}
}
