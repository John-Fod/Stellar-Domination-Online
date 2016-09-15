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
      game:null
    }
  }

  componentDidMount() {
    var gameURL = "/games/" + this.props.gameId;
    var messageHolder = document.getElementById('game-play-bulletin-holder');
    $.ajax({
      url: gameURL,
      type: "get",
      success: function(data){
        this.setState({
          game: data,
          players: data.players,
          logged_in_player: data.logged_in_player,
          frames: data.frames,
          ships: data.ships
        });
        //IF THE USER MUST SELECT A SHIP FIRST
        if(this.state.game.cur_round == 0){
          ReactDOM.render(
            <SelectShips handleShipFrameChange={this.handleShipFrameChange.bind(this)} handleUpdateShipFrame={this.handleUpdateShipFrame.bind(this)} logged_in_player={this.state.logged_in_player} ships={this.state.logged_in_player.ships} frames={this.state.frames} />,
            document.getElementById("game-play-menu")
          );
          //alert(JSON.stringify(this.state.logged_in_player.ships));
        }
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  handleShipFrameChange(updatedShipId, e){
    var updateShipURL = "/games/" + this.state.game.id + "/ships/" + updatedShipId;
    $.ajax({
      url: updateShipURL,
      type: "put",
      data: {frame: e.target.value},
      success: function(data){
        this.setState({
          game: data,
          players: data.players,
          logged_in_player: data.logged_in_player,
          frames: data.frames,
          ships: data.ships
        });
        //IF THE USER MUST SELECT A SHIP FIRST
        if(this.state.game.cur_round == 0){
          ReactDOM.render(
            <SelectShips handleShipFrameChange={this.handleShipFrameChange.bind(this)} handleUpdateShipFrame={this.handleUpdateShipFrame.bind(this)} logged_in_player={this.state.logged_in_player} ships={this.state.logged_in_player.ships} frames={this.state.frames} />,
            document.getElementById("game-play-menu")
          );
        }
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }


  handleUpdateShipFrame(id){
    var shipUpdateURL = "/ships/" + id;
    $.ajax({
      url: shipUpdateURL,
      type: "put",
      success: function(data){
        alert("SUCCESS");
      }.bind(this),
      fail: function(data){
        alert("Failed to Ready");
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
      }.bind(this),
      fail: function(data){
        alert("Failed to Ready");
      }.bind(this)
    })
  }

  
  render() {

    if(this.state.game){
    return (
      <section id="game-hud-main" className="game-list-holder instrument top-bound">
        <div id="game-play-bulletin-holder"></div>
        <h1>{this.state.game.name} </h1>
        <button onClick={ () => this.handleReady(this.state.game.id)}>I'm Ready</button>
        <dl>
          <dd>Round</dd><dt>{this.state.game.cur_round}</dt>
        </dl>
        <table>
          <tbody>
          <tr>
            <th>Player</th>
            <th>Ready</th>
          </tr>
          {this.state.players.map(function(curPlayer){
            var ready_or_waiting;
            if(curPlayer.ready){
              ready_or_waiting = "Ready";
            } else {
              ready_or_waiting = "Not Ready";
            }
            return(
              <tr key={curPlayer.id}>
                <td >{curPlayer.user.username}</td>
                <td >{ready_or_waiting}</td>
              </tr> );
          })}
          </tbody>
        </table>

        <div id="game-play-menu"></div>
      </section>
    )
    } else {
      return(
        <section></section>
      )
    }
  }

}