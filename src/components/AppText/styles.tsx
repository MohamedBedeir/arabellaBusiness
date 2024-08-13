import {StyleSheet} from 'react-native';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGradient,
    flexDirection: 'row',
    borderRadius: calcWidth(7),
  },
  title: {
    fontSize: calcFont(16),
    color: COLORS.textDark,
    fontStyle: 'normal',
    fontFamily: FONTS.medium,
  },
});
