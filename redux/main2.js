
// 用来给 组件传递数据
var mapStateToProps = function (state) {
    return {
        'count' : state.count
    };
}

var actions = { // actions
    'increase' : function () {
        return {'type' : 'INCREASE'};
    },
    'decrease' : function () {
        return {'type' : 'DECREASE'};
    }
};

// 用来组件给 容器组件派发数据
// @param dispatch 派发 Action
// @param ownProps 组件自身的 props参数
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        'increase' : function (...args) {
            dispatch(actions.increase(...args));
        },
        'decrease' : function (...args) {
            dispatch(actions.decrease(...args));
        }
    };
};

var reducer = function (state, action) { // reducer
    if (typeof(state) == 'undefined') {
        return {'count' : 0};
    }
    switch (action.type) {
        case 'INCREASE' : return {'count' : state.count + 1}; break;
        case 'DECREASE' : return {
            'count' : state.count - 1,
            'person' : {'age':32, 'name':'oBear'}
        }; break;
        default : return state;
    };
};

var store = Redux.createStore(reducer);
store.subscribe( function () { // 监听state变化
    console.log('store中的state发生改变了：');
    console.log(store.getState());
});

/**
 * 定义一个Main组件
 *
 */
var Main = React.createClass({
    getInitialState : function () {
        return {
            'num' : 0,
            'age' : 666
        };
    },
    
    pClick : function () {
        console.log('------sssssssssss------');
    },

    render : function () {
        console.log(this.props);
        console.log(this.state);
        this.pClick();
        var {count, increase, decrease} = this.props; // 拿到 this.props 参数
        return (
            <div className="count-div">
                <div>计数：{count}</div>
                <div>
                    <span className="btn" onClick={increase}>+&nbsp;&nbsp;</span> 
                    <span className="btn" onClick={decrease}>&nbsp;&nbsp;-</span>
                </div>
            </div>
        );
    }
});

/**
 * 在定义一个main组件，用来测试如果数据有变化后，是否会全部额触发渲染
 */
var Main2 = React.createClass({
    render : function () { // 这里只取state.person
        console.log('this is main2 render:');
        console.log(this.props);
        var name = '欧阳海雄';
        var age = 34;
        if (this.props.hasOwnProperty('name')) {
            name = this.props.name;
            age  = this.props.age; 
        }
        var {count, increase, decrease} = this.props; // 拿到 this.props 参数
        return (
            <div>
                <div>我是：{name}；我今年：{age}岁</div>
            </div>
        );
    }
});
var mapStateToProps2 = function (state, ownProps) {
    if (state.hasOwnProperty('person')) {
        return state.person; // 特别注意了，如果你只是用到store中的state的一部分数据，如果这部分数据没有发生改变，是不会触发render的
    } else {
        return {};
    }
};
var mapDispatchToProps2 = function (dispatch, ownProps) {
    return {};
};
var MainApp2 = ReactRedux.connect(mapStateToProps2, mapDispatchToProps2)(Main2);

/**
 * 连接 UI组件 和 容器组件
 * @param mapStateToProps     输入逻辑:外部数据（state对象）转为 UI组件的参数，即将state映射到 UI 组件的参数（props）
 * @param mapDispatchToProps  输出逻辑:用户发出的动作（Action对象）从UI组件传递出去，即将用户对 UI 组件的操作映射成 Action
 */
var MainApp = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Main);

ReactDOM.render( 
    <ReactRedux.Provider store={store}> 
        <div>
        <MainApp />
        <MainApp2></MainApp2>
        </div>
    </ReactRedux.Provider>,
    document.body.appendChild(document.createElement('div'))
);
// 特别注意上面的">"不能少；如果多个组件，外层一定要包div
