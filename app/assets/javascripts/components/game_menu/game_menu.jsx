class GameMenu extends React.Component {

  constructor() {
    super();
    this.state = {
    }


  }

  componentDidMount() {
    //---------------
    //  Get the games
    $.get( "/games", function(data) {
      if(data.user){
        this.setState({
          games: data.games
        })
      } else {
        document.getElementById('game-menu-holder').innerHTML='';
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

  handleCreateGame(e){
  	e.preventDefault();
    var messageHolder = document.getElementById('game-menu-message-holder');
    messageHolder.innerHTML = "";
    $.post( "/games/create", { game: this.state }, function(data) {
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          messageHolder
        );
        if(this.state.bulletin.type != 'alert'){
          this.setState({games: data.games});
        }
    }.bind(this))
      .done(function(){
      }.bind(this))
      .fail(function(){
        alert("fail to create game. Problem with the server.");
      })
  }

  handleGameDelete(id){
    var deleteURL = "/games/" + id;
    var messageHolder = document.getElementById('game-menu-message-holder');
    messageHolder.innerHTML = "";
    $.ajax({
      url: deleteURL,
      type: "delete",
      success: function(data){
        //Render the message that the game was created
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          messageHolder
        );
        this.setState({games: data.games});
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  
  render() {
    if(this.state.games){
      return (
        <div>
          <div id="game-menu-message-holder"></div>
          <div>
            <GameCreateForm handleGetGameInfo={this.handleGetGameInfo.bind(this)} handleCreateGame={this.handleCreateGame.bind(this)}  />
          </div>
          <div id="game-list-holder">
            <GameList games={this.state.games} handleGameDelete={this.handleGameDelete.bind(this)} />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }


}