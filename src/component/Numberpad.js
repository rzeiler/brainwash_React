import React, {Component} from 'react';

class Numberpad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: this.props.keyData
    };
  }

  onItemClick(key) {
    this.props.onClickHandler(key);
  }

  render() {
    const NumberItems = this.state.numbers.map((key, index) => <NumberItem onClickHandler={this.onItemClick.bind(this, key)} key={index} label={key.label} value={key.value}/>);
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
      <div className='col-xs-2' onClick={this.props.onClickHandler}>
        <div className='pad'>{this.props.label}</div>
      </div>
    );
  }
}

export default Numberpad;
