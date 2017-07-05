
var todoReducer = function (state, action) { // reducer
    if (typeof state === 'undefined') {
        return [];
    }

    switch (action.type) {
    	case 'addTodo' :
    	    return state.slice(0).concat({
    	    	'text' : action.text,
    	    	'completed' : false
    	    });
    	    break;
    	default :
    	    return state;
    	    break;
    }
};

var store = Redux.createStore(todoReducer);


var createTodoActions = function (text) { // action creator
    return {
    	'type' : 'addTodo',
    	'text' : text
    };
};


var TodoDemo = React.createClass({ // 创建一个名为TodoDemo的组件，组件名称首字母必须大写
	getInitialState : function () {
		return {
            'items' : store.getState()
		};
	},

	componentDidMount : function () { // 已插入真实DOM之后[组件已加载后]，执行此函数。特别注意只会执行一次
        var unsubscribe = store.subscribe(this.onChange);
        console.log('订阅了改变:', unsubscribe);
	},

	onChange : function () {
        this.setState({
        	'items' : store.getState()
        });
	},

	handleAdd : function () {
        var inputDom = ReactDOM.findDOMNode(this.refs.todo);
        var value = inputDom.value.trim();

        if (value) {
            store.dispatch(createTodoActions(value));
        }
        inputDom.value = '';
	},

	render : function () {
        return (
            <div>
                <input ref="todo" type="text" placeholder="输入todo项" style={{marginRight:'10px'}} />
                <button onClick={this.handleAdd}>点击添加</button>
                <ol>
                    {this.state.items.map(function (item) {
                    	return <li>{item.text}</li>;
                    })}
                </ol>
            </div>
        );

	}

});

ReactDOM.render(
  <TodoDemo />,
  document.getElementById('container')
);
