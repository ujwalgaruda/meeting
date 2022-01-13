// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isfilterStarred: false}

  onTitleEntry = event => {
    this.setState({title: event.target.value})
  }

  onDateEntry = event => {
    this.setState({date: event.target.value})
  }

  onAddButtonClick = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const appointmentItem = {
      title,
      date: formattedDate,
      isStarred: false,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointmentItem],
      title: '',
      date: '',
    }))
  }

  filterStarred = () => {
    const {isfilterStarred} = this.state
    this.setState({isfilterStarred: !isfilterStarred})
  }

  isStarClick = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  getStarredList = () => {
    const {appointmentList, isfilterStarred} = this.state

    if (isfilterStarred) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, isfilterStarred} = this.state
    const filterStarClassName = isfilterStarred ? 'btn-filled' : ''
    const filteredList = this.getStarredList()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="form-image-container">
            <form className="form" onSubmit={this.onAddButtonClick}>
              <h1 className="header">Schedule Important Meetings</h1>

              <label htmlFor="title" className="title">
                MEEETING TITLE
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="title-input"
                placeholder="Your Meeting with..."
                onChange={this.onTitleEntry}
              />
              <label htmlFor="date" className="date">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={date}
                className="date-input"
                onChange={this.onDateEntry}
              />
              <button className="btn" type="submit">
                Mark the Date
              </button>
            </form>
            <img
              src="./meeting2.svg"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line" />
          <div className="Appointment-title-section">
            <h1 className="sub-header">Your Meetings</h1>
            <button
              className={`filter-button ${filterStarClassName}`}
              type="button"
              onClick={this.filterStarred}
            >
              VIP Meetings
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                details={eachItem}
                isStarClick={this.isStarClick}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
