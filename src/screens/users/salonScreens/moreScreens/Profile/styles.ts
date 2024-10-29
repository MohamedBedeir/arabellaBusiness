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
    paddingBottom: calcHeight(280),
  },
  policiesView: {
    width: calcWidth(343),
    marginTop: calcHeight(4),
  },
  policiesTouch: {},
  line: {
    width: calcWidth(375),
    height: calcHeight(24),
    marginVertical: calcHeight(32),
    backgroundColor: COLORS.gray,
  },
});
export default styles;
