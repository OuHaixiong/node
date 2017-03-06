var webpack = require('webpack'); // 这里一定要引入，因为如果后面的配置有用到该变量时
// 如：new webpack.BannerPlugin('Copyright Flying Unicorns inc.')
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = { // __dirname 是node.js中的一个全局变量；它指向当前执行脚本所在的目录
    //devtool : 'cheap-module-eval-source-map', // cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑da时间成本是使用
	devtool : 'eval-source-map', // 从慢到快【调试从容易到难】：source-map、cheap-module-source-map、eval-source-map、cheap-module-eval-source-map
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
        hot : true, // 是否热加载
    },
    module : {
    	// loaders 是在打包构建过程中用来处理源文件（JSX,Scss,Less...）的，一次处理一个
        loaders : [ 
            { // 在配置文件里添加JSON loader
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

            },
            {
            	test : /\.css$/, // 添加对样式表的处理
            	//loader : 'style-loader!css-loader?modules' // 感叹号的作用在于使同一文件能够使用不同类型的loader
            	// 加个?modules就是模块化的意思[即允许模块化引入css，如果模块化后，同类名的css的样式也不会污染]
                //loader : extractTextPlugin.extract('style-loader', 'css-loader?modules!postcss') // 这种老写法不适用了
                loader : extractTextPlugin.extract({'fallback':'style-loader', 'use':'css-loader?modules'})
            }
        ]
    },
    //postcss : [ // 这里报错
    //    require('autoprefixer') // 调用autoprefixer插件；现在你写的css会自动根据Can i use里的数据添加不同前缀了。
    //],
    // 插件
    plugins : [
        new webpack.BannerPlugin('Copyright Flying Unicorns inc.'), // 需要new下添加一个实例。这个是版权声明插件，可以在打包后的文件头部添加给定的版权信息
        new webpack.HotModuleReplacementPlugin(), // 热加载插件。配置完热加载后可以通过命令：webpack -w 来监控修改并自动打包，这里监控的是react模块
        //new webpack.optimize.OccurenceOrderPlugin(), // 这句报错
        new webpack.optimize.UglifyJsPlugin(),
        //new extractTextPlugin('style.css')
        new extractTextPlugin('[name]-[hash].css') // 文件名是动态生成的
    ],


}