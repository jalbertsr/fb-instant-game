import React from "react";
import styles from "./styles.css";
import moment from "moment";

class Summary extends React.Component {
  state = {
    time: "",
    products: []
  };

  componentDidMount() {
    const { products, time } = this.props.location.state;
    console.log(products, time);
    this.setState({ products, time });
  }

  renderList = () => {
    const { products } = this.state;
    const list = products.map(item => {
      return (
        <div className={styles.list_item} key={item.product_id}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.quantity}>{item.quantity}</div>
        </div>
      );
    });
    return list;
  };

  handleExit = () => {
    const {
      userData: { user_id, group_id }
    } = this.props.location.state;
    const data = {
      user_id,
      group_id,
      exit_status: true
    };
    fetch(
      `https://food-society.herokuapp.com/api/instant-game/set-exit-status/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  render() {
    const { time } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>Summary</div>
        <div className={styles.wrapper}>
          <div className={styles.list_items}>{this.renderList()}</div>
        </div>
        <div className={styles.footer}>
          <h5 style={{ textAlign: "center" }}>Thanks for your help!</h5>
          <h5 style={{ textAlign: "center" }}>
            See you in {moment(time).fromNow()} !
          </h5>
          <div>
            <button
              style={{
                backgroundColor: "white",
                margin: "0 auto",
                display: "block"
              }}
              onClick={this.handleExit}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
