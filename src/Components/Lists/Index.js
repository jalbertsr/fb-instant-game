import React, { Component } from "react";
import styles from "./styles.css";

export default class UploadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { food: "Sandwiches", need: 20, quantity: 0 },
        { food: "Milk 🥛", need: 15, quantity: 0 },
        { food: "Juice", need: 20, quantity: 0 },
        { food: "Apples 🍎", need: 25, quantity: 0 },
        { food: "Milk 🥛", need: 15, quantity: 0 },
        { food: "Juice", need: 20, quantity: 0 },
        { food: "Apples 🍎", need: 25, quantity: 0 }
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

  renderFoodList = () => {
    const food = this.state.list.map((item, i) => (
      <div key={i} className={styles.list_item}>
        <div className={styles.list_item_left}>
          <div className={styles.food}>
            {item.food}
          </div>
          <div className={styles.quantity}>
            <button className={styles.change_quantity}>
              ➕
            </button>
            <input
              className={styles.input}
              type="text"
              placeholder={item.quantity}
              name={item.quantity}
              value={item.quantity}
              onChange={this.handleChange}
            />
            <button className={styles.change_quantity}>
              ➖
            </button>
          </div>
        </div>
        <div className={styles.list_item_right}>
          {item.need}
        </div>
      </div>
    ))
    return food;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h2 style={{'alignSelf':'center'}}>Food List</h2>
        <div className={styles.food_list}>
          {this.renderFoodList()}
        </div>
        <button onClick={this.handleSumbit}>Confirm</button>
      </div>
    );
  }
}
