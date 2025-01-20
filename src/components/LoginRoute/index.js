import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {userID: '', userPIN: '', errorMessage: ''}

  onChangeUserID = event => {
    this.setState({userID: event.target.value})
  }

  onChangeUserPIN = event => {
    this.setState({userPIN: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userPIN, userID} = this.state
    const userData = {user_id: userID, pin: userPIN}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok) {
      this.successfullySubmit(data.jwt_token)
    } else {
      this.setState({errorMessage: data.error_msg})
    }
  }

  successfullySubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderLoginError = () => {
    const {errorMessage} = this.state
    return (
      <>
        {errorMessage.length > 0 ? (
          <p className="error">{errorMessage}</p>
        ) : null}
      </>
    )
  }

  render() {
    const {userID, userPIN} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-login-container">
        <div className="login-container">
          <div className="login-left-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              className="login-img"
              alt="website login"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="input-container">
              <label className="input-label" htmlFor="UserID">
                User ID
              </label>
              <input
                type="text"
                id="UserID"
                className="input"
                value={userID}
                placeholder="Enter User ID"
                onChange={this.onChangeUserID}
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="userPIN">
                PIN
              </label>
              <input
                type="password"
                id="userPIN"
                className="input"
                value={userPIN}
                placeholder="Enter PIN"
                onChange={this.onChangeUserPIN}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {this.renderLoginError()}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginRoute
