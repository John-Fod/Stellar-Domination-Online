//--------------------------------------------------------------------
// GAME PLAY PAGE  ---------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: This is the page the user will interact with durring
//gameplay.
//REQUIRED:
//  props.game - The game being played
class GamePlayPage extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    this.loadGameState(this.props.gameId);
  }


  loadGameState(gameId){
    var gameURL = "/games/" + gameId;
    var messageHolder = document.getElementById('game-play-bulletin-holder');
    $.ajax({
      url: gameURL,
      type: "get",
      success: function(data){
        this.setState({
          game: data
        });
        //SHOW THE GAME STATUS
        /*
        ReactDOM.render(
          <GameStatus gameStatus={this.state.game}/>,
          document.getElementById("game-status-main-holder")
        );
        //IF THE USER MUST SELECT A SHIP FIRST
        if(this.state.game.info.started == false){
          ReactDOM.render(
            <ShipSetup ships={this.state.game.players.curUser.ships} frames={this.state.game.info.frames} handleShipFrameChange={this.handleShipFrameChange.bind(this)} />,
            document.getElementById("game-play-main-holder")
          );
        } else {
          ReactDOM.render(
            <ShipsStatus players={this.state.game.players} />,
            document.getElementById("game-play-main-holder")
          )
        }
        */
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  renderGameState(){

  }

  handleShipFrameChange(updatedShipId, e){
    var updateShipURL = "/games/" + this.state.game.info.id + "/ships/" + updatedShipId;
    $.ajax({
      url: updateShipURL,
      type: "put",
      data: {frame: e.target.value},
      success: function(data){
        this.setState({
          game: data
        });
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  handleReady(id){
    var gameReadyURL = "/games/" + id + "/declare_ready";
    $.ajax({
      url: gameReadyURL,
      type: "get",
      success: function(data){
        this.setState({
          game: data.game,
          players: data.players
        });
        //If the game hasn't started, select ships
        if(this.state.game.started == false){
          ReactDOM.render(
            <SelectShips handleShipFrameChange={this.handleShipFrameChange.bind(this)} logged_in_player={this.state.logged_in_player} ships={this.state.logged_in_player.ships} frames={this.state.frames} />,
            document.getElementById("game-play-menu")
          );
        }
      }.bind(this),
      fail: function(data){
        alert("Failed to Ready");
      }.bind(this)
    })
  }

  
  render() {
    if(this.state.game){
      //-- Decide which UI the game should show
      if(this.state.game.info.started == false){
        gameUI = <ShipSetup ships={this.state.game.players.curUser.ships} frames={this.state.game.info.frames} handleShipFrameChange={this.handleShipFrameChange.bind(this)} />
      } else {
        gameUI = <ShipsStatus players={this.state.game.players} />
      }
      return (
        <section id="game-hud-main" className="game-list-holder instrument top-bound">
          <div id="game-play-bulletin-holder"></div>
          <div id="game-status-main-holder"><GameStatus gameStatus={this.state.game} handleReady={this.handleReady}/></div>
          <div id="game-play-main-holder">{gameUI}</div>
          <button onClick={ () => this.handleReady(this.state.game.id)}>I'm Ready</button>
          <div id="game-play-menu"></div>
          <div> </div>
        </section>
      );

    } else {
      return(
        <section></section>
      );
    }

  }

}