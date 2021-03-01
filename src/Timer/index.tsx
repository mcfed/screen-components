import React, {Component} from 'react';

const DEFAULT_INTERVAL = 30 * 1000;

interface ITimerProps {
  autoRefresh: boolean;
  interval: number;
  children: any;
  callback?: Function;
}

export default class Interval extends Component<ITimerProps, {}> {

  timerId: NodeJS.Timeout | null;
  mounted: boolean;

  constructor(props: ITimerProps) {
    super(props);
    this.timerId = null;
    this.mounted = false;
  }

  componentDidMount() {
    const {autoRefresh, interval} = this.props;
    // console.log('1111 timer mounted');
    // 判断组件是否需要添加轮询计时
    this.startTick(autoRefresh, interval);
  }

  startTick(start: boolean, interval: number) {
    const {callback} = this.props;
    if (start && !!interval && callback) {
      this.simulateInterval(callback, interval);
    }
  }

  componentWillReceiveProps(nextProps: ITimerProps) {
    const {autoRefresh} = this.props;
    const {autoRefresh: nAutoRefresh, interval: nInterval} = nextProps;
    if (autoRefresh !== nAutoRefresh) {
      this.timerId && this.clearSimulateInterval(this.timerId);
      if (nAutoRefresh) {
        this.startTick(nAutoRefresh, nInterval);
      }
    }
  }

  simulateInterval(callback: Function, interval: number) {
    !interval && (interval = DEFAULT_INTERVAL);
    let starTimerId: any = null;
    const fn = () => {
      const preTimerId = this.timerId;
      // do somthing ...
      callback && callback();
      this.timerId = setTimeout(fn.bind(this), interval);
      // console.log('~~~~~~~~~~~~~', name, '@@@', this.timerId);
      preTimerId && clearTimeout(preTimerId);
      if (starTimerId) {
        clearTimeout(starTimerId);
        starTimerId = null;
      }
    }
    starTimerId = setTimeout(fn.bind(this), interval);
    // return starTimerId;
  }

  clearSimulateInterval(timerId: NodeJS.Timeout) {
    if (timerId) {
      // console.log('clear timerId', this.timerId);
      clearTimeout(timerId);
    }
  }

  componentWillUnmount() {
    this.timerId && this.clearSimulateInterval(this.timerId);
  }

  render() {
    const {children} = this.props;
    return children;
  }
}
