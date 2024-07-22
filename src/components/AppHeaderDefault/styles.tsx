import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(93),
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: calcWidth(375),
    height: calcHeight(49),
    // backgroundColor: 'red',
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
