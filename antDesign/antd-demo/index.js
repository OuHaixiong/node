import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
import {Button} from 'antd'; // 按钮需引入
//import {Modal,Button} from 'antd'; // 这样写是错误的，在同一个页面不能重复引用同一模块
import {Modal} from 'antd'; // 对话框需引入

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// 渲染不带图标的四个类型的按钮
ReactDOM.render(
  <div>
    <Button type="primary">Primary主按钮</Button>
	<Button>Default次按钮</Button>
	<Button type="dashed">Dashed虚线按钮</Button>
	<Button type="danger">Danger危险按钮</Button>
  </div>, document.getElementById('button'));
  
// 下面是渲染四种类型的信息提示框
function info() { // 普通类型信息提示框
  Modal.info({
    title   : 'This is a notification message title',
	content : (<div>
	  <p>some messages...这里是消息内容</p>
	  <p>some messages...这里是消息内容</p>
	</div>),
	onOk() {alert(123);}, // 单击“知道了”按钮需要执行的事件
	onCancel() {}, // 这个在这里没有用，因为info（普通类型）的信息提示，只提供一个OK按钮用于关闭
  });	
}
function success() { // 成功类型信息提示框
  Modal.success({
	title   : 'This is a success message title',
	content : 'some message... some messages...',  
  });
}
function error() { // 错误类型信息提示框
  Modal.error({
    title   : 'This is a error message title',
	content : 'some messages... ',  
  });
}
function warning() { // 警告类型信息提示框
  Modal.warning({
    title   : 'This is a warning message title',
// 如果不写内容也是可以的
  });
}

ReactDOM.render(<div>
  <Button onClick={info}>Info</Button>
  <Button onClick={success}>Success</Button>
  <Button onClick={error}>Error</Button>
  <Button onClick={warning}>Warning</Button>
</div>, document.getElementById('notification'));

// 定制化提示框
function  customNotification() {
  Modal.info({
    'title'     : '这里是定制化的标题',
	'okText'    : '取消',
	'iconType'  : '',
	'width'     : 200,
  });
}
ReactDOM.render(<Button onClick={customNotification}>customNotification定制化信息提示框</Button>, document.getElementById('custom_notification'));

