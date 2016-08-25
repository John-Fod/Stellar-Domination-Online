class GameList extends React.Component{

  


  render() {
    //alert(JSON.stringify(this.props));
    return(
      <section className="game-list">

        <h4>Your Games</h4>
        <ul>
          {this.props.games.map(function(curGame){
            var curParcel = <GameParcel key={curGame.id} {...curGame}/> ;
            React.DOM.li;
            return( <li> {curParcel} </li> );
          })}
        </ul>
      </section>

    )
  }
}