class UserHome extends React.Component {

  constructor() {
    super();
  }


  render() {
    return (
      <section class="user-home-content-menu">
        <h6>{this.props.user.username}</h6>
        <ul>
          <li>Settings</li>
          <li>
            <button id='logout-button' className='user management' onClick={this.props.handleLogout}>Logout</button>
          </li>
        </ul>
      </section>
    )
  }


}