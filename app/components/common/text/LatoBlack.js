import React from 'react';
import { Text, Platform } from 'react-native';

const LatoBlack = props => {
  const { numberOfLines = 0 } = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ fontFamily: 'Lato-Black', color: 'black' }, props.style]}
    >
      {props.children}
    </Text>
  );
};
export { LatoBlack };
