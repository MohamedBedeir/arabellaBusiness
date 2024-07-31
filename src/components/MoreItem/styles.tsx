import {I18nManager, StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    height: calcHeight(48),
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.4, 
    borderBottomColor: COLORS.borderLight,
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: calcWidth(28),
    height: calcWidth(28),
    marginEnd: calcWidth(10),
  },
  icon: {
    width: calcWidth(18),
    height: calcWidth(18),
    transform: [{rotate: I18nManager.isRTL ? '90deg' : '270deg'}],
  },
});
