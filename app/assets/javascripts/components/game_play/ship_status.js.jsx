//--------------------------------------------------------------------
// SELECT SHIPS  -----------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: 
//REQUIRED:
class ShipsStatus extends React.Component {

  constructor() {
    super();
    this.state = {
      frames:null
    }
  }

  componentDidMount() {
  }

  
  render() {
    var self = this

    return (
      <div id="ship-selection-main" className="twelve columns">
        
        <div class="eight columns alpha fleet-status">
        	<h2>Your Fleet</h2>
          <ul className="ship-status" id="user-ship-status">
            {
              this.props.players.curUser.ships.map(function(curShip){
                return(
                  <li key={curShip.id}><ShipCommander ship={curShip}/></li>
                )
              })
            }
          </ul>
        </div>

        <div class="three columns omega fleet-status">
          <ul className="ship-status" id="enemy-ship-status">
            {
              this.props.players.nonUser.map(function(curPlayer){
                return(
                  <li key={curPlayer.id}>
                    <h5>{curPlayer.user.username}</h5>
                    <ul>
                    {
                    	curPlayer.ships.map(function(curShip){
                    	  return(
                    	    <li key={curShip.id}><ShipCommander ship={curShip} enemyShips={this.props} /></li>
                    	  )
                    	})
                    }
                    </ul>
                  </li>
                );
              })
            }
          </ul>
        </div>
      
      </div>
    )
  }

}