//--------------------------------------------------------------------
// GAME PAGE  --------------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: This is the page that holds all of the elements for
//creating, deleting and navigating between games
//REQUIRED:
//  props.user - The user who is logged in
class GameManagementPage extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {

    //---------------
    //  Get the games
    $.get( "/games", function(data) {
      this.setState({
      	joined: data.joined
      })
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

  handleGameCreate(e){
  	e.preventDefault();
    var messageHolder = document.getElementById('game-management-bulletin-holder');
    $.post( "/games/create", { game: this.state }, function(data) {
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          messageHolder
        );
        if(this.state.bulletin.type != 'error'){
          this.setState({joined: data.joined});
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
    var messageHolder = document.getElementById('game-management-bulletin-holder');
    $.ajax({
      url: deleteURL,
      type: "delete",
      success: function(data){
        //Render the bulletin that the game was created
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          messageHolder
        );
        this.setState({joined: data.joined});
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  handleLoadGame(id){
    ReactDOM.render(
      <GamePlayPage gameId={id} />,
      document.getElementById('app-holder')
    );
  }

  handleJoinRandomGame(e){
    e.preventDefault;

    //---------------
    //  Get the games
    $.get( "/games/join_random_game", function(data) {
      this.setState({
        joined: data.joined,
        joined_games: data.joined_games
      })
    }.bind(this))
      .done(function(){

      }.bind(this))
      .fail(function(){
        alert("fail to fetch game data. Problem with asdfasdfasdfthe server.");
      })
  }

  
  render() {
  	if(this.props.user){
      return (
      	<section className="main-section" id="game-management-section" >
      	  <div id="game-management-bulletin-holder"></div>
          <div id="game-join-random-holder">
            <section>
              <button onClick={this.handleJoinRandomGame.bind(this)}>Join Random Game</button>
            </section>
          </div>
          <div id="game-create-form-holder">
            <GameCreateForm handleGameCreate={this.handleGameCreate.bind(this)} handleGetGameInfo={this.handleGetGameInfo.bind(this)} />
          </div>

          <div id="game-joined-list-holder">
            <GameJoinedList games={this.state.joined} handleLoadGame={this.handleLoadGame.bind(this)} handleGameDelete={this.handleGameDelete.bind(this)} />
          </div>

          <div id="game-joinable-list-holder">
            <GameJoinableList games={this.state.joinable} />
          </div>
        </section>
      )
    } else {
      return (
      	<section className="main-section" id="no-user-section" >
      	  <h1>Please Log In or Register</h1>
      	</section>
      )
    }
  }


}