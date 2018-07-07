import React from "react";
import styles from "./styles.css";
import moment from "moment";

class Summary extends React.Component {
  state = {
    event_timestamp: "2018-07-08T00:00:00+00:00",
    products: []
  };

  componentDidMount() {
    const { products, } = this.props.location.state;
    this.setState({
      products: this.props.location.products
    });
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
    const { event_timestamp } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>Summary</div>
        <div className={styles.wrapper}>
          <div className={styles.list_items}>{this.renderList()}</div>
        </div>
        <div className={styles.footer}>
          <h5 style={{ textAlign: "center" }}>Thanks for your help!</h5>
          <h5 style={{ textAlign: "center" }}>
            See you in {moment(event_timestamp).fromNow()} !
          </h5>
          <div>
            <button
              style={{
                backgroundColor: "white",
                margin: "0 auto",
                display: "block"
              }}
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
