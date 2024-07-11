import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(48),
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: calcHeight(107),
  },
  image: {
    width: calcWidth(24),
    height: calcWidth(24),
    marginStart: calcWidth(4),
  },
});
