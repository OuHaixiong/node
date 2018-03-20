/**
 * EventEmitter发送和接受事件
 * HTTPServer和HTTPClient类，它们都继承自EventEmitter
 * 
 * EventEmitter被定义在Node的事件(events)模块中，直接使用EventEmitter类需要先声明require('events')，
 * 否则不必显式声明require('events')，因为Node中很多对象都无需你调用require('events')就会使用EventEmitter
 */

var events = require('events');
var util = require('util');

function pulser() { // 定义一个pulser类
    events.EventEmitter.call(this);
}
util.inherits(pulser, events.EventEmitter); // 通过util.inherits继承EventEmitter

pulser.prototype.start = function() {
    var self = this;
    this.id = setInterval(function () { // 每隔一秒向所有的监听器发送一个定时事件
        util.log('>>>>pulse');
        self.emit('pulse');// emit()方法将pulse事件发送给每一个监听器
        util.log('<<<<pulse');
    }, 1000);
}

var pulserObj = new pulser(); // 插件pulser对象 
pulserObj.on('pulse', function() { // 监听pulse事件，为pulse事件和回调函数建立联系
    util.log('pulse received');
});
pulserObj.start();
//对象使用emit函数发送事件，所有注册到对应事件的监听器都可以收到事件；
//通过调用.on方法注册监听器，参数是事件名，并用一个回调函数接收事件
//通常来说，有一些数据需要伴随着事件同时发送  self.emit('eventName', data1, data2, ..);
//emitter.on('eventName', function(data1, data2,..){
       //接收到事件后的操作
// });