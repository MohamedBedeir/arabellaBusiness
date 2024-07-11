import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    paddingVertical: calcHeight(16),
    paddingHorizontal: calcWidth(12),
    borderRadius: calcWidth(16),
    marginTop: calcHeight(16),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderLight,
  },
  indicatorContainer :{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: calcWidth(20),
    height: calcWidth(20),
    marginHorizontal: calcWidth(8),
  },
  image: {
    width: calcWidth(48),
    height: calcWidth(48),
  },
});
