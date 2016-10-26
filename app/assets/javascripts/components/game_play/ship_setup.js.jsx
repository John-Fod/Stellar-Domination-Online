//--------------------------------------------------------------------
// SELECT SHIPS  -----------------------------------------------------
//--------------------------------------------------------------------
//DESCRIPTION: 
//REQUIRED:
//  props.frames - The different frames that can be used
class ShipSetup extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    var framesURL = "/ships/frames";
    $.ajax({
      url: framesURL,
      type: "get",
      success: function(data){
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
    var self = this
    var frames = [];
    for (var frame in this.props.frames){
      frames.push(frame);
    }

    return (
      <section id="ship-selection-main" className="instrument left-bound">
      	<h2>Select Your Ships</h2>
        <ul>
          {
            this.props.ships.map(function(curShip){
              return(
                <li key={curShip.id}>
                  <h5>{curShip.frame} - {curShip.id}</h5>
                  <form id={"ship_" + curShip.id} >
                    <select onChange={ (e) => self.props.handleShipFrameChange(curShip.id, e) } value={curShip.frame} id={"ship_frame_" + curShip.id} name={"ship_frame_" + curShip.id} htmlFor={"ship_" + curShip.id} >
                      {
                        frames.map(function(curFrame){
                          return(
                            <option key={curShip.id + curFrame} value={curFrame}>{curFrame}</option>
                          )
                        })
                      }
                    </select>
                  </form>
                </li>
              );
            })
          }
        </ul>
      </section>
    )
  }

}