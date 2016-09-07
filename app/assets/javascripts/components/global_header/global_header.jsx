class GlobalHeader extends React.Component {


  constructor() {
    super();
    //Set up for a new user registration
    var new_user = {};
    new_user.username = '';
    new_user.email = '';
    new_user.password = '';
    new_user.password_confirmation = '';
    //Set up for user log in
    var logging_in_user = {};
    logging_in_user.identification = '';
    logging_in_user.password = '';

    this.state = {
      user: null,
      new_user: new_user,
      logging_in_user: logging_in_user
    }

  }

  componentDidMount() {
    if(this.props.user){
      this.setState({
        user: this.props.user
      })
    }
  }


  handleLogout(e){
  	e.preventDefault();
  	$.post( "/users/logout", function(data) {
        this.setState({
          user: null,
          games: null,
          bulletin: data.bulletin
        });
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          document.getElementById('main-bulletin-holder')
        );
        document.getElementById('app-holder').innerHTML='';
  	}.bind(this))
  	  .done(function(){
  	  }.bind(this))
  	  .fail(function(){
  	  	alert("fail on logout.");
  	  })
  }

  handleLogin(e){
    e.preventDefault();
    $.post( "/users/login", { credentials: this.state.logging_in_user }, function(data) {
        this.setState({
          user: data.user,
          games: data.games,
          bulletin: data.bulletin
        });
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          document.getElementById('main-bulletin-holder')
        );
        ReactDOM.render(
          <GameManagementPage user={data.user} />,
          document.getElementById('app-holder')
        );
    }.bind(this))
      .done(function(){
      }.bind(this))
      .fail(function(){
        alert("failed on login.");
      })
  }

  handleRegister(e){
    e.preventDefault();
    $.post( "/users/create", { user: this.state.new_user }, function(data) {
        this.setState({
          user: data.user,
          games: data.games,
          bulletin: data.bulletin
        });
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          document.getElementById('main-bulletin-holder')
        );
        ReactDOM.render(
          <GameMenu />,
          document.getElementById('game-menu-holder')
        );
    }.bind(this))
      .done(function(){
      }.bind(this))
      .fail(function(){
        alert("failed on register.");
      })
  }

  handleGetLoginInfo(e){
    var logging_in_user = this.state.logging_in_user;
    logging_in_user[e.target.name] = e.target.value;
    this.setState({ logging_in_user: logging_in_user});
  }

  handleGetRegisterInfo(e){
    var new_user = this.state.new_user;
    new_user[e.target.name] = e.target.value;
    this.setState({ new_user: new_user});
  }

  
  render() {

    var userHomeContent;
    if(this.state.user){
      return (
        <ul>
          <li><a href='#'>Stellar Domination</a></li>
          <li className="user-home-content"><UserHome handleLogout={this.handleLogout.bind(this)} user={this.state.user} /></li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li><a href='#'>Stellar Domination</a></li>
          <li id="user-login" className="user-home-content"><UserLoginForm handleLogin={this.handleLogin.bind(this)} handleGetLoginInfo={this.handleGetLoginInfo.bind(this)} /></li>
          <li id="user-register" className="user-home-content"><UserRegisterForm handleRegister={this.handleRegister.bind(this)} handleGetRegisterInfo={this.handleGetRegisterInfo.bind(this)} /></li>
        </ul>
      )
    }
  }


}