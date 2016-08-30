class UserRegisterForm extends React.Component {

  constructor() {
    super();
  }



  render() {
    return (
      <section className="user-home-content-menu">
        <h6>Register</h6>
        <form className='user register' onSubmit={this.props.handleRegister}>
          <ul>
            <li>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" onChange={this.props.handleGetRegisterInfo.bind(this)}/>
            </li>
            <li>
              <label htmlFor="email">E-Mail</label>
              <input type="text" name="email" id="email" onChange={this.props.handleGetRegisterInfo.bind(this)}/>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={this.props.handleGetRegisterInfo.bind(this)}/>
            </li>
            <li>
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input type="password" name="password_confirmation" id="password" onChange={this.props.handleGetRegisterInfo.bind(this)}/>
            </li>
            <li>
              <input type="submit" value="Login"/>
            </li>
          </ul>
        </form>
      </section>
    )
  }


}