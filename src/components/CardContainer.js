import React from 'react';
import { View } from 'react-native';

const CardContainer = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'rgba(255,255,255, 0.3)',
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.25)'
  }
};

export default CardContainer;