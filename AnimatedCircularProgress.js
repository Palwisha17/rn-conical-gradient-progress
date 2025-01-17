import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Animated} from 'react-native';
import CircularProgress from './CircularProgress';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0),
    };
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    Animated.spring(this.state.chartFillAnimation, {
      toValue: this.props.fill,
      tension,
      friction,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return <AnimatedProgress {...other} fill={this.state.chartFillAnimation} />;
  }
}

AnimatedCircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  beginColor: PropTypes.string,
  endColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number,
};

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10,
};
