class GameParcel extends React.Component{

  handleDeleteClick(id){
    this.props.handleGameDelete(id);
  }


  render() {
    return(
      <article className="game parcel">
      	<header>
      		<h5>{this.props.game.name}</h5>
      		<dl>
      		  <dt>Host</dt>
      		    <dd>{this.props.game.host.username}</dd>
      		</dl>
      	</header>

        <div>
          <button className="delete" onClick={ () => this.handleDeleteClick(this.props.game.id)} >Delete</button>
        </div>
      </article>

    )
  }
}