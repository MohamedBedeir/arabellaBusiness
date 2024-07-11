import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(12),
    borderRadius: calcWidth(16),
    marginBottom: calcHeight(16),
  },
  dataContainer: {
    width: calcWidth(318),
    paddingVertical: calcHeight(12),
    paddingHorizontal: calcWidth(16),
    borderRadius: calcWidth(16),
    marginBottom: calcHeight(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dataIcon: {
    width: calcWidth(34),
    height: calcWidth(34),
  },
  dataStatusContainer: {
    height :calcHeight(32),
    minWidth: calcWidth(40),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: calcWidth(12),
    paddingLeft: calcWidth(8),
    paddingRight: calcWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: calcHeight(4),
  },
  detailsView: {
    width: calcWidth(318), 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
