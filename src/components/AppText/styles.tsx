import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors, fonts} from '../../../utils/theme';

export const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    borderRadius: scale(7),
  },
  title: {
    fontSize: scale(16),
    color: colors.textBtnColor,
    fontStyle: 'normal',
    fontFamily: fonts.medium,
  },
});
