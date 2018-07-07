import React, { Component } from "react";
import styles from './styles.css';

export default class UploadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: ["BBQ 🥓"], 
      value: "" 
    };
  }

  add = () => {
    this.setState(prevState => ({ 
      list: [...prevState.list, this.state.value],
      value: ""
    }))
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <div>
        <h2>Lists</h2>
          <label>Add food:</label>
        <div className={styles.form}>
          <div className={styles.input}>
            <input className="u-full-width" type="text" value={this.state.value} onChange={this.handleChange}/>
          </div>
          <button onClick={this.add}>Add</button>
        </div>
        <ul>
          {this.state.list.map((item, i) =>
            <li key={i}>{item}</li>
          )}
        </ul>
      </div>
    );
  }
}
