// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var ipcRenderer = require('electron').ipcRenderer; // 页面进程的ipc
document.getElementById('hide').addEventListener('click', function (argument) { // 添加单击事件
	ipcRenderer.send('hiden'); // 使用ipc进程通信，这里调用ipc托管的hiden方法；给主进程推送消息
});

document.getElementById('close').addEventListener('click', function (argument) {
    //ipcRenderer.send('closed'); // 使用ipc发送closed消息
    console.log('The front end clicked close');
    ipcRenderer.send('closeWindow'); 
});

document.getElementById('test_ipc').addEventListener('click', function (argument) {
    ipcRenderer.send('testIpcBackEnd', {'name':'欧阳海雄', 'age':34});
});

// 前端监控接收后台传过来的消息
ipcRenderer.once('testIpcFrontEnd', function (eventObj, argumentObj) { // 这里也是有且只有两个参数，且都为对象
	// eventObj 有一个属性sender为EventEmitter对象，该对象有sendToHost方法（用于与页面的父级进行消息通信）
	// argumentObj 后台传过来的参数，类似：{msg: "Hello 欧阳海雄!! Your age is 34"}
    console.log('Have received the background information');
    console.log(eventObj);
    alert(argumentObj.msg);
});
// 监听消息[事件]可以使用on或者once，区别是on是一直监听，once只会被触发一次(然后就会自动取消监听)

const shell = require('electron').shell;
