import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import { COLORS } from '../../utils/theme';

interface Props {
  margin_top?: number;
  size?: 'large' | 'small';
  visible?: boolean;
}
const AppLoading: React.FC<Props> = ({margin_top, size, visible}) => {
  return (
    <Modal
    visible={visible}
    transparent animationType="slide"
    >
      {/* <View style={{flex: 1, backgroundColor: 'rgba(250, 250, 250, 1)'}}> */}
        <ActivityIndicator
          size={size}
          color={COLORS.primaryGradient}
          animating style={{marginVertical:margin_top}}
        />
      {/* </View> */}
    </Modal>
  );
};
export default AppLoading;
