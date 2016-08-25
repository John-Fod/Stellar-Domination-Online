class GameParcel extends React.Component{

  


  render() {
    return(
      <article className="game-list">
      	<header>
      		<h5>{this.props.name}</h5>
      		<dl>
      		  <dt>Host</dt>
      		    <dd>{this.props.host.username}</dd>
      		</dl>
      	</header>
      </article>

    )
  }
}