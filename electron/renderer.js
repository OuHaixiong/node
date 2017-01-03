// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var ipcRenderer = require('electron').ipcRenderer; // 页面进程的ipc
document.getElementById('hide').addEventListener('click', function (argument) { // 添加单击事件
	ipcRenderer.send('hiden'); // 使用ipc进程通信，这里调用ipc托管的hiden方法；给主进程推送消息
});

document.getElementById('close').addEventListener('click', function (argument) {
    ipcRenderer.send('closed'); // 使用ipc发送closed消息
    console.log('The front end clicked close');
});
