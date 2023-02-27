import React from "react";

class TodoItemC extends React.Component {

  deleteBtnHandler() {
    alert("Anda Memencet tombol Delete");
  }

  btnHandler(type) {   //dengan parameter bungkus dengan anonymus function
    alert(`Anda Memencet tombol ${type}`)
  }

    render () {
        return (
            <div className="my-1 d-flex flex-row justify-content-between todo-item-container align-items-center">
            {this.props.todoData.activity} ID: {this.props.todoData.id}
        <div>
          <button 
            onClick={() => this.props.deleteTodoHandler(this.props.todoData.id)}
            className="btn btn-danger">
            Delete
          </button>
          <button 
            disabled={this.props.todoData.isFinished}
            onClick={() => this.props.completeTodoHandler(this.props.todoData.id)}
            className="btn btn-success">
            {
              // if ternary
              // this.props.todoData.isFinished ? <strong>Finished</strong>: <em>Complete</em>
              this.props.todoData.isFinished ? "Finished": "Complete"
            }
          </button>
        </div>
      </div>
      
        )
    }
}

export default TodoItemC;