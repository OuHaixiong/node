# node
node.js 学习积累 ； 2015-5-12创建


全局安装模块：npm install XXX -g
本目录下安装模块并保存入依赖包配置：npm install XXX --sava/-save-dev  save会修改package.json的dependencies;--save-dev会修改devDependencies
运行时需要用到的包使用--save[产品、线上]，否则只是测试使用时用--save-dev[开发、线下]