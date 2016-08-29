class GameList extends React.Component{

  


  render() {
    var self = this;
    return(
      <section className="game-list">

        <h4>Your Games</h4>
        <ul>
          {this.props.games.map(function(curGame){
            return( <li key={curGame.id}> {<GameParcel handleGameDelete={self.props.handleGameDelete.bind(this)} game={curGame} /> } </li> );
          })}
        </ul>
      </section>

    )
  }
}