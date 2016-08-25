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
        this.setState({message: data});
        if(this.state.message.type == 'alert'){
          ReactDOM.render(
            <Bulletin {...this.state.message} />, messageHolder
          );
        }else{
          //Render the message that the game was created
          ReactDOM.render(
            <Bulletin {...this.state.message} />, messageHolder
          );
          //Render the GameList again, this time with the new game
          var newGames = this.props.games.slice()
          newGames.push(data.game);
          this.setState({games: newGames});
          ReactDOM.render(
            <GameList {...this.state} />, document.getElementById('game-list-holder')
          );
        }
    }.bind(this))
      .done(function(){
      }.bind(this))
      .fail(function(){
        alert("fail to create game. Problem with the server.");
      })
  }

  
  render() {
    if(this.props.games){
      return (
        <div>
          <div id="game-menu-message-holder"></div>
          <div>
            <GameCreateForm handleGetGameInfo={this.handleGetGameInfo.bind(this)} handleCreateGame={this.handleCreateGame.bind(this)} />
          </div>
          <div id="game-list-holder">
            <GameList {...this.props}/>
          </div>
        


        </div>
      )
    } else {
      <div>

      </div>
    }
  }


}