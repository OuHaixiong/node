// 这里仅仅是演示下，在不同的环境中，可以配置不同的配置文件，然后加载不同的内容
var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  module: {
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
              loader : 'style-loader!css-loader?modules' // 感叹号的作用在于使同一文件能够使用不同类型的loader
              // 加个?modules就是模块化的意思[即允许模块化引入css，如果模块化后，同类名的css的样式也不会污染]
            }
        ]
  },


    plugins : [
        new webpack.BannerPlugin('Copyright Flying Unicorns inc.'), // 需要new下添加一个实例。这个是版权声明插件，可以在打包后的文件头部添加给定的版权信息
        new webpack.HotModuleReplacementPlugin(), // 热加载插件。配置完热加载后可以通过命令：webpack -w 来监控修改并自动打包，这里监控的是react模块
    ],

}