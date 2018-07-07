import React from "react";
import styles from "./styles.css";

class Summary extends React.Component {
  state = {
    next_event_timestamp: "2018-07-08T00:00:00+00:00",
    products: []
  };

  componentDidMount() {
    console.log(this.props.location.products);
  }

  renderList = () => {
    const { products } = this.state;
    const list = products.map(item => {
      return (
        <div className={styles.list_item} key={item.product_id}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.quantity}>{item.user_confirmed_quantity}</div>
        </div>
      );
    });
    return list;
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>Summary</div>
        <div className={styles.list_items}>{this.renderList()}</div>
        <div className={styles.footer}>
          <span>Thanks for your help!</span>
          <span>See you in {this.state.next_event_timestamp}!</span>
          <button>Exit</button>
        </div>
      </div>
    );
  }
}

export default Summary;
