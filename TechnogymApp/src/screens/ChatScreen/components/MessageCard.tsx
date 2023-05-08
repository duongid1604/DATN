import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { Metrics } from '../../../assets/index';
import { Avatar, Day, utils } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import Bubble from './Bubble';

const { isSameUser, isSameDay } = utils;

const Message = ({ ...props }) => {
  const marginBottom = isSameUser(props.currentMessage, props.nextMessage)
    ? 2
    : 10;

  const getInnerComponentProps = () => {
    const { ...otherprops } = props;
    return {
      ...otherprops,
      position: 'left',
      isSameUser,
      isSameDay,
    };
  };

  const renderDay = () => {
    if (props.currentMessage.createdAt) {
      const dayProps = getInnerComponentProps();
      if (props.renderDay) {
        return props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  };

  const renderBubble = () => {
    const bubbleProps = getInnerComponentProps();
    if (props.renderBubble) {
      return props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps} />;
  };

  const renderAvatar = () => {
    let extraStyle;
    if (
      isSameUser(props.currentMessage, props.previousMessage) &&
      isSameDay(props.currentMessage, props.previousMessage)
    ) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 };
    }

    const avatarProps = getInnerComponentProps();
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.slackAvatar, avatarProps.imageStyle, extraStyle],
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderDay()}
      <View style={[styles.main, { marginBottom }, props.containerStyle]}>
        {renderAvatar()}
        {renderBubble()}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  main: {
    width: Metrics.screen.width - 28,
    flexDirection: 'row',
  },
  slackAvatar: {
    width: Metrics.screen.height / 16,
    height: Metrics.screen.height / 16,
    borderRadius: 6,
  },
});

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
};

Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};
