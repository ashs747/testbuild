import React from 'react';
import Todo from './Todo.jsx';

class ToDoList extends React.Component {

  constructor() {
    super();
  }

  render() {
    var todoItems = this.props.data.map(function(item) {
      return <Todo text={item.text} createdBy={item.createdBy} date={item.date}/>;
    });

    return (
      <div>
        {todoItems}
      </div>
    )
  }
}

export default ToDoList;