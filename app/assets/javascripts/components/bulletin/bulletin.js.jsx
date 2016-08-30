class Bulletin extends React.Component {


  removeBulletin(e){
    e.preventDefault();
    alert("YOU clicked it");
  }


  render() {
    return (
      <div className={this.props.bulletin.type}>
        <button onClick={this.removeBulletin}>Got It</button>
        <h4>{this.props.bulletin.title}</h4>
        <ul>
          {this.props.bulletin.messages.map(function(curMessage){
          	return <li key={curMessage}>{curMessage}</li>
          })}
        </ul>
      </div>
    )
  }
}