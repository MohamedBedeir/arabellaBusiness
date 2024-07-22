import {StyleSheet, I18nManager} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../../../../utils/sizes';
import { COLORS, FONTS } from '../../../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  mainDataContainer: {
    width: calcWidth(343),
    paddingTop: calcHeight(12),
    paddingHorizontal: calcWidth(12),
    borderRadius: calcWidth(16),
    marginBottom: calcHeight(16),
    marginTop: calcHeight(16),
  },
  mainDataItemContainer: {
    width: calcWidth(318),
    height: calcHeight(30),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: calcHeight(12),
    borderBottomColor: 'rgba(225, 225, 225, 0.4)',
    borderBottomWidth: 0.2,
    // backgroundColor: 'green',
  },
  mainDataItemOptionContainer: {
    width: calcWidth(318),
    marginTop: -calcHeight(16),
    marginBottom: calcHeight(12),
    borderBottomColor: 'rgba(225, 225, 225, 0.4)',
    borderBottomWidth: 0.2,
  },
  mainDataItemOptionIcon: {
    width: calcWidth(18),
    height: calcWidth(18),
    marginEnd: calcWidth(6),
  },
  mainDataItemOptionApprovedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: calcWidth(318),
    height: calcHeight(48),
    borderRadius: calcHeight(24),
    backgroundColor: 'rgba(244, 248, 255, 0.5)',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: calcWidth(16),
    color: COLORS.white,
    fontSize: calcFont(14),
    fontFamily: FONTS.bold,
  },
  customerNameContainer: {
    width: calcWidth(343),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(16),
    marginBottom: calcHeight(16),
  },
  countDownContainer: {
    marginTop: -calcHeight(144),
    marginBottom: calcHeight(96),
  },
  countDownView: {
    justifyContent: "center",
    alignItems: "center",
  },
  countDownText: {
    fontSize: calcFont(44),
    fontFamily: FONTS.black,
    color: COLORS.textDark,
  },
  stepsContainer: {
    marginTop: calcHeight(16),
    width: calcWidth(319),
  },

  servicesDetailsContainer: {
    width: calcWidth(343),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(16),
    marginBottom: calcHeight(16),
  },



  dateContainer: {
    width: calcWidth(343),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(16),
    marginBottom: calcHeight(16),
  },

  addressContainer: {
    width: calcWidth(343),
    backgroundColor: COLORS.white,
    borderRadius: calcWidth(16),
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(16),
    marginBottom: calcHeight(16),
    alignItems: 'center',
  },
  lineContainer: {
    width: calcWidth(319),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: calcHeight(8),
  },
  lineView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineIcon: {
    width: calcWidth(28),
    height: calcWidth(28),
    marginStart: calcWidth(8),
  },
  addressMapTest :{
    width: calcWidth(319),
    height: calcHeight(240),
    borderRadius: calcWidth(16),
    marginTop: calcHeight(4),
  },
  actionContainer: {
    width: calcWidth(375),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    // marginTop: calcHeight(16),
    paddingBottom: calcHeight(16),
  },
  waitingContainer: {
    width: calcWidth(343),
    height: calcHeight(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    width: calcWidth(375),
    height: calcHeight(41),
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  filtterContainer: {
    width: calcWidth(375),
    height: calcHeight(48),
    paddingHorizontal: calcWidth(16),
    backgroundColor: COLORS.backgroundLight,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  listContainer: {
    width: calcWidth(375),
    paddingTop: calcHeight(16),
    paddingHorizontal: calcWidth(16),
    alignItems: 'center',
  },

  otpContainer: {
    width: calcWidth(340 - 58),
    marginTop: calcHeight(8),
  },
  otpInput: {
    width: calcWidth(50),
    height: calcWidth(50),
    borderRadius: calcWidth(8),
    borderWidth: 1,
    backgroundColor: COLORS.gray,
    textAlign: 'center',
    color: COLORS.primaryGradient,
    fontFamily: FONTS.bold,
    fontSize: 20,
    // fontStyle: 'normal',
    // fontWeight: '500',
  },
});
export default styles;
