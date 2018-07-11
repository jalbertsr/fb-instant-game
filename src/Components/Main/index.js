import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.css";
import axios from "axios";
import moment from "moment";
import MainLoader from '../Loader';

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
      listHere: false,
      status: null,
      groupName: "",
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
      axios("https://food-society.herokuapp.com/api/instant-game/get-cache/")
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
                status: res.user_attendance,
                groupName: res.group_name
              })
            })
            .catch(err => {
              this.props.history.push({
                pathname: '/template',
                state: { userData: res }
              })
            })
          })
    }, 2000);
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

  handleRejectButton = () => {
    const { group_id, user_id } = this.userData;

    const data = {
      group_id,
      user_id,
      user_attendance: false
    };

    fetch(
      `https://food-society.herokuapp.com/api/instant-game/update-status/`,
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
        this.setState({ status: false });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  render() {
    const { nextEventDate, status, groupName } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.container_card}>
          {/* {nextEventDate && groupName ?
          <React.Fragment> */}
            <div style={{ fontSize: "1.8em" }}>{groupName}</div>
              <img className={styles.main_image} alt='food' src='https://images.unsplash.com/photo-1459314079206-9970f36c7784?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=29c98f7a81a12658017b7ff79c11f23b&auto=format&fit=crop&w=1050&q=80'>
              </img>
            <div className={styles.card_time}>
              <div>{moment(nextEventDate).format("MMMM Do")}</div>
              <div>{moment(nextEventDate).format("hA")}</div>
            </div>
          {/* </React.Fragment> : <MainLoader/>} */}
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
              {status ? "Confirmed👏" : "Attend👍"}
            </button>
            <button
              className={
                status === false ? `button-primary ${styles.redBorder}` : ""
              }
              style={{
                fontSize: "1.05em",
                padding: "0 10px",
                background: "rgba(255,255,255, 0.7)"
              }}
              onClick={() => this.handleRejectButton()}
            >
              {status === false ? "Not going" : "I'll pass🙅"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
