import {StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  body: {
    marginTop: calcHeight(24),
    width: calcWidth(375),
    alignItems: 'center',
  },
  title: {
    fontSize: calcFont(16),
    fontFamily: FONTS.bold,
    color: COLORS.black,
    paddingTop: calcHeight(16),
    textAlign: 'left',
  },
  description: {
    fontSize: calcFont(13),
    fontFamily: FONTS.medium,
    color: COLORS.textLight,
    paddingTop: calcHeight(4),
    width: calcWidth(310),
    textAlign: 'left',
  },
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: calcHeight(4),
    width: '100%',
    // backgroundColor: 'red',
  },
  pointPoint: {
    width: calcWidth(6),
    height: calcHeight(6),
    borderRadius: calcWidth(3),
    backgroundColor: COLORS.black,
    marginEnd: calcWidth(12),
    marginTop: calcHeight(6),
  },
  pointView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pointTitle: {
    fontSize: calcFont(16),
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    marginEnd: calcWidth(4),
    lineHeight: calcHeight(16),
  },
  pointDescription: {
    fontSize: calcFont(16),
    fontFamily: FONTS.regular,
    color: COLORS.textDark,
    marginEnd: calcWidth(4),
    marginTop: calcHeight(3),
    width: calcWidth(305),
    textAlign: 'left',
  },
});
