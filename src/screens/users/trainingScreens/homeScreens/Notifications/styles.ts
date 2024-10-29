
import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingBottom: calcHeight(140),
  },
  deleteContainer: {
    width: calcWidth(375),
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
    alignItems: 'flex-start',
  },
  deleteTouch: {
    height: calcHeight(40),
    borderBlockColor: COLORS.red,
    borderBottomWidth: 1,
    width: calcWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: calcWidth(18),
    height: calcWidth(18),
    marginHorizontal: calcWidth(4)
  },
});
export default styles;
