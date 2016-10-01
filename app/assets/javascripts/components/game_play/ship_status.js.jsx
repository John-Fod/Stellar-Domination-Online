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
      <section id="ship-selection-main" className="instrument left-bound">
      	<h2>Ships</h2>
        <ul>
          {
            this.props.players.map(function(curPlayer){
              return(
                <li key={curPlayer.id}>
                  <h5>{curPlayer.user.username}</h5>
                  <ul>
                  {
                  	curPlayer.ships.map(function(curShip){
                  	  return(
                  	    <li><ShipCommander ship={curShip} enemyShips={this.props} /></li>
                  	  )
                  	})
                  }
                  </ul>
                </li>
              );
            })
          }



        </ul>
      </section>
    )
  }

}