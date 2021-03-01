import React, {Component} from 'react';
import moment from 'moment';
import Timer from '../Timer';
// import {formatDate} from '../../utils/common';

const DEFAULT_FORMAT = 'YYY-MM-DD HH:mm:ss';

interface ICurrentTimeProps {
  format: string;
  className?: string;
}

interface ICurrentTimeState {
  timestamp: number | undefined;
  modifyStyle: any;
}

export default class CurrentTime extends Component<ICurrentTimeProps, ICurrentTimeState> {
  static defaultProps = {
    width: 300,
    height: 300
  };

  mounted: boolean;
  autoRefresh: boolean;

  constructor(props: ICurrentTimeProps) {
    super(props);
    this.state = {
      timestamp: undefined,
      modifyStyle: {}
    };
    this.mounted = false;
    this.autoRefresh = true;
  }

  componentDidMount() {
    // const {css} = this.props;
    this.mounted = true;
    this.setState({
      timestamp: new Date().getTime()
    });
  }

  // shouldComponentUpdate(nextProps) {
  //   const {css} = this.props;
  //   const {css: nextCss} = nextProps;
  //   if (JSON.stringify(css) !== JSON.stringify(nextCss)) {
  //     // 根据每次修改的 css 值生成要添加的 css 对象
  //     this.mounted && this.setState({
  //       modifyStyle: cssStringToObject(toCss(nextCss, this.defaultCssValue))
  //     })
  //   }
  //   return true
  // }

  componentWillUnmount() {
    this.mounted = false;
    this.autoRefresh = false;
  }

  handlerTick() {
    this.mounted &&
      this.setState({
        timestamp: new Date().getTime()
      });
  }

  formatDate(time: number | undefined, format: string) {
    if (!time) {
      return null;
    }
    return moment(time).format(format);
  }

  render() {
    const {timestamp, modifyStyle} = this.state;
    const {format = DEFAULT_FORMAT, className} = this.props;
    // const timeStyle = {
    //   textAlign: 'center',
    //   ...modifyStyle,
    //   display: 'inline-block',
    //   lineHeight: `${height}px`,
    //   width,
    //   height
    // }
    return (
      <Timer
        // name={format}
        autoRefresh={this.autoRefresh}
        interval={1 * 1000}
        callback={this.handlerTick.bind(this)}>
        <span className={className} ref='time'>
          {this.formatDate(timestamp, format)}
        </span>
      </Timer>
    );
  }
}
