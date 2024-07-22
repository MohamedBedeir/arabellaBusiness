import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  body: {
    marginVertical: calcHeight(24),
    width: calcWidth(375),
    alignItems: 'center',
  },
  moreItemContainer: {
    marginTop: calcHeight(16),
  }
});
export default styles;
