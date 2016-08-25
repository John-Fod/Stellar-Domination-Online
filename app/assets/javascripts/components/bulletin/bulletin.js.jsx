class Bulletin extends React.Component {





  render() {
    return (
      <div className={this.props.type}>
        <h4>{this.props.title}</h4>
        <ul>
          {this.props.messages.map(function(curMessage){
          	return <li key={curMessage}>{curMessage}</li>
          })}
        </ul>
      </div>
    )
  }
}