class GameCreateForm extends React.Component {

  constructor() {
    super();
    this.state = {
    	name: ''
    }
  }

  render() {
    return (
      <form className='game create' onSubmit={this.props.handleCreateGame.bind(this)}>
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
