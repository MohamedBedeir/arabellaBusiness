import {StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
const styles = StyleSheet.create({
  container: {

  },
  touchContainer: {
    width: calcWidth(343),
    height: calcHeight(48),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    borderRadius: calcWidth(16),
    backgroundColor: COLORS.gray,
  },
  image: {
    width: calcWidth(18),
    height: calcWidth(18),
    marginEnd: calcWidth(4),
  },
  icon: {
    width: calcWidth(18),
    height: calcWidth(18),
  },
  title: {
    fontSize: calcFont(16),
    fontFamily: FONTS.medium,
    color: COLORS.textLight,
    width: calcWidth(269),
    textAlign: 'left',
  },
});
export default styles;
