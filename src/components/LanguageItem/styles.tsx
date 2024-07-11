import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(62),
    paddingHorizontal: calcWidth(16),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  view: {
    width: calcWidth(175),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameView: {
    width: calcWidth(175 - 54),
  },
  typeContainer: {
    width: calcHeight(46),
    height: calcHeight(46),
    borderRadius: calcHeight(46 / 2),
    borderColor: COLORS.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconView: {
    width: calcWidth(24),
    height: calcWidth(24),
  },
  icon: {
    width: calcWidth(24),
    height: calcWidth(24),
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
  
  
});
