//--------------------------------------------------------------------
// SELECT SHIPS  -----------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: 
//REQUIRED:
//  props.frames - The different frames that can be used
class SelectShips extends React.Component {

  constructor() {
    super();
    this.state = {
      frames:null
    }
  }

  componentDidMount() {
    var framesURL = "/ships/frames";
    $.ajax({
      url: framesURL,
      type: "get",
      success: function(data){
      	alert(JSON.stringify(data.frames));
        this.setState({
          frames: data.frames
        });
      }.bind(this),
      fail: function(data){
        alert("Failed");
      }.bind(this)
    })
  }

  
  render() {

    return (
      <section id="ship-selection-main" className="instrument left-bound">
      	<h2>Select Your Ships</h2>
      </section>
    )
  }

}