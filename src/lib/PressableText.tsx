import React, { useState } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

export interface PressableTextProps extends TextProps {
  defaultPressFeedback?: boolean;
  defaultPressFeedbackOpacity?: number;
  pressedStyle?: StyleProp<TextStyle>;
}

export const PressableText = ({
  defaultPressFeedback = true,
  defaultPressFeedbackOpacity = 0.8,
  pressedStyle,
  ...props
}: PressableTextProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const getPressedStyle = () => {
    if (pressedStyle) return pressedStyle;

    if (defaultPressFeedback) return { opacity: defaultPressFeedbackOpacity };

    return {};
  };

  return (
    <Text
      suppressHighlighting
      {...props}
      onPressIn={(event) => {
        props.onPressIn?.(event);

        setIsPressed(true);
      }}
      onPressOut={(event) => {
        props.onPressOut?.(event);

        setIsPressed(false);
      }}
      style={[props.style, isPressed ? getPressedStyle() : {}]}
    />
  );
};
