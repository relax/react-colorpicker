'use strict';

var React = require('react');

var clamp = require('../util/clamp');

var DraggableMixin = {

  propTypes: {
    max: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      max: 1
    };
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  componentDidMount: function () {
    document.addEventListener('mousemove', this.handleUpdate);
    document.addEventListener('mouseup', this.stopUpdates);
  },

  componentWillUnmount: function () {
    document.removeEventListener('mousemove', this.handleUpdate);
    document.removeEventListener('mouseup', this.stopUpdates);
  },

  startUpdates: function (e) {
    var coords = this.getPosition(e);
    this.setState({ active: true });
    this.updatePosition(coords.x, coords.y);
  },

  handleUpdate: function (e) {
    if (this.state.active) {
      var coords = this.getPosition(e);
      this.updatePosition(coords.x, coords.y);
    }
  },

  stopUpdates: function () {
    if (this.state.active) {
      this.setState({ active: false });
    }
  },

  getPosition : function (e) {
    return {
      x : e.clientX,
      y : e.clientY
    };
  },

  getPercentageValue : function (value) {
    return (value / this.props.max) * 100 + "%";
  },

  getScaledValue : function (value) {
    return clamp(value, 0, 1) * this.props.max;
  }

};

module.exports = DraggableMixin;
