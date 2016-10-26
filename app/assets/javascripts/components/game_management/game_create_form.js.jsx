class GameCreateForm extends React.Component {

  constructor() {
    super();
    this.state = {
    	name: ''
    }
  }

  render() {
    return (
      <div id="new-game-form-holder" className="form-holder">
        <form className='game create instrument' onSubmit={this.props.handleGameCreate.bind(this)}>
          <div id="game-create-form-bulletin-holder"></div>
          <h4>New Game</h4>
          <ul>
            <li>
              <label htmlFor="name">Game Name</label>
              <input type="text" name="name" id="name" required placeholder="Name" onChange={this.props.handleGetGameInfo.bind(this)}/>
            </li>
            <li>
              <input type="submit" value="Create Game"/>
            </li>
          </ul>
        </form>
      </div>
    )
  }


}
