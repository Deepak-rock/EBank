import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const HomeRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="home-container">
      <div className="responsive-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className=""
          />
          <button className="logout" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
        <div className="home-content">
          <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card-img"
          />
        </div>
      </div>
    </div>
  )
}
export default HomeRoute
