import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
  buttonBorder: {
    borderWidth: 1.4,
    width: calcWidth(343),
    height: calcHeight(48),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: calcWidth(16),
  },
  button: {
    width: calcWidth(343),
    height: calcHeight(48),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: calcWidth(16),
  },
  icon: {
    width: calcHeight(24), 
    height: calcHeight(24),
    marginHorizontal: calcWidth(6),
  }
});
