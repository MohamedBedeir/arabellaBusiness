import React from 'react';
import { View, Dimensions, Image, ImageStyle } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import AppText from '../AppText';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import AppButtonDefault from '../AppButtonDefault';

export interface Props {
  visible?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  onPress1?: () => void;
  onPress2?: () => void;
  image?: string;
  imageStyle?: ImageStyle;
  title?: string;
  buttonTitle?: string;
  button1Title?: string;
  button2Title?: string;
}

const Modal_Warning: React.FC<Props> = (params: any) => {
  return (
    <Modal
      style={{ margin: 0, justifyContent: 'center', }}
      hasBackdrop propagateSwipe={true}
      animationIn= 'slideInUp'
      animationInTiming= {600}
      animationOutTiming= {600}
      isVisible={params.visible}
      onBackdropPress={() => { params.onClose()}}
      onBackButtonPress={() => { params.onClose()}}
      deviceHeight={Dimensions.get('screen').height}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <Image source={params.image} style={[styles.image, params?.imageStyle]}/>
        <AppText
          title={params?.title}
          fontFamily={FONTS.bold}
          fontSize={calcFont(17)}
          textAlign={'center'}
          color={COLORS.textDark}
          width={calcWidth(280)}
          lineHeight={calcHeight(28)}
          numberOfLines={3}
        />
        <View style={styles.buttonsView}>
          {params?.buttonTitle && (
            <AppButtonDefault
              title={params?.buttonTitle}
              onPress={params?.onPress}
              colorStart={COLORS.primaryGradient}
              colorEnd={COLORS.secondGradient}
              buttonStyle={{width: calcWidth(300)}}
            />
          )}
          {params?.button1Title && (
            <View style={styles.buttonsContainer}>
              <AppButtonDefault
                title={params?.button1Title}
                onPress={params?.onPress1}
                colorStart={COLORS.red}
                colorEnd={COLORS.red}
                buttonStyle={{width: calcWidth(148)}}
              />
              <AppButtonDefault
                title={params?.button2Title}
                onPress={params?.onPress2}
                colorStart={COLORS.primaryGradient}
                colorEnd={COLORS.secondGradient}
                buttonStyle={{width: calcWidth(148)}}
                border
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Modal_Warning;
