import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    height: calcHeight(93),
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
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
  profileContainer: {
    width: calcWidth(136),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  profileImage: {
    width: calcHeight(36),
    height: calcHeight(36),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginEnd: calcWidth(8),
  },
  statusBorder: {
    width: calcHeight(9),
    height: calcHeight(9),
    borderRadius: calcHeight(9 / 2),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusView: {
    width: calcHeight(6),
    height: calcHeight(6),
    borderRadius: calcHeight(6 / 2),
    backgroundColor: 'rgba(92, 190, 67, 1)',
  },
  profileData: {

  },
  icon: {
    width: calcHeight(24),
    height: calcHeight(24),
  },
  notContainer: {
    width: calcWidth(136),
    alignItems: 'flex-end',
  },
});
