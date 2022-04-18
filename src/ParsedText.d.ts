import { PressableTextProps } from './lib/PressableText';
import { Component } from 'react';
import { TextProps } from 'react-native';

declare module 'react-native-parsed-text' {
  interface BaseParseShape
    extends Pick<
      PressableTextProps,
      Exclude<keyof PressableTextProps, 'onPress' | 'onLongPress'>
    > {
    /** arbitrary function to rewrite the matched string into something else */
    renderText?: (matchingString: string, matches: string[]) => string;
    onPress?: (text: string, index: number) => void;
    onLongPress?: (text: string, index: number) => void;
  }

  /**
   * This is for built-in-patterns already supported by this library
   */
  interface DefaultParseShape extends BaseParseShape {
    type: 'url' | 'phone' | 'email';
  }
  /**
   * If you want to provide a custom regexp, this is the configuration to use.
   * -- For historical reasons, all regexps are processed as if they have the global flag set.
   * -- Use the nonExhaustiveModeMaxMatchCount property to match a limited number of matches.
   */
  interface CustomParseShape extends BaseParseShape {
    pattern: string | RegExp;
    /**
     * Enables "non-exhaustive mode", where you can limit how many matches are found.
     *
     * If you want to match at most N things per-call to parse(), provide a positive number here.
     */
    nonExhaustiveModeMaxMatchCount?: number;
  }

  type ParseShape = DefaultParseShape | CustomParseShape;

  export interface ParsedTextProps extends TextProps {
    parse?: ParseShape[];
    childrenProps?: PressableTextProps;
  }

  export default class ParsedText extends Component<ParsedTextProps> {}
}
