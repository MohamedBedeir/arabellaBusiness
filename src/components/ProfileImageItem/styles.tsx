import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(375),
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageContainerStyle: {
    width: calcWidth(112),
    height: calcWidth(112),
    borderRadius: calcWidth(112 / 2),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width: calcWidth(112),
    height: calcWidth(112),
    borderRadius: calcWidth(112 / 2),
    borderWidth: calcWidth(2),
    borderColor: COLORS.primaryGradient,
  },
  image: {
    width: calcWidth(36),
    height: calcWidth(36),
    borderRadius: calcWidth(36 / 2),
  },
  typeContainer: {
    height: calcHeight(36),
    borderRadius: calcHeight(36 / 2),
    paddingHorizontal: calcWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: calcHeight(16),
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
  
  icon: {
    width: calcWidth(18),
    height: calcWidth(18),
    transform: [{rotate: '90deg'}],
  },
});
