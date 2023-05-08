import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Keyboard,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  MessageText,
  MessageImage,
  Time,
  utils,
} from 'react-native-gifted-chat';
import { Colors, Metrics } from '@src/assets';

const { isSameUser, isSameDay } = utils;

const Bubble = ({ ...props }, context: undefined) => {
  const isSameThread =
    isSameUser(props.currentMessage, props.previousMessage) &&
    isSameDay(props.currentMessage, props.previousMessage);

  const onLongPress = () => {
    if (props.onLongPress) {
      props.onLongPress(context, props.currentMessage);
    } else {
      if (props.currentMessage.text) {
        const options = [
          'Copy text',
          'Remind me',
          'Add to saved items',
          'Reply in thread',
          'Get notified about new replies',
          'Share message',
          'Copy link to mesage',
          'Pin to channel',
          'Cancel',
        ];
        const cancelButtonIndex = options.length - 1;
        Keyboard.dismiss();
        context?.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          (buttonIndex: any) => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(props.currentMessage.text);
                break;
            }
          },
        );
      }
    }
  };

  const renderMessageText = () => {
    if (props.currentMessage.text) {
      const { messageTextStyle, ...messageTextProps } = props;
      if (props.renderMessageText) {
        return props.renderMessageText(messageTextProps);
      }
      return (
        <MessageText
          {...props}
          textStyle={{
            left: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle,
              messageTextStyle,
            ],
          }}
        />
      );
    }
    return null;
  };

  const renderMessageImage = () => {
    if (props.currentMessage.image) {
      const { ...messageImageProps } = props;
      if (props.renderMessageImage) {
        return props.renderMessageImage(messageImageProps);
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      );
    }
    return null;
  };

  const renderUsername = () => {
    const username = props.currentMessage.user.name;
    if (username) {
      const { ...usernameProps } = props;
      if (props.renderUsername) {
        return props.renderUsername(usernameProps);
      }
      return (
        <Text style={[styles.username, props.usernameStyle]}>{username}</Text>
      );
    }
    return null;
  };

  const renderTime = () => {
    if (props.currentMessage.createdAt) {
      const { ...timeProps } = props;
      if (props.renderTime) {
        return props.renderTime(timeProps);
      }
      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.timeContainer] }}
          textStyle={{
            left: [styles.time, timeProps.textStyle, styles.standardFont],
          }}
        />
      );
    }
    return null;
  };

  const renderCustomView = () => {
    if (props.renderCustomView) {
      return props.renderCustomView(props);
    }
    return null;
  };

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      {renderUsername()}
      {renderTime()}
    </View>
  );

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity
        onLongPress={onLongPress}
        accessibilityTraits="text"
        {...props.touchableProps}>
        <View style={[styles.wrapper, props.wrapperStyle]}>
          <View>
            {renderCustomView()}
            {messageHeader}
            {renderMessageImage()}
            {renderMessageText()}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Bubble;

// Note: Everything is forced to be "left" positioned with this component.
const styles = StyleSheet.create({
  standardFont: {
    fontSize: 16,
    fontWeight: '400',
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
    width: Metrics.screen.width * 0.8,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wrapper: {
    marginRight: 60,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.black,
  },
  time: {
    fontSize: 50,
  },
  timeContainer: {
    marginLeft: 6,
    marginRight: 0,
    marginBottom: 0,
    justifyContent: 'center',
  },
  headerView: {
    marginTop: Platform.OS === 'android' ? -2 : 0,
    flexDirection: 'row',
  },
  slackImage: {
    borderRadius: 6,
    marginLeft: 0,
    marginRight: 0,
    width: (Metrics.screen.width * 3) / 4,
    height: Metrics.screen.width * 0.5,
  },
});

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
};

Bubble.propTypes = {
  touchableProps: PropTypes.object,
  onLongPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderCustomView: PropTypes.func,
  renderUsername: PropTypes.func,
  renderTime: PropTypes.func,
  renderTicks: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  // messageTextStyle: Text.propTypes.style,
  // usernameStyle: Text.propTypes.style,
  // tickStyle: Text.propTypes.style,
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};
