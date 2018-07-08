import React from "react";
import styles from "./styles.css";
import moment from "moment";
import { withRouter } from "react-router-dom";

class TemplateList extends React.Component {
  state = {
    list: [],
    currentName: "",
    currentQuantity: 0,
    listReady: false
  };

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderList = () => {
    if (this.state.list.length > 0) {
      const list = this.state.list.map((item, i) => {
        return (
          <div key={i} className={styles.list_item}>
            <div className={styles.item_name}>{item.name}</div>
            <div className={styles.item_quantity}>{item.quantity}</div>
          </div>
        );
      });
      return list;
    }
  };

  handleAdd = () => {
    const item = {
      name: this.state.currentName,
      quantity: this.state.currentQuantity
    };
    this.setState(prevState => {
      return {
        list: [...prevState.list, item],
        currentName: "",
        currentQuantity: 0,
        listReady: false
      };
    });
  };

  handleSumbit = () => {
    const { userData, name, time, public } = this.props.history.location.state;
    if (this.state.list.length > 0) {
      const data = {
        user_id: userData.user_id,
        group_id: userData.group_id,
        event_name: name,
        event_date: time,
        products: this.state.list,
        is_public: public
      };
      const exitData = {
        user_id: userData.user_id,
        group_id: userData.group_id,
        exit_status: true
      };
      fetch(
        "https://food-society.herokuapp.com/api/instant-game/create-event/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then(res => {
          fetch(
            `https://food-society.herokuapp.com/api/instant-game/set-exit-status/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify(exitData)
            }
          );
        });
    }
  };

  render() {
    const { name, time } = this.props.history.location.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.name}>{name}</div>
          <div className={styles.time}>{moment(time).format("MMMM Do hA")}</div>
        </div>
        <div className={styles.list}>{this.renderList()}</div>
        <div className={styles.addItem}>
          <div className={styles.input_name}>
            <input
              type="text"
              onChange={this.handleChanges}
              name="currentName"
              value={this.state.currentName}
            />
          </div>
          <div className={styles.input_quantity}>
            <input
              type="number"
              onChange={this.handleChanges}
              name="currentQuantity"
              value={this.state.currentQuantity}
            />
          </div>
          <div className={styles.button_add}>
            <button onClick={() => this.handleAdd()}>➕</button>
          </div>
        </div>
        <div className={styles.button_submit}>
          <button onClick={() => this.handleSumbit()}>Submit</button>
        </div>
      </div>
    );
  }
}

export default withRouter(TemplateList);
