import React from 'react';
import styles from "./styles.css";
import moment from 'moment';

class TemplateList extends React.Component {

  state = {
    list: [],
    currentName: '',
    currentQuantity: 0,
    listReady: false
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  renderList = () => {
    if (this.state.list.length > 0) {
      const list = this.state.list.map((item, i) => {
        return (
          <div key={i} className={styles.list_item}>
              <div className={styles.item_name}>
                {item.name}
              </div>
              <div className={styles.item_quantity}>
                {item.quantity}
              </div>
          </div>
        )
      })
      return list
    }
  }

  handleAdd = () => {
    const item = {
      name: this.state.currentName,
      quantity: this.state.currentQuantity
    }
    this.setState((prevState) => {
      return {
        list: [...prevState.list, item],
        currentName: '',
        currentQuantity: 0,
        listReady: false
      }
    })
  }

  handleSumbit = () => {
    if (this.state.list.length > 0) {
      const data = {
        user_id:"hjsgkhdgjghk",
        group_id:"2143#",
        event_name: this.props.history.location.state.name,
        event_date: this.props.history.location.state.time,
        products: this.state.list
      }
      fetch(
        'https://food-society.herokuapp.com/api/instant-game/create-event/',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(data)
        }
      )
      .then(res => res.json())
      .then(res => console.log(res))
    }
  }

  render () {
    const { name, time } = this.props.history.location.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.name}>
            {name}
          </div>
          <div className={styles.time}>
            {moment(time).format("MMMM Do hA")}
          </div>
        </div>
        <div className={styles.list}>
          {this.renderList()}
        </div>
        <div className={styles.addItem}>
          <div className={styles.input_name}>
            <input
              type='text'
              onChange={this.handleChanges}
              name='currentName'
              value={this.state.currentName}
            >
            </input>
          </div>
          <div className={styles.input_quantity}>
            <input
              type='number'
              onChange={this.handleChanges}
              name='currentQuantity'
              value={this.state.currentQuantity}
            >
            </input>
          </div>
          <div className={styles.button_add}>
            <button
              onClick={() => this.handleAdd()}
            >
              ➕
            </button>
          </div>
        </div>
        <div className={styles.button_submit}>
          <button
            onClick={() => this.handleSumbit()}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default TemplateList;
