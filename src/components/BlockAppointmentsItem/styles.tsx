import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    height: calcHeight(237),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: calcWidth(16),
    marginBottom: calcHeight(16),
  },
  dataContainer: {
    flexDirection: 'row',
  },
  dataLeftContainer: {
    marginTop: calcHeight(16),
    width: calcWidth(340 / 2),
  },
  titleView: {
    height: calcHeight(40),
    paddingStart: calcWidth(16),
    paddingTop: calcHeight(4),
  },
  keyView: {
    height: calcHeight(40),
    justifyContent: 'center',
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.gray,
  },
  valueView :{
    height: calcHeight(49),
    justifyContent: 'center',
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.white,
  },
  dataRightContainer: {
    marginTop: calcHeight(16),
    width: calcWidth(340 / 2),
  },
  editContainer: {
    height: calcHeight(40),
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: calcWidth(16),
  },
  icon: {
    width: calcWidth(28),
    height: calcWidth(28),
    marginHorizontal: calcWidth(6),
  },
  typeContainer: {

  },
  typeView: {
    width: calcWidth(289),
    height: calcHeight(32),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: calcHeight(8),
    borderRadius: calcHeight(12),
  },
});
