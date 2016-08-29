class Bulletin extends React.Component {





  render() {
    return (
      <div className={this.props.bulletin.type}>
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