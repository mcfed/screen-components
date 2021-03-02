import React, {Component} from 'react';

const NUM_ELEMENT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];

interface INumberScrollerProps {
  data: number | string;
  cellClass?: string;
  dot?: number;
  splitChart?: string;
  splitBit?: number;
  len?: number;
}

interface INumberScrollerState {
  decimal: boolean;
}

export default class NumberScroller extends Component<INumberScrollerProps, INumberScrollerState> {
  constructor(props: INumberScrollerProps) {
    super(props);
  }

  componentDidMount() {
    this.formatOption();
  }

  formatOption() {
    const {data} = this.props;
    this.setState({
      decimal: String(data).indexOf('.') > -1
    });
    this.calcSize();
    this.calcData();
  }

  /**
   * 计算实际位数
   */
  calcSize() {
    const {splitBit, splitChart, data, len} = this.props;
    if (splitBit && splitChart && len) {
      let dotSize = Math.ceil(len / splitBit) - 1;
      return String(data).length + dotSize;
    }
    return String(data).length;
  }

  calcData() {
    const {data, dot} = this.props;
    if (!dot) {
      return data;
    }
    return Number(data).toFixed(dot);
  }

  renderNumRotaryTable() {
    return null;
  }

  renderNumScrollerAtom() {
    const {cellClass = '', splitChart, splitBit} = this.props;
    let numEles = NUM_ELEMENT;
    if (!!splitChart && !!splitBit) {
      numEles = numEles.concat([splitChart])
    }
    return (
      <ul className={`num-cell ${cellClass}`}>
        {numEles.map((num, index) => <li key={index}>{num}</li>)}
      </ul>
    )
  }

  render() {
    return (
      <div className='num-container num-cell-container'>
        {this.renderNumRotaryTable()}
      </div>
    )
  }
};
