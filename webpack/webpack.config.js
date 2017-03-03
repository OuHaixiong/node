module.exports = { // __dirname 是node.js中的一个全局变量；它指向当前执行脚本所在的目录
    //devtool : 'cheap-module-eval-source-map', // cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑da时间成本是使用
	devtool : 'eval-source-map', // 从慢到快【调试从容易到难】：source-map、cheap-module-source-map、eval-source-map、cheap-module-eval-source-map
	entry : __dirname + '/app/main.js', // 唯一入口文件
    output : {
    	path : __dirname + '/public', // 打包后的文件存放的地方
    	filename : 'bundle.js' // 打包后输出文件的文件名
    }
}