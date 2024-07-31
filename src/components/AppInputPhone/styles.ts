import {StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
  },
  title: {
    fontSize: calcFont(14),
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    lineHeight: calcHeight(23),
    textAlign: 'left',
    marginBottom: calcHeight(6),
  },
  dataContainer: {
    width: calcWidth(343),
    height: calcHeight(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeContainer: {
    width: calcWidth(85),
    height: calcHeight(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: calcWidth(16),
    backgroundColor: COLORS.gray,
    paddingHorizontal: calcWidth(14),
  },
  codeIcon: {
    width: calcWidth(24),
    height: calcWidth(24),
  },
  image: {
    width: calcWidth(18),
    height: calcWidth(18),
    marginEnd: calcWidth(4),
  },
  inputContainer: {
    width: calcWidth(251),
    height: calcHeight(48),
    borderRadius: calcWidth(16),
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: calcWidth(16),
    borderWidth: 0.6,
  },
  input: {
    width: calcWidth(251 - 52),
    height: calcHeight(48),
    fontSize: calcFont(14),
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  secretImage: {
    width: calcWidth(18),
    height: calcWidth(18),
  },
  error: {
    fontSize: calcFont(14),
    color: COLORS.red,
    fontFamily: FONTS.medium,
    marginTop: calcHeight(4),
    textAlign: 'left',
    marginHorizontal: calcWidth(16),
  },
});
export default styles;
