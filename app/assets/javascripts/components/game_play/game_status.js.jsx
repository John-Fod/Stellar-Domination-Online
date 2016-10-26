//--------------------------------------------------------------------
// GAME SHIPS  -------------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: 
//REQUIRED:
class GameStatus extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
  }

  
  render() {
    var self = this

    //Determine if the user is ready or not
    if(this.props.gameStatus.players.curUser.ready){
      var readyStatus = <span>Waiting</span>
    }else {
      var readyStatus = <button onClick={ () => this.props.handleReady(this.props.gameStatus.info.id)}>I'm Ready</button>
    }

    return (
      <section className="row game-status-main">
        <div className="four columns">
          <h2>{this.props.gameStatus.info.name}</h2>
          <dl>
            <dt>Host</dt>
              <dd>{this.props.gameStatus.info.host.username}</dd>
            <dt>Round</dt>
              <dd>{this.props.gameStatus.info.cur_round}</dd>
          </dl>
        </div>

        <div className="eight columns">
          <ul className="players-status-list">
            <li className="current-user-player">
              <div>
                <h5>{this.props.gameStatus.players.curUser.user.username}</h5>
                {readyStatus}
              </div>
            </li>
            {
              this.props.gameStatus.players.nonUser.map(function(curUser){
                return(
                  <li key={curUser.id}>
                    <div>
                      <h5>{curUser.user.username}</h5>
                      <span>{curUser.ready ? 'Ready' : 'Not Ready'}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </section>
    )
  }

}