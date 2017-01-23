// 守护进程(父进程)：用于开启子进程，并监控子进程在挂掉时重启子进程

var child_process = require('child_process');
var worker;

/**
 * 开启并重启子进程（服务器进程）
 * @param string server 子进程的js文件
 * @param string config json对象的字符串文件名，.json文件
 */
function spawn(server, config) {
    worker = child_process.spawn('node', [server, config]); // 用nodejs执行一个js文件，即开启一个js文件的进程
    worker.on('exit', function (code, error) { // 监控事件，如果worker已经退出，就执行如下程序
	if (code !== 0) {
            spawn(server, config);
	}
	// 如果异常退出code不为0，error为SIGSEGV
    });
}

function main(argv) {
    spawn('server.js', argv[0]);
    process.on('SIGTERM', function () { // 用户主动退出进程，收到SIGTERM信号时终止服务器进程
        worker.kill();
        process.exit(0);
    });
}

main(process.argv.slice(2)); // 入口函数；使用node daemon.js config.json启动服务
