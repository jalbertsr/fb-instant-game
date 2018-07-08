import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";

class UploadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  handleSumbit = () => {
    const products = this.state.products.map(item => {
      return {
        product_id: item.product_id,
        quantity: item.user_confirmed_quantity
      };
    });

    const listItems = this.state.products.map(item => {
      return {
        product_id: item.product_id,
        name: item.name,
        quantity: item.user_confirmed_quantity
      };
    });

    const { group_id, user_id } = this.props.history.location.userData;

    const data = {
      group_id,
      user_id,
      products,
      user_attendance: true
    };

    fetch(`https://food-society.herokuapp.com/api/instant-game/update-status/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "ok") {
          this.props.history.push({
            pathname: "/summary",
            state: {
              products: listItems,
              time: this.state.time
            }
          });
        }
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  handleAdd = title => {
    this.setState(prevState => {
      return {
        products: prevState.products.map(item => {
          const itemsNeeded =
            item.required_quantity - item.total_confirmed_quantity;
          if (item.name === title && itemsNeeded - 1 >= 0) {
            return {
              name: item.name,
              total_confirmed_quantity: item.total_confirmed_quantity + 1,
              user_confirmed_quantity: item.user_confirmed_quantity + 1,
              required_quantity: item.required_quantity,
              product_id: item.product_id
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
        products: prevState.products.map(item => {
          const itemsNeeded =
            item.required_quantity - item.total_confirmed_quantity;
          if (item.name === title && item.user_confirmed_quantity - 1 >= 0) {
            return {
              name: item.name,
              product_id: item.product_id,
              total_confirmed_quantity: item.total_confirmed_quantity - 1,
              user_confirmed_quantity: item.user_confirmed_quantity - 1,
              required_quantity: item.required_quantity
            };
          }
          return item;
        })
      };
    });
  };

  renderFoodList = () => {
    const food = this.state.products.map((item, i) => (
      <div key={i} className={styles.list_item}>
        <div className={styles.list_item_left}>
          <div className={styles.food}>{item.name}</div>
          <div className={styles.quantity_container}>
            <button
              className={styles.change_quantity}
              onClick={() => this.handleAdd(item.name)}
            >
              ➕
            </button>
            <div className={styles.quantity}>
              {item.user_confirmed_quantity}
            </div>
            <button
              className={styles.change_quantity}
              onClick={() => this.handleRemove(item.name)}
            >
              ➖
            </button>
          </div>
        </div>
        <div className={styles.list_item_right}>
          {item.required_quantity - item.total_confirmed_quantity}
        </div>
      </div>
    ));
    return food;
  };

  componentDidMount() {
    const { group_id, user_id } = this.props.history.location.userData;
    fetch(
      `https://food-society.herokuapp.com/api/instant-game/get-status/${group_id}/${user_id}/`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res.products,
          time: res.next_event_timestamp
        });
      });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h2 style={{ alignSelf: "center" }}>Food List</h2>
        <div className={styles.header}>
          <div>I can bring</div>
          <div>Items required</div>
        </div>
        <div className={styles.food_list}>{this.renderFoodList()}</div>
        <button onClick={this.handleSumbit} className={styles.button_confirm}>
          Confirm
        </button>
      </div>
    );
  }
}

export default withRouter(UploadList);
