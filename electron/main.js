// 应用开始启动
const electron = require('electron'); // const:代表一个值的常量索引 ，也就是说，变量名字在内存中的指针不能够改变，但是指向这个变量的值可能改变,即第一次初始化后就不能再赋值改变了
const {app} = electron; // 用于控制应用生命周期【主进程】
//const {BrowserWindow} = electron; // 用于创建本地窗口。 (这样的写法和下面的是一样的，是把一个属性赋给一个变量，只是这个属性名和变量的名一样)
const BrowserWindow = electron.BrowserWindow;

// 为Window对象创建一个全局的引用,否则可能被JavaScript的垃圾回收机制自动回收
let mainWindow; // 定义一个变量，let是更严格的定义方式,let定义的变量一定要用，切需要先定义后使用，有着严格的作用域
// 在新的ES6标准中let完全可以替代var

function createWindow() { // 创建一个窗口【创建子进程、渲染进程】
    mainWindow = new BrowserWindow({width:800, height:600,resizable:true,frame:true}); // 实例化创建网页，宽高不能用百分比
    // resizable : 窗口是否可拖动变大小。默认true：可调整大小，false：固定宽高
    // frame : 是否用框架，即是否有title那栏【有最大化和最小化、关闭按钮】；默认true：有，false：没有
    
    
    mainWindow.loadURL(`file://${__dirname}/index.html`); // 加载应用入口文件
    mainWindow.webContents.openDevTools(); // 开启浏览器的开发者工具[启动调试工具]
    mainWindow.on('closed', function () { // 设置窗口关闭事件
        mainWindow = null;
        console.log('window is closed!');
        // 因为上面是设置了一个全局引用,因此这里需要对该对象解除引用
        // 如果你的应用支持打开多窗口,可以把所有的引用存入一个数组中,然后在这里动态删除
    });
    
    var ipcMain = electron.ipcMain; //ipc主进程 或 在顶部这样写 const {ipcMain} = require('electron')
    ipcMain.on('hiden', function (argument) { // 添加hiden事件
        mainWindow.hide(); // 最小化窗口
    });
//    ipcMain.on('closed', function () { // 监控closed消息事件
//    	console.log('The back-end closed event');
//    	mainWindow.close(); // 多点几次会报错，最好还是不要自己去实现该功能
//        
//    });

//    const registerQ = globalShortcut.register('CommandOrControl+Q', () => { // 这里也报错，报：globalShortcut is not defined
//        mainWindow.close();
//    });
}

app.on('ready', createWindow); // 主进程加载时，执行的事件；在基本环境准备好之后的回调
// app为主进程，管理所有页面和与之对应的渲染进程，每个渲染进程都是相互独立的，并且只关心他们自己的网页
app.on('window-all-closed', () => { // 所有的子进程【渲染进程】关闭后，执行此函数.[()=>{}声明一个函数和这个是一样的：function () {}]
	// 所有窗口都关闭之后的回调
	console.log(process.platform); // 在mac中返回darwin
    if (process.platform !== 'darwin') { // 这里是除了苹果平台以为的所有其他平台
    	//在OSX中经常是用户虽然关闭了主窗口,但是仍然希望使用Menu Bar,因此这里不进行强行关闭
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
    	console.log('is closed!!!!');
	    app.quit();
    }
});

app.on('will-quit', () => { // 窗口关闭之前执行的动作
	// Unregister a shortcut.
    //globalShortcut.unregister('CommandOrControl+Q');
    // Unregister all shortcuts.
    // globalShortcut.unregisterAll();
});


// .on('XX', function() {}) 托管一个事件 
//应用被重新激活之后的回调
app.on('activate', () => { // 在Dock中的Menu Bar被点击之后重新激活应用
	if (mainWindow === null) { // 相当于按了F5，重新加载页面
		createWindow();
	} else {
		mainWindow.show(); // 最大化窗口【显示窗口；和最小化是相反的】
	}
	console.log('click dock Menu Bar!');
});
