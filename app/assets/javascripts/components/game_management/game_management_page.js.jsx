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
    var formHolder = $(e.target).closest(".form-holder");
    var form = $(e.target).closest("form");

    $.ajax({
      type: "post",
      url: '/games/create',
      data: {game: this.state},
      beforeSend: function(){
        formHolder.hide();
      }.bind(this),
      complete: function(){
        formHolder.show();
      }.bind(this),
      success: function(data){
        //Reset the form
        form.trigger("reset");
        //Set the state of the bulletin and post it
        this.setState({bulletin: data.bulletin});
        ReactDOM.render(
          <Bulletin bulletin={this.state.bulletin} />,
          messageHolder
        );
        //If it is not an error, let the user know they joined
        if(this.state.bulletin.type != 'error'){
          this.setState({joined: data.joined});
        }
      }.bind(this),
      fail: function(data){
        alert("You Failed!");
      }.bind(this)

    });
    /*
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
    */
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
      <GamePlayPage gameId={id} pollInterval={3000} />,
      document.getElementById('app-holder')
    );
  }

  handleJoinRandomGame(e){
    e.preventDefault;
    var messageHolder = document.getElementById('game-management-bulletin-holder');

    //---------------
    //  Get the games
    $.get( "/games/join_random_game", function(data) {
      this.setState({
        joined: data.joined,
        joined_games: data.joined_games,
        bulletin: data.bulletin
      })
      ReactDOM.render(
        <Bulletin bulletin={this.state.bulletin} />,
        messageHolder
      );
    }.bind(this))
      .done(function(){

      }.bind(this))
      .fail(function(){
        alert("fail to fetch game data. Problem with the server.");
      })
  }

  
  render() {
  	if(this.props.user){
      return (
        <div>
          <div className="row" className="main-section" id="game-management-section" >
            <div className="twelve columns" id="game-management-bulletin-holder"></div>
          </div>

          <div className="row">
            <div className="six columns" id="game-joined-list-holder">
              <GameJoinedList games={this.state.joined} handleLoadGame={this.handleLoadGame.bind(this)} handleGameDelete={this.handleGameDelete.bind(this)} />
            </div>

            <div className="six columns">
              <button onClick={this.handleJoinRandomGame.bind(this)}>Join Random Game</button>
              <GameCreateForm handleGameCreate={this.handleGameCreate.bind(this)} handleGetGameInfo={this.handleGetGameInfo.bind(this)} />
            </div>

          </div>
        </div>
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