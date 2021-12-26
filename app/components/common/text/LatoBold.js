import React from 'react';
import { Text, Platform } from 'react-native';

const LatoBold = props => {
  const { numberOfLines = 0 } = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ fontFamily: 'Lato-Bold', color: 'black' }, props.style]}
    >
      {props.children}
    </Text>
  );
};
export { LatoBold };
