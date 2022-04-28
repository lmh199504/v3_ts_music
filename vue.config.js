const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static', //放置生成的静态资源
	devServer: {
		open: true,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://192.168.1.28:3200',
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
	},
	// css: {
	// 	loaderOptions: {
	// 		less: {
	// 			// 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
	// 			modifyVars: {
	// 				// 直接覆盖变量
	// 				// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
	// 				hack: `true; @import "${path.join(__dirname, './src/assets/styles/resetVant.less')}";`
	// 			},
	// 		},
	// 	},
	// }
}
