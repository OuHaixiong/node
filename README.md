# node
node.js 学习积累 ； 2015-5-12创建


全局安装模块：npm install XXX -g[global]
本目录下安装模块并保存入依赖包配置：npm install XXX --sava[-S]/-save-dev[-D]  save会修改package.json的dependencies;--save-dev会修改devDependencies
运行时需要用到的包使用--save[产品、线上]，否则只是测试使用时用--save-dev[开发、线下]




nodejs 后端使用VisualStudio Code进行调试 [ 只适用于已运行的应用 ]
1，打开Visual Studio Code编辑器
2，命令行运行 npm run debug [其实在electron项目中是执行 electron --debug=5858 .]
  此时会运行electron app
3，切到Visual Studio点击左边debug图标[调试（Ctrl+Shift+D）]，点击图标右侧上面到三角图标[开始调试]
4，打开需要断点到js文件，在想要到行数添加断点
5，回到app界面，单击相应的功能，即可在断点处停止代码的执行，按F11可单步调试。调试的按钮在编辑框的顶部居中位置
6，在编辑框的下面有个调试控制台，在控制台中输入变量名即可查看当前的变量值

nodejs 前段调试 [适用mBlock项目]
1，打开app
2，选中webview标签，在控制台[Console]输入命令：$0.openDevTools() , 即可打开一个新的调试工具界面
3，在Sources选项下面的Sources中可以找到file://，在这里可以找到对应目录下到js文件
4，单击打开js文件，即可在相应到位置加入断点，点击前段到页面即可进行调试

npm config list 可查看npm的安装信息
npm -h 查看npm的用户手册
npm init 初始化项目，其实就是package.json的创建(-y不会出现交互界面)
npm dist-tags ls react 查看react发布过哪些tag
npm update 更新所有可更新的包
npm updata electron-builder 更新electron-builder包

 
