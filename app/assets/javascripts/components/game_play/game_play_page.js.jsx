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

        alert(JSON.stringify(logged_in_player_ships));
          ReactDOM.render(
            <SelectShips logged_in_player={this.state.logged_in_player} ships={this.state.logged_in_player.ships} frames={this.state.frames} />,
            document.getElementById("game-play-menu")
          );
        }
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
            return(
              <tr key={curPlayer.id}>
                <td >{curPlayer.user.username}</td>
                <td >{curPlayer.ready.toString}</td>
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