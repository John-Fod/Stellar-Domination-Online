//--------------------------------------------------------------------
// SELECT SHIPS  -----------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: This is the component for managing a ship's actions
//  in between rounds.
//REQUIRED: A ship
class ShipCommander extends React.Component {

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
      <section key={this.props.ship.id} className="ship-commander left-bound">
        <span>{JSON.stringify(this.props.ship)}</span>
      	<h2>{this.props.ship.frame}</h2>
      </section>
    )
  }

}