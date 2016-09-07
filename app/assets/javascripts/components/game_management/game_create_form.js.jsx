class GameCreateForm extends React.Component {

  constructor() {
    super();
    this.state = {
    	name: ''
    }
  }
/*

  handleGetGameInfo(e){
    this.setState( {[e.target.name]: e.target.value});
  }
  handleCreateGame(e){
    e.preventDefault();
    var bulletinHolder = document.getElementById('game-create-form-bulletin-holder');
    var gameHostingListHolder = document.getElementById('game-hosting-list-holder');
    $.post( "/games/create", { game: this.state }, function(data) {
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          bulletinHolder
        );
        ReactDOM.render(
          <GameHostingList games={data.games}/>,
          gameHostingListHolder
        );
    }.bind(this))
      .done(function(){
      }.bind(this))
      .fail(function(){
        alert("fail to create game. Problem with the server.");
      })
  }
*/
  render() {
    return (
      <form className='game create instrument left-bound' onSubmit={this.props.handleGameCreate.bind(this)}>
        <div id="game-create-form-bulletin-holder"></div>
        <h4>New Game</h4>
        <ul>
          <li>
            <label htmlFor="name">Game Name</label>
            <input type="text" name="name" id="name" onChange={this.props.handleGetGameInfo.bind(this)}/>
          </li>
          <li>
            <input type="submit" value="Create Game"/>
          </li>
        </ul>
      </form>
    )
  }


}
