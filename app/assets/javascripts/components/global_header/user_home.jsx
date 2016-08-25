class UserHome extends React.Component {

  constructor() {
    super();
  }


  render() {
    return (
      <ul>
        <li>{this.props.user.username}</li>
        <li>
          <button id='logout-button' className='user management' onClick={this.props.handleLogout}>Logout</button>
        </li>
      </ul>
    )
  }


}