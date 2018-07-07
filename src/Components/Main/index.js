import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";
import axios from "axios";
import moment from "moment";

function setClass(status) {
  if (status === null) {
    return "";
  }
  return status ? styles.greenBorder : styles.redBorder;
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      nextEventDate: "",
      nextEventName: "Food Charity Barcelona",
      listHere: false,
      status: null,
      list: [
        {
          title: "Food charity August",
          date: "August 10th",
          id: 1
        }
      ]
    };
    this.userData = {};
  }

  componentDidMount() {
    setTimeout(() => {
      axios("https://food-society.herokuapp.com/api/instant-game/get-cache")
        .then(res => res.data)
        .then(res => {
          
          const { group_id, user_id } = res;
          this.userData = { group_id, user_id };

          axios(
            `https://food-society.herokuapp.com/api/instant-game/get-status/${group_id}/${user_id}/`
          )
            .then(res => res.data)
            .then(res => {
              this.setState({
                nextEventDate: res.next_event_timestamp,
                status: res.user_attendance
              });
            });
        });
    }, 1500);
  }

  renderList = () => {
    const { list } = this.state;
    const events = list.map(event => {
      return (
        <tr key={event.id}>
          <td>{event.title}</td>
          <td>{event.date}</td>
        </tr>
      );
    });
    return events;
  };

  handleRejectButton = () => {};

  render() {
    const { nextEventDate, nextEventName, status } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.container_card}>
          <div style={{ fontSize: "1.8em" }}>{nextEventName}</div>
          <div className={styles.card_time}>
            <div>{moment(nextEventDate).format("MMMM Do")}</div>
            <div>{moment(nextEventDate).format("hA")}</div>
          </div>
          <div className={styles.buttons}>
            <button
              className={
                status === true ? `button-primary ${styles.greenBorder}` : ""
              }
              style={{ fontSize: "1.05em" }}
              onClick={() =>
                this.props.history.push({
                  pathname: "/lists",
                  userData: this.userData
                })
              }
            >
              {status ? "Confirmed" : "Attend"}
            </button>
            <button
              className={
                status === false ? `button-primary ${styles.redBorder}` : ""
              }
              style={{ fontSize: "1.05em", padding: "0 10px" }}
              onClick={() => this.handleRejectButton()}
            >
              {status === false ? "Not going" : "Not Attend"}
            </button>
          </div>
        </div>
        {this.state.listHere && (
          <div className={styles.container_list}>
            <table className="u-full-width" style={{ width: "86vw" }}>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{this.renderList()}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Main);
