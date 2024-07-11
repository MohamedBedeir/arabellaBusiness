import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(133),
    height: calcHeight(48),
    paddingHorizontal: calcWidth(16),
    borderRadius: calcWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  image: {
    width: calcWidth(18),
    height: calcWidth(18),
    marginEnd: calcWidth(4),
  },
});
