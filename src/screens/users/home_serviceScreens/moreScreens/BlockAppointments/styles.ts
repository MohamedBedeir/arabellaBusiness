import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.gray,
  },
  modalContainer: {
    width: calcWidth(375),
    height: calcHeight(440),
    paddingVertical: calcHeight(24),
    borderTopRightRadius: calcWidth(16),
    borderTopLeftRadius: calcWidth(16),
    backgroundColor: COLORS.white,
    paddingHorizontal: calcWidth(16),
  },
  modalTabsContainer: {
    width: calcWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: calcHeight(16),
  },
  modalDataContainer: {
    height: calcHeight(225 - 16),
  },
  modalDataView: {
    width: calcWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: calcHeight(16),
  },
  modalActionContainer: {
    width: calcWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: calcHeight(32),
  },
});
export default styles;
