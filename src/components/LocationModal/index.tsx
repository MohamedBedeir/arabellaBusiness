import React from 'react';
import { View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { COLORS, FONTS } from '../../utils/theme';
import AppButtonDefault from '../AppButtonDefault';
import AppText from '../AppText';
import { calcFont, calcHeight } from '../../utils/sizes';

export interface Props {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  titleButton1?: string;
  titleButton2?: string;
  onPressButton1?: () => void;
  onPressButton2?: () => void;
}

const LocationModal: React.FC<Props> = (params: any) => {
  return (
    <Modal
      style={{ margin: 0, justifyContent: 'flex-end', }}
      hasBackdrop propagateSwipe={true}
      animationIn='bounceInDown'
      isVisible={params.visible}
      onBackdropPress={() => { params.onClose()}}
      onBackButtonPress={() => { params.onClose()}}
      deviceHeight={Dimensions.get('screen').height}
      statusBarTranslucent
      animationInTiming= {800}
      animationOutTiming= {800}
    >
      <View style={styles.modalView}>
        <AppText
          title={params.title}
          fontSize={calcFont(16)}
          fontFamily={FONTS.extra_bold}
          color={COLORS.primaryGradient}
          textAlign={'left'}
          marginBottom={calcHeight(12)}
        />
        <AppText
          title={params.description}
          fontSize={calcFont(16)}
          fontFamily={FONTS.medium}
          color={COLORS.textLight}
          textAlign={'left'}
        />
        <View style={styles.buttonsView}>
          <AppButtonDefault
            title={params.titleButton1}
            
            onPress={() => params.onPressButton1()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
          />
          <AppButtonDefault
            title={params.titleButton2}
            
            onPress={() => params.onPressButton2()}
            colorStart={COLORS.primaryGradient}
            colorEnd={COLORS.secondGradient}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
