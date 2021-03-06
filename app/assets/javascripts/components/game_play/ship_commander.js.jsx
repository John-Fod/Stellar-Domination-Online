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
      <section key={this.props.ship.id} className="ship-commander">
      	<h5>{this.props.ship.frame}</h5>
        <dl>
          <dt>Hull</dt>
            <dd>{this.props.ship.hull_health}</dd>
          <dt>Sheild</dt>
            <dd>{this.props.ship.sheild_health}</dd>
          <dt>Energy</dt>
            <dd>{this.props.ship.energy}</dd>
        </dl>
      </section>
    )
  }

}