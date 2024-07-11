import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(318),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: calcHeight(10),
  },
  image: {
    width: calcWidth(32),
    height: calcWidth(32),
    marginEnd: calcWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
