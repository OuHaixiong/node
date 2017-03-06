module.exports = { // __dirname 是node.js中的一个全局变量；它指向当前执行脚本所在的目录
    //devtool : 'cheap-module-eval-source-map', // cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑da时间成本是使用
	devtool : 'cheap-module-source-map', // 从慢到快【调试从容易到难】：source-map、cheap-module-source-map、eval-source-map、cheap-module-eval-source-map
	entry : __dirname + '/app/main.js', // 唯一入口文件
    output : {
    	path : __dirname + '/public', // 打包后的文件存放的地方
    	filename : 'bundle.js' // 打包后输出文件的文件名
    },
    devServer : {
        contentBase : './public', // 本地服务器所加载的页面所在的目录
        colors : true, // 终端中输出结果为彩色
        historyApiFallback : true, // 不跳转{所有的跳转将指向index.html}
        inline : true, // 实时刷新{当源文件改变时会自动刷新页面}
        //port : 8080 // 设置默认监听端口，如果省略，默认为”8080“
    },
    module : {
        loaders : [ // 在配置文件里添加JSON loader
            {
            	test : /\.json$/, // 一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
            	loader : 'json-loader' // json-loader ; loader的名称（必须）
            	// include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
                // query：为loaders提供额外的设置选项（可选）
            },
            {
            	test : /\.js$/,
            	exclude : /node_modules/,
            	loader : 'babel-loader',
            	/*query : { // 这个可以分文件写，见.babelrc【webpack会自动调用次文件】
            		presets : ['es2015', 'react']
            	}*/
            	// include : [path.join(__dirname, './assets/js')] // 需要打包的文件和文件夹

            }
        ]
    },


}