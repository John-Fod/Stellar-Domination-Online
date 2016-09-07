class Bulletin extends React.Component {

  constructor() {
    super();
    this.state = {
      show: true
    }
  }

  componentDidMount() {
    this.setState({show:true});
  }

  toggleBulletin(e){
    e.preventDefault()
    if(this.state.show == true){
      this.setState({show:false})
    } else {
      this.setState({show:true})
    }
  }


  render() {
    if(this.state.show==true){
      return (
        <div className={this.props.bulletin.type}>
          <button onClick={this.toggleBulletin.bind(this)}>Got It</button>
          <h4>{this.props.bulletin.title}</h4>
          <ul>
            {this.props.bulletin.messages.map(function(curMessage){
          	  return <li key={curMessage}>{curMessage}</li>
            })}
          </ul>
        </div>
    )} else {
      return (
        <button onClick={this.toggleBulletin.bind(this)}>Bulletin</button>
      )
    }
  }
}