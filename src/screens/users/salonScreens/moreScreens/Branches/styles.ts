import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    paddingBottom: calcHeight(170),
  },
  headerContainer: {
    width: calcWidth(375),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(16),
  },
  modalFillterContainer: {
    width: calcWidth(375),
    height: calcHeight(480),
    paddingVertical: calcHeight(24),
    borderTopRightRadius: calcWidth(16),
    borderTopLeftRadius: calcWidth(16),
    backgroundColor: COLORS.white,
    paddingHorizontal: calcWidth(16),
  },
  modalAddContainer: {
    width: calcWidth(375),
    height: calcHeight(780),
    paddingVertical: calcHeight(24),
    borderTopRightRadius: calcWidth(16),
    borderTopLeftRadius: calcWidth(16),
    backgroundColor: COLORS.white,
    paddingHorizontal: calcWidth(16),
  },
  conditionContainer: {
    marginTop: calcHeight(8),
    width: calcWidth(343),
    flexDirection: 'row',
  },
  conditionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: calcWidth(24),
  },
  conditionIcon: {
    width: calcHeight(24),
    height: calcHeight(24),
    marginEnd: calcWidth(8),
  },
  conditionTextView: {
    width: calcWidth(100),
    height: calcHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcWidth(12),
  },
  conditionAddImageContainer: {
    width: calcWidth(343),
    height: calcHeight(142),
    borderRadius: calcWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionAddImageImage: {
    borderRadius: calcWidth(16),
    width: calcWidth(343),
    height: calcHeight(142),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: calcHeight(4),
    marginBottom: calcHeight(12),
    backgroundColor: COLORS.backgroundLight,
  },
  conditionAddImage: {
    width: calcWidth(32),
    height: calcWidth(32),
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
