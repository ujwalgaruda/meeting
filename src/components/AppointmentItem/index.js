// Write your code here
import './index.css'

const emptyStarImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const filledStarImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {details, isStarClick} = props
  const {id, title, date, isStarred} = details

  const starImageDecider = isStarred ? filledStarImg : emptyStarImg

  const onStarButtonClick = () => {
    isStarClick(id)
  }

  return (
    <li className="list-item">
      <div className="title-star-container">
        <p className="card-title">{title}</p>
        <button
          className="star-button"
          type="button"
          onClick={onStarButtonClick}
          testid="star"
        >
          <img src={starImageDecider} alt="star" className="star-icon" />
        </button>
      </div>
      <p className="card-date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
