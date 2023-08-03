// import ".//App.css";
// import Assistant from "./components/Assistant";
// import Chart from "./components/Chart";
// import Home from "./components/Home";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// function App() {

//   return (
//     <BrowserRouter>
//       <nav>
//         <ul>
//           <Link to="/"><li>Home</li></Link>
//           <Link to="/Chart"><li>Chart</li></Link>
//           <Link to="/Assistant"><li>Assistant</li></Link>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" index element={<Home />}></Route>
//         <Route path="/chart" index element={<Chart />}></Route>
//         <Route path="/assistant" index element={<Assistant />}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// App.js File

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import CalendarPage from "./CalendarPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      list: [],
      completedList: [],
      showCalendar: false,
    };
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput,
        completed: false, // Added 'completed' property to track if the task is completed or not
      };

      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        list,
        userInput: "",
      });
    }
  }

  deleteItem(key) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);
    this.setState({
      list: updateList,
    });
  }

  editItem = (id, editedTodo) => {
    const list = [...this.state.list];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1 && editedTodo.trim() !== "") {
      list[index].value = editedTodo;
      this.setState({
        list,
      });
    }
  };

  handleCheckboxChange = (id) => {
    const list = [...this.state.list];
    const completedList = [...this.state.completedList];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      const completedItem = list.splice(index, 1)[0];
      completedItem.completed = !completedItem.completed;
      if (completedItem.completed) {
        completedList.push(completedItem);
      } else {
        const completedIndex = completedList.findIndex((item) => item.id === id);
        completedList.splice(completedIndex, 1);
      }
      this.setState({
        list,
        completedList,
      });
    }
  };

  toggleCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
  };

  render() {
    const { showCalendar } = this.state;

    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bolder",
          }}
        >
          TO-DO LIST
        </Row>
        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add a task you want to remember . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(e) => this.updateInput(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="dark" onClick={() => this.addItem()}>
                  ADD
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item) => (
                <div key={item.id}>
                  <ListGroup.Item
                    variant="dark"
                    action
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => this.handleCheckboxChange(item.id)}
                      />
                      {item.value}
                    </span>
                    <span>
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="light"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => {
                          const editedTodo = prompt("Enter a new task:");
                          this.editItem(item.id, editedTodo);
                        }}
                      >
                        Edit
                      </Button>
                    </span>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <h3>Completed Tasks:</h3>
            <ListGroup>
              {this.state.completedList.map((item) => (
                <ListGroup.Item key={item.id} variant="success">
                  <span>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => this.handleCheckboxChange(item.id)}
                    />
                    {item.value}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <Button variant="primary" className="mt-2" onClick={this.toggleCalendar}>
              Calendar
            </Button>
          </Col>
        </Row>
        {showCalendar && <CalendarPage />}
      </Container>
    );
  }
}

export default App;
