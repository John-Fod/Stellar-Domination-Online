class GlobalHeader extends React.Component {


  constructor() {
    super();
    this.state = {
      user: null
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
          <UserLoginForm handleLogin={this.handleLogin.bind(this)} handleGetLoginInfo={this.handleGetLoginInfo.bind(this)} />,
          document.getElementById('global-header')
        );
        ReactDOM.render(
          <GameMenu {...this.state} />,
          document.getElementById('game-menu-holder')
        );
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          document.getElementById('main-bulletin-holder')
        );
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
          <UserHome handleLogout={this.handleLogout.bind(this)} {...this.state} />,
          document.getElementById('global-header')
        );
        ReactDOM.render(
          <GameMenu {...this.state} />,
          document.getElementById('game-menu-holder')
        );
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          document.getElementById('main-bulletin-holder')
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
    if(this.props.user){
      userHomeContent = <UserHome handleLogout={this.handleLogout.bind(this)} {...this.props} />;
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