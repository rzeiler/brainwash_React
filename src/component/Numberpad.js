import React, {Component} from 'react';

class Numberpad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        {
          label: '1',
          value: 1
        }, {
          label: '2',
          value: 2
        }, {
          label: '3',
          value: 3
        }, {
          label: '4',
          value: 4
        }, {
          label: '5',
          value: 5
        }, {
          label: '6',
          value: 6
        }, {
          label: '7',
          value: 7
        }, {
          label: '8',
          value: 8
        }, {
          label: '9',
          value: 9
        }, {
          label: '-',
          value: '-'
        }, {
          label: '0',
          value: 0
        }, {
          label: 'OK',
          value: 'OK'
        }, {
          label: 'CL',
          value: 'CL'
        }
      ]
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  _handleKeyDown(event) {
    var kc = event.keyCode,
      sub = (kc > 95)
        ? 96
        : 48;
    if ((kc >= 96 && kc <= 105) || (kc >= 48 && kc <= 57)) {
      this.props.onClickHandler(event.keyCode - sub);
    }
    //console.log(event.keyCode);
    switch (event.keyCode) {
      case 8:
        /* delete all */
          this.props.onClickHandler('CL');
        break;
      case 13:
          this.props.onClickHandler('OK');
        break;
      case 109:
          this.props.onClickHandler("-");
        break;
      case 189:
          this.props.onClickHandler("-");
        break;
      default:
        /* no*/
        break;
    }
  }

  render() {
    const NumberItems = this.state.numbers.map((key, index) => <NumberItem onClickHandler={this.props.onClickHandler} key={index} label={key.label} value={key.value}/>);
    return (
      <div className="row">
        {NumberItems}
      </div>
    );
  }
}

class NumberItem extends Component {
  render() {
    return (
      <div className='col-xs-2' onClick={this.props.onClickHandler.bind(this, this.props.value)}>
        <div className='pad'>{this.props.label}</div>
      </div>
    );
  }
}

export default Numberpad;
