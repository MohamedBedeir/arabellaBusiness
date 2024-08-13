import {I18nManager, StyleSheet, TextStyle} from 'react-native';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';

interface Styles {
  text: (fontFamily: string, fontSize: number, color: string) => TextStyle;
}
export const styles = StyleSheet.create<Styles | any>({
  container: {
    flex: 1,
    borderTopEndRadius: calcWidth(40),
    borderTopStartRadius: calcWidth(40),
    backgroundColor: COLORS.white,
    padding: calcWidth(15),
    paddingTop: calcHeight(10),
  },
  textView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  review: {
    fontFamily: FONTS.medium,
    fontSize: calcFont(11),
    color: COLORS.primaryGradient,
  },
  remove: {
    fontFamily: FONTS.medium,
    fontSize: calcFont(11),
    color: 'red',
    marginHorizontal: calcWidth(12),
  },
  titleContainer: {
    alignSelf: 'center',
    height: calcHeight(70),
    justifyContent: 'flex-end',
    marginBottom: calcHeight(42),
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: calcFont(18),
    color: COLORS.black,
  },
  text: (fontFamily: string, fontSize: number, color: string) => ({
    fontFamily,
    fontSize,
    color,
    marginBottom: calcHeight(12),
  }),
  signinButtonContainer: {
    width: calcWidth(322),
    flexShrink: 0,
    borderRadius: calcWidth(18),
    backgroundColor: '#F3E0F9',
    marginStart: 'auto',
    height: calcHeight(58),
    marginVertical: calcHeight(18),
  },
  signinButtonTitle: {
    color: COLORS.primaryGradient,
    fontFamily: FONTS.bold,
    fontSize: calcFont(12),
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
  },

  dontHaveAddressContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: calcHeight(24),
  },
  dontHaveAddressImage: {
    width: calcWidth(96),
    height: calcHeight(96),
    marginBottom: calcHeight(20),
    resizeMode: 'stretch',
  },
  dontHaveAddressTitle: {
    color: COLORS.primaryGradient,
    fontFamily: FONTS.bold,
    fontSize: calcFont(18),
    marginBottom: calcHeight(8),
    textAlign: 'center',
  },
  dontHaveAddressDescription: {
    color: COLORS.gray,
    fontFamily: FONTS.bold,
    fontSize: calcFont(14),
    textAlign: 'center',
    marginBottom: calcHeight(24),
  },

  inputMultiSubject: {
    color: COLORS.black,
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.gray,
    borderRadius: 8,
    height: calcHeight(48),
    textAlignVertical: 'top',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputMultiContent: {
    color: COLORS.black,
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.white,
    borderRadius: calcWidth(8),
    height: calcHeight(120),
    textAlignVertical: 'top',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  contentStyle: {
    color: COLORS.white,
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.white,
    borderRadius: calcWidth(8),
    borderWidth: 1,
    marginBottom: calcHeight(16),
  },
  contentStyle2: {
    color: COLORS.black,
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.borderLight,
    borderRadius: calcWidth(8),
    borderWidth: 1,
    marginBottom: calcHeight(16),
    height: calcHeight(48),
  },
  contentStyle3: {
    color: COLORS.black,
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.borderLight,
    borderRadius: calcWidth(8),
    borderWidth: 1,
    marginBottom: calcHeight(16),
    height: calcHeight(120),
  },
  map: {
    width: calcWidth(48),
    height: calcHeight(48),
    resizeMode: 'stretch',
    marginBottom: calcHeight(16),
  }



});