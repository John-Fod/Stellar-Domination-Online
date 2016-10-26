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
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this),
      complete: function(data){
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
          game: data
        });
      }.bind(this),
      fail: function(data){
        alert("Failed to Ready");
      }.bind(this)
    })
  }

  
  render() {

    if(this.state.game){
      //-- Decide which UI the game should show
      if(this.state.game.info.cur_round == 0){
        gameUI = <ShipSetup ships={this.state.game.players.curUser.ships} frames={this.state.game.info.frames} handleShipFrameChange={this.handleShipFrameChange.bind(this)} />
      } else {
        gameUI = <ShipsStatus players={this.state.game.players} />
      }
      return (
        <section id="game-hud-main" className="game-list-holder">
          <div className="row" id="game-play-bulletin-holder"></div>
          <div className="row" id="game-status-main-holder"><GameStatus gameStatus={this.state.game} handleReady={this.handleReady.bind(this)}/></div>
          <div className="row" id="game-play-main-holder">{gameUI}</div>
          <div className="row" id="game-play-menu"></div>
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