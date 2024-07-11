import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(204),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: calcHeight(129),
    height: calcHeight(94),
  },
});
