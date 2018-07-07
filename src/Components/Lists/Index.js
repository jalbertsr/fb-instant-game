import React, { Component } from "react";
import styles from "./styles.css";

export default class UploadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { food: "Sandwiches 🥪", need: 20, quantity: null },
        { food: "Milk 🥛", need: 15, quantity: null },
        { food: "Juice 🥤", need: 20, quantity: null },
        { food: "Apples 🍎", need: 25, quantity: null }
      ],
      value: ""
    };
  }

  add = () => {
    this.setState(prevState => ({
      list: [...prevState.list, this.state.value],
      value: ""
    }));
  };

  handleSumbit = () => {
    // axios send post
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h2>Food List</h2>
        <ul>
          {this.state.list.map((item, i) => (
            <li key={i}>
              <p className={styles.food}>
                {item.food} - {item.need}
              </p>
              <input
                className={styles.input}
                type="text"
                placeholder="0"
                name={item.quantity}
                value={item.quantity}
                onChange={this.handleChange}
              />
            </li>
          ))}
        </ul>
        <button onClick={this.handleSumbit}>Confirm</button>
      </div>
    );
  }
}
