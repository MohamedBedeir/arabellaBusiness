import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcWidth(11),
    paddingHorizontal: calcWidth(24),
  },
  imageView: {
    width: calcWidth(28),
    height: calcWidth(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: calcWidth(28),
    height: calcWidth(28),
  },
  logo: {
    width: calcWidth(24),
    height: calcWidth(24),
  },
});
