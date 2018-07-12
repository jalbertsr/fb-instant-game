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
      // nextEventDate: "",
      listHere: false,
      // status: null,
      // groupName: "",
      nextEventDate: '2018-07-11T17:16',
      status: null,
      groupName: 'Barbecue'
    };
    this.userData = {};
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     axios("https://food-society.herokuapp.com/api/instant-game/get-cache/")
  //       .then(res => res.data)
  //       .then(res => {
  //         const { group_id, user_id } = res;
  //         this.userData = { group_id, user_id };
  //
  //         axios(
  //           `https://food-society.herokuapp.com/api/instant-game/get-status/${group_id}/${user_id}/`
  //         )
  //           .then(res => res.data)
  //           .then(res => {
  //             this.setState({
  //               nextEventDate: res.next_event_timestamp,
  //               status: res.user_attendance,
  //               groupName: res.group_name
  //             })
  //           })
  //           .catch(err => {
  //             this.props.history.push({
  //               pathname: '/template',
  //               state: { userData: res }
  //             })
  //           })
  //         })
  //   }, 2000);
  // }


  // handleRejectButton = () => {
  //   const { group_id, user_id } = this.userData;
  //
  //   const data = {
  //     group_id,
  //     user_id,
  //     user_attendance: false
  //   };
  //
  //   fetch(
  //     `https://food-society.herokuapp.com/api/instant-game/update-status/`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8"
  //       },
  //       body: JSON.stringify(data)
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({ status: false });
  //     })
  //     .catch(error => console.error(`Fetch Error =\n`, error));
  // };

  render() {
    const { nextEventDate, status, groupName } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.container_card}>
          {/* {nextEventDate && groupName ?
          <React.Fragment> */}
            <div className={styles.title}>{groupName}</div>
              <img className={styles.main_image} alt='food' src='https://images.unsplash.com/photo-1459314079206-9970f36c7784?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=29c98f7a81a12658017b7ff79c11f23b&auto=format&fit=crop&w=1050&q=80'>
              </img>
            <div className={styles.card_time}>
              <div className={styles.date}>{moment(nextEventDate).format("MMMM D")}</div>
              <div className={styles.time}>{moment(nextEventDate).format("h:mm A")}</div>
            </div>
          {/* </React.Fragment> : <MainLoader/>} */}
          <div className={styles.buttons}>
            <button
              className={styles.button_green}
              onClick={() =>
                this.props.history.push({
                  pathname: "/lists",
                  userData: this.userData
                })
              }
            >
              {status ? "Confirmed" : "Going"}
            </button>
            <button
              className={styles.button_red}
              onClick={() => this.handleRejectButton()}
            >
              {status === false ? "Not going" : "I'll pass"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
