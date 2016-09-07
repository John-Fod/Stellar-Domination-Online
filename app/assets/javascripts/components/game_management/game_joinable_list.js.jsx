class GameJoinableList extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    //---------------
    //  Get the games
    $.get( "/games/joinable", function(data) {
      if(data.joinable){
        this.setState({
          joinable: data.joinable
        })
      } else {
        this.setState({
          joinable: null
        })
      }
    }.bind(this))
      .done(function(){

      }.bind(this))
      .fail(function(){
        alert("fail to fetch game data. Problem with the server.");
      })
  }


  handleGetGameInfo(e){
    this.setState( {[e.target.name]: e.target.value});
  }

  
  render() {
    if(this.state.joinable){
      return (
        <div id="joinable-games-list-holder" className="game-list-holder instrument left-bound">
          <h4>Joinable Games</h4>
          <ul>
            {this.state.joinable.map(function(curGame){
              return( <li key={curGame.id}> {<GameJoinableParcel game={curGame} /> } </li> );
            })}
          </ul>
        </div>
      )
    } else {
      return (
      	<div>HI, no joinable games</div>
      )
    }
  }


}