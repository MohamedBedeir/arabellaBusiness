import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';
import { COLORS } from '../../../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  tabsContainer: {
    width: calcWidth(375),
    height: calcHeight(41),
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  filtterContainer: {
    width: calcWidth(375),
    height: calcHeight(48),
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.backgroundLight,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  listContainer: {
    width: calcWidth(375),
    paddingTop: calcHeight(16),
    paddingHorizontal: calcWidth(16),
    alignItems: 'center',
  },
});
export default styles;
