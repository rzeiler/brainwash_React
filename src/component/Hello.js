import React, {Component} from 'react';
import '../css/hello.min.css';

class Hello extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    var x = document.getElementsByTagName("BODY")[0];
    x.className = "hello show";
  }

  onClick(e) {
    this.props.onStart();
    this.setState({show: false});
    var x = document.getElementsByTagName("BODY")[0];
    x.className = "hello";
  }

  render() {
    return (
      <div>
        {this.props.children}
        <div className="modal">
          <div className="row">
            <div className="header col-xs-6">
              <br/>
            </div>
            <div className="col-xs-6">
              <h1>Welcome to Brainwash MATH</h1>
              <p>Train your brain!</p>
            </div>
            <div className="off-xs-2 col-xs-2">
               <button className="btn" onClick={this.onClick}>Start</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hello;
