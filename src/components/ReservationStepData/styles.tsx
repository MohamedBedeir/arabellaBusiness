import {StyleSheet} from 'react-native';
import { calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: calcWidth(16),
    height: calcWidth(16),
    marginEnd: calcWidth(6),
  },
});
