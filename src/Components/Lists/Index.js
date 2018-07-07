import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";

class UploadList extends React.Component {
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
    this.props.history.push({
      pathname: '/summary',
      products: { list: this.state.list }
    })
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = title => {
    this.setState(prevState => {
      return {
        list: prevState.list.map(item => {
          if (item.food === title && item.need - 1 >= 0) {
            return {
              food: item.food,
              need: item.need - 1,
              quantity: item.quantity + 1
            };
          }
          return item;
        })
      };
    });
  };

  handleRemove = title => {
    this.setState(prevState => {
      return {
        list: prevState.list.map(item => {
          if (item.food === title && item.quantity - 1 >= 0) {
            return {
              food: item.food,
              need: item.need + 1,
              quantity: item.quantity - 1
            };
          }
          return item;
        })
      };
    });
  };

  renderFoodList = () => {
    const food = this.state.list.map((item, i) => (
      <div key={i} className={styles.list_item}>
        <div className={styles.list_item_left}>
          <div className={styles.food}>{item.food}</div>
          <div className={styles.quantity_container}>
            <button
              className={styles.change_quantity}
              onClick={() => this.handleAdd(item.food)}
            >
              ➕
            </button>
            <div className={styles.quantity}>{item.quantity}</div>
            <button
              className={styles.change_quantity}
              onClick={() => this.handleRemove(item.food)}
            >
              ➖
            </button>
          </div>
        </div>
        <div className={styles.list_item_right}>{item.need}</div>
      </div>
    ));
    return food;
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h2 style={{ alignSelf: "center" }}>Food List</h2>
        <div className={styles.header}>
          <div>I can bring</div>
          <div>Items required</div>
        </div>
        <div className={styles.food_list}>{this.renderFoodList()}</div>
        <button onClick={this.handleSumbit}>Confirm</button>
      </div>
    );
  }
}

export default withRouter(UploadList);
