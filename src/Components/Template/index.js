import React from "react";
import styles from "./styles.css";
import moment from "moment";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

class Template extends React.Component {
  state = {
    name: "",
    eventName: {
      name: "",
      placeholder: "Create your food event",
      edit: true,
      question: "How do you want to call it?"
    },
    time: moment().format(),
    eventTime: {
      time: "",
      edit: false,
      question: "When is it happening?"
    }
  };

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.history.push({
      pathname: "/template-list",
      state: {
        name: this.state.name,
        time: this.state.time,
        userData: this.props.history.location.state.userData
      }
    });
  };

  renderInput = () => {
    if (this.state.eventName.edit) {
      return (
        <div className={styles.wrapper_input}>
          <div className={styles.input_name}>
            <input
              type="text"
              onChange={this.handleChanges}
              name="name"
              value={this.state.name}
            />
          </div>
          <div className={styles.button}>
            <button
              onClick={() =>
                this.setState(prevState => {
                  return {
                    eventName: {
                      name: "",
                      placeholder: "Create your food event",
                      edit: false,
                      question: "how do you want to call it?"
                    },
                    eventTime: {
                      time: "",
                      edit: true,
                      question: "When is it happening?"
                    }
                  };
                })
              }
            >
              ➡
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper_input}>
          <div className={styles.time}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              onChange={this.handleChanges}
              name="time"
            />
          </div>
          <div className={styles.button}>
            <button
              onClick={() =>
                this.setState(prevState => {
                  return {
                    eventName: {
                      name: "",
                      placeholder: "Create your food event",
                      edit: true,
                      question: "How do you want to call it?"
                    },
                    eventTime: {
                      time: "",
                      edit: false,
                      question: "When is it happening?"
                    }
                  };
                })
              }
            >
              ⬅
            </button>
          </div>
          <div className={styles.button_create}>
            <button onClick={this.handleSubmit}>Create</button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {this.state.eventName.edit
            ? this.state.eventName.placeholder
            : this.state.name}
        </div>
        <div className={styles.wrapper_question}>
          {this.state.eventName.edit
            ? this.state.eventName.question
            : this.state.eventTime.question}
        </div>
        {this.renderInput()}
      </div>
    );
  }
}

export default withRouter(Template);
