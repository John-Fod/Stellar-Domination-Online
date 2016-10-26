class GameJoinedParcel extends React.Component{

  render() {
    return(
      <article className="game parcel">
      	<header>
      		<h5>{this.props.game.name}</h5>
      		<dl>
      		  <dt>Host</dt>
      		    <dd>{this.props.game.host.username}</dd>
            <dt>Round</dt>
              <dd>{this.props.game.cur_round}</dd>
      		</dl>
      	</header>

        <div className="button-holder">
          <button className="join go" onClick= { () => this.props.handleLoadGame(this.props.game.id)} >Play</button>
          <button className="delete" onClick={ () => this.props.handleGameDelete(this.props.game.id)} >Delete</button>
        </div>
      </article>

    )
  }
}