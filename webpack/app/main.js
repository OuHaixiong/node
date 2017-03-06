// main.js 入口文件

/*var greeter = require('./Greeter.js');
document.getElementById('root').appendChild(greeter());*/

// 下面使用ES6的模块定义和渲染Greeter模块
import React from 'react'; // import是es6的语法，用来引入一个模块
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css'; // 使用require导入css文件

render(<Greeter />, document.getElementById('root'));