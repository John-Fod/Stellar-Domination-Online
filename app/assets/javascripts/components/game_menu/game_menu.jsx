class GameMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      fds: "what"
    }

  }


  handleGetGameInfo(e){
    this.setState( {[e.target.name]: e.target.value});
  }

  handleCreateGame(e){
  	e.preventDefault();
    var messageHolder = document.getElementById('game-menu-message-holder');
    messageHolder.innerHTML = "";
    $.post( "/games/create", { game: this.state }, function(data) {
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          messageHolder
        );          
        if(this.state.bulletin.type != 'alert'){
          //Render the GameList again, this time with the new game
          var newGames = this.props.games.slice()
          newGames.push(data.game);
          this.setState({games: newGames});
          ReactDOM.render(
            <GameList handleGameDelete={this.handleGameDelete.bind(this)} games={this.state.games} />,
            document.getElementById('game-list-holder')
          );
        }
    }.bind(this))
      .done(function(){
      }.bind(this))
      .fail(function(){
        alert("fail to create game. Problem with the server.");
      })
  }

  handleGameDelete(id){
    var deleteURL = "/games/" + id;
    var messageHolder = document.getElementById('game-menu-message-holder');
    messageHolder.innerHTML = "";
    $.ajax({
      url: deleteURL,
      type: "delete",
      success: function(data){
          //Render the message that the game was created
          this.setState({bulletin: data.bulletin});
          ReactDOM.render(
            <Bulletin bulletin={this.state.bulletin} />,
            messageHolder
          );
          this.setState({games: data.games});
          ReactDOM.render(
            <GameList handleGameDelete={this.handleGameDelete.bind(this)} games={this.state.games} />, 
            document.getElementById('game-list-holder')
          );

      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  
  render() {
    if(this.props.games){
      return (
        <div>
          <div id="game-menu-message-holder"></div>
          <div>
            <GameCreateForm handleGetGameInfo={this.handleGetGameInfo.bind(this)} handleCreateGame={this.handleCreateGame.bind(this)}  />
          </div>
          <div id="game-list-holder">
            <GameList games={this.props.games} handleGameDelete={this.handleGameDelete.bind(this)} />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }


}