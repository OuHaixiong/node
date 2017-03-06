// 测试打包随便写的js
/*var config = require('./greetText.json'); 

module.exports = function () {
    var greet = document.createElement('div');
    //greet.textContent = 'Hi there and greetings!';
    greet.textContent = config.greetText;
    return greet;
};*/


// 下面使用es6的语法写上面的功能
import React, {Component} from 'react';
import config from './greetText.json';
import styles from './Greeter.css'; // 模块化导入css文件

class Greeter extends Component
{
    render () { //  className={styles.root} 添加类名；放心使用把，相同的类名也不会造成不同组件之间的污染。
    	return (
            <div className={styles.root}>   
                {config.greetText}
            </div>
    	);
    }
}

export default Greeter;