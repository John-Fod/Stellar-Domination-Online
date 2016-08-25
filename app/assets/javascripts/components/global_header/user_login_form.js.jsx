class UserLoginForm extends React.Component {

  constructor() {
    super();
  }



  render() {
    return (
      <form className='user login' onSubmit={this.props.handleLogin}>
        <ul>
          <li>
            <label htmlFor="identification">Identification</label>
            <input type="text" name="identification" id="identification" onChange={this.props.handleGetLoginInfo.bind(this)}/>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.props.handleGetLoginInfo.bind(this)}/>
          </li>
          <li>
            <input type="submit" value="Login"/>
          </li>
        </ul>
      </form>
    )
  }


}
