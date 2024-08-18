import {I18nManager, Platform, StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../../utils/sizes';
import { COLORS, FONTS } from '../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  page_container: {
    flex: 1,
    width: calcWidth(375),
    height: calcHeight(812),
  },
  item_container: {
    flex: 1,
    paddingTop: calcHeight(68),
    paddingHorizontal: calcWidth(16),
  },
  messageContainer: {
    width: calcWidth(343),
    marginTop: Platform.OS == 'ios' ? calcHeight(500) : calcHeight(500 + 44),
  },
  dataContainer: {
    flex: 1,
    marginTop: calcHeight(24 + 44),
    position: 'absolute',
  },
  languageLangContainer: {
    width: calcWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageLangView: {
    // width: calcWidth(81),
    height: calcHeight(32),
    borderRadius: calcHeight(16),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: calcWidth(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  languageLangImage: {
    width: calcHeight(24),
    height: calcHeight(24),
    marginHorizontal: calcWidth(2),
  },
  languageSkipView : {
    height: calcHeight(32),
    borderRadius: calcHeight(16),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: calcWidth(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  nextContainer: {
    width: calcWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? calcHeight(620) : calcHeight(680),

  },
  nextImage: {
    width: calcWidth(44),
    height: calcWidth(44),
    transform: [{scaleX: I18nManager.isRTL ? 1 : -1}],
  },
  nextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextStapActive: {
    width: calcWidth(18),
    height: calcHeight(6),
    borderRadius: calcHeight(3),
    marginHorizontal: calcWidth(4),
    backgroundColor: COLORS.primaryGradient,
  },
  nextStapUnActive: {
    width: calcWidth(12),
    height: calcHeight(6),
    borderRadius: calcHeight(3),
    marginHorizontal: calcWidth(4),
    backgroundColor: COLORS.white,
  },
//   language: {
//     width: calcWidth(430),
//   },
//   page_container: {
//     width: calcWidth(398),
//     height: calcHeight(540),
//     marginTop: calcHeight(14),
//   },
//   item_container: {
//     width: calcWidth(398),
//     height: calcHeight(398),
//   },
//   item_image: {
//     width: calcWidth(398),
//     height: calcHeight(398),
//     resizeMode: 'stretch',
//   },
//   item_title: {
//     color: COLORS.darkText,
//     fontSize: calcFont(21),
//     fontFamily: FONTS.bold,
//     marginHorizontal: calcWidth(16),
//     textAlign: 'center',
//     marginTop: calcHeight(52),
//     lineHeight: calcHeight(26),
// },
//   item_description: {
//     color: COLORS.lightText,
//     fontSize: calcFont(16),
//     fontFamily: FONTS.medium,
//     fontWeight: '300',
//     marginHorizontal: calcWidth(16),
//     textAlign: 'center',
//     marginTop: calcHeight(8),
//     lineHeight: calcHeight(27),
//   },
//   indecator_container: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: -calcHeight(140),
//   },
//   indecator_item: (index: number, viewPagerIndex: number) => ({
//     height: calcWidth(16),
//     width: viewPagerIndex == index ? calcWidth(47) : calcWidth(16),
//     borderRadius: calcWidth(8),
//     backgroundColor: viewPagerIndex == index ? COLORS.darkGray : COLORS.gray,
//     marginHorizontal: calcWidth(15),
//   }),
//   button1_container: {
//     marginTop: calcHeight(143),
//   },
//   button2_container: {
//     marginTop: calcHeight(16),
//   },
});
export default styles;
