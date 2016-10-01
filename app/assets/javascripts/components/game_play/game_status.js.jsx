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

    return (
      <section id="game-status-main" className="instrument">
      	<h2>{this.props.gameStatus.name}</h2> 
      </section>
    )
  }

}