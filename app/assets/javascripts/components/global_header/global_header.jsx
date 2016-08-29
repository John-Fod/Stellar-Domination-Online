class GlobalHeader extends React.Component {


  constructor() {
    super();
    this.state = {
      user: null
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
        document.getElementById('game-menu-holder').innerHTML='';
  	}.bind(this))
  	  .done(function(){
  	  }.bind(this))
  	  .fail(function(){
  	  	alert("fail on logout.");
  	  })
  }

  handleLogin(e){
    e.preventDefault();
    $.post( "/users/login", { credentials: this.state }, function(data) {
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
        alert("failed on login.");
      })
  }

  handleGetLoginInfo(e){
    this.setState( {[e.target.name]: e.target.value});
  }

  
  render() {

    var userHomeContent;
    if(this.state.user){
      userHomeContent = <UserHome handleLogout={this.handleLogout.bind(this)} user={this.state.user} />;
    } else {
      userHomeContent = <UserLoginForm handleLogin={this.handleLogin.bind(this)} handleGetLoginInfo={this.handleGetLoginInfo.bind(this)} />;
    }

    return (
      <ul>
        <li><a href='#'>Stellar Domination</a></li>
        <li id="user-home-content">{ userHomeContent }</li>
      </ul>
    )
  }


}