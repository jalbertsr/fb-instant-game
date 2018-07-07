import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.css';


export default class Main extends Component {

  state = {
    nextEventDate: 'July 7th',
    nextEventTime: '12:00',
    nextEventName: 'Food charity Barcelona',
    listHere: false,
    list: [
      {
        title: 'food charity August',
        date: 'August 10th',
        id: 1
      },
      {
        title: 'Barbecue',
        date: 'September 8th',
        id: 2
      }
    ]
  }

  renderList = () => {
    const { list } =  this.state;
    const events = list.map(event => {
      return (
        <tr key={event.id}>
          <td>{event.title}</td>
          <td>{event.date}</td>
        </tr>
      )
    })
    return events;
  }

  handleRejectButton = () => {

  }


  render() {
    return (
      <div className={styles.container}>
        <div className={styles.container_card}>
          <div style={{'fontSize': '1.8em'}}>
            {this.state.nextEventName}
          </div>
          <div className={styles.card_time}>
            <div>
              {this.state.nextEventDate}
            </div>
            <div>
              {this.state.nextEventTime}
            </div>
          </div>
          <div className={styles.buttons}>
            <Link to='/lists'>
            <button
              className='button-primary'
              style={{'fontSize': '1.05em'}}
              >
                Attend
              </button>
            </Link>
            <button
              className='button-primary'
              style={{'fontSize': '1.75em', 'padding': '0 10px'}}
              onClick={() => this.handleRejectButton()}
            >
              🙅🏻
            </button>
          </div>
        </div>
        {this.state.listHere && (
          <div className={styles.container_list}>
            <table className='u-full-width' style={{'width': '86vw'}}>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.renderList()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}
