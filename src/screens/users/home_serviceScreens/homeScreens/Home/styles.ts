import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../utils/theme';
import { calcHeight, calcWidth } from '../../../../../utils/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  searchContainer: {
    width: calcWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: calcHeight(16),
    marginBottom: calcHeight(8),
  },
  searchButton: {
    width: calcWidth(58),
    height: calcHeight(48),
  },
  chart1Container: {
    width: calcWidth(343),
    marginTop: calcHeight(16),
    paddingVertical: calcHeight(12),
    borderRadius: calcWidth(16),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chart1TitleContainer: {
    width: calcWidth(343),
    paddingHorizontal: calcWidth(16),
    paddingBottom: calcHeight(10),
    borderBottomColor: COLORS.borderLight,
    borderBottomWidth: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chart1ChartContainer: {
    width: calcWidth(343),
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(10),
  },
  chart1DetailsContainer: {
    width: calcWidth(343),
    paddingHorizontal: calcWidth(16),
    paddingTop: calcHeight(12),
    borderTopColor: COLORS.borderLight,
    borderTopWidth: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chart2Container: {
    width: calcWidth(343),
    marginTop: calcHeight(16),
    paddingVertical: calcHeight(12),
    borderRadius: calcWidth(16),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: calcHeight(24),
  },
});
export default styles;
