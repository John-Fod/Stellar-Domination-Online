//--------------------------------------------------------------------
// SHIP OVERVIEW  ----------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: This is the component for managing a ship's actions
//  in between rounds.
//REQUIRED: A ship
class ShipOverview extends React.Component {

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
      <section key={this.props.ship.id} className="ship-overview">
      	<h5>{this.props.ship.frame}</h5>
      </section>
    )
  }

}