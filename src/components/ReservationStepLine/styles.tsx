import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primaryGradient,
    width: calcWidth(2),
    height: calcHeight(24),
    marginHorizontal: calcWidth(7),
    marginVertical: calcHeight(2),
  },
});
