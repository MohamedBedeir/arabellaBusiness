import {StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
  },
  image: {
    width: calcWidth(18),
    height: calcWidth(18),
    marginEnd: calcWidth(4),
  },
  inputContainer: {
    width: calcWidth(343),
    height: calcHeight(48),
    borderRadius: calcWidth(16),
    backgroundColor: COLORS.gray,
    marginTop: calcHeight(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: calcWidth(16),
  },
  input: {
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
    color: '#CC3300',
    fontFamily: FONTS.medium,
    marginTop: calcHeight(4),
    textAlign: 'left',
    marginHorizontal: calcWidth(16),
  },
});
export default styles;
