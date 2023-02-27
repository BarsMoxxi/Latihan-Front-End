import React from 'react';
import logo from './logo.svg';
import './App.css';
import  "./styles.css";
import "bootstrap/dist/css/bootstrap.css"
import TodoItemC from './components/TodoitemC';
import Axios from 'axios';

class App extends React.Component {
  state = {
    todoList: [
    ],
    inputTodo:"",
  }

fecthTodo = () => {
  Axios.get("http://localhost:2000/todo") // Start execute
  .then((response) => {
    console.log(response.data);
    this.setState({ todoList: response.data });
  })
  .catch((err) => {
    alert("Terjadi Kesalahn Di Server")
  })
};

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todo/${id}`)
    .then(() => {
      alert("Berhasil Delete");
      this.fecthTodo()
    })
    .catch((err) => {
      alert("Terjadi Kesalahn Di Server")
    })
  }

  completeTodo = (id) => {
    Axios.patch(`http://localhost:2000/todo/${id}`, {
      isFinished: true
    })
    .then(() => {
      alert("Berhasil Complete Todo")
      this.fecthTodo()
    })
    .catch((err) => {
      alert("Terjadi Kesalahn Di Server")
    })
  }

  renderTodoList = () => {
    return this.state.todoList.map((val) => {
      return (
        <TodoItemC 
        completeTodoHandler={this.completeTodo} 
        deleteTodoHandler={this.deleteTodo} 
        todoData={val} 
        />
      );
    });
  };
  
  addTodo = () => {
    Axios.post("http://localhost:2000/todo", {
      activity: this.state.inputTodo,
      isFinished: false,
    })
    .then(() => {
      alert("Berhasil menambahkan todo")
      this.fecthTodo()
    })
    .catch((err) => {
      alert("Terjadi Kesalahn Di Server")
    })
  }

  

  inputHandler = (event) => {
    this.setState({ inputTodo: event.target.value});
  }

  componentDidMount() {
    alert("component mount")
  }
  
  render () {
    return (
      <div>
        <h1>Project Todo List</h1>
        <button className='btn btn-info' onClick={this.fecthTodo}>Get My Todo List</button>
        { this.renderTodoList() }
        <div>
          <input onChange={this.inputHandler} type="text" className="mx-3" />
        <button onClick={this.addTodo} className="btn btn-primary">Add Todo</button>
        </div>
      </div>
    );
  }
}

export default App;
