class GameJoinedList extends React.Component{

  constructor() {
    super();
    this.state = {
      games:null
    }


  }


  componentDidMount() {
    //---------------
    //  Get the games
    if(this.props.games){
      this.setState({
        games: this.props.games
      })
    } else {
      $.get( "/games", function(data) {
        if(data.user){
          this.setState({
            games: data.games
          })
        }
      }.bind(this))
        .done(function(){

        }.bind(this))
        .fail(function(){
          alert("fail to fetch game data. Problem with the server.");
        })
    }
  }


  render() {
    var self = this;
    if(this.props.games){
      return(
        <section className="game-list-holder instrument left-bound">
          <div id="game-hosting-list-bulletin-holder"></div>
          <h4>Your Games</h4>
          <ul>
            {this.props.games.map(function(curGame){
              return( <li key={curGame.id}> {<GameJoinedParcel handleGameDelete={self.props.handleGameDelete.bind(self)} handleLoadGame={self.props.handleLoadGame.bind(self)} game={curGame} /> } </li> );
            })}
          </ul>
        </section>
      )
    } else {
      return(
        <section className="game-list">
          <h4>No Games Found</h4>
        </section>
      )
    }
  }
  
}