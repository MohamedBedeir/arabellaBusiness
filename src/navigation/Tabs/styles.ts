import {I18nManager, Platform, StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
interface Styles {
  indecator_item: (index: number, viewPagerIndex: number) => number;
}
const styles = StyleSheet.create<Styles | any>({
    icon: {
        width: calcHeight(24),
        height: calcHeight(24),
        marginTop: -calcHeight(20),
    },





    tabBarStyle: {
        height: calcHeight(66),
        paddingTop: calcHeight(4),
    },
    tabBarLabelStyle: {
        fontSize: calcFont(14),
        fontFamily: FONTS.medium,
        textTransform: 'capitalize',
    },
    shipmentContainer: {
        width: calcHeight(118),
        height: calcHeight(66),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        marginBottom: Platform.OS === 'android' ? calcHeight(-2) : calcHeight(-2)},
    shipmentView1: {
        marginTop: -calcHeight(40),
        backgroundColor: 'transparent',
        width: calcHeight(86),
        height: calcHeight(86),
        transform: [{rotate: '45deg'}],
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primaryGray,
        borderBottomColor: COLORS.primaryGray,
        borderBottomWidth: I18nManager.isRTL ? 3 : 3,
        borderLeftWidth: I18nManager.isRTL ? 3 : 0,
        borderRightWidth: I18nManager.isRTL ? 0 : 3,
        borderBottomLeftRadius: I18nManager.isRTL ? calcHeight(18): 0,
        borderBottomRightRadius: I18nManager.isRTL ? 0 : calcHeight(18),
    },
    shipmentView2: {
        backgroundColor: COLORS.primary,
        width: calcHeight(70),
        height: calcHeight(70),
        borderRadius: calcHeight(18),
        alignItems: 'center',
        justifyContent: 'center'
    },
    shipmentIcon: {
        transform: [{rotate: '315deg'}],
        width: calcHeight(24),
        height: calcHeight(24),
    },
    modalAddContainer: {
        width: calcWidth(398),
        paddingHorizontal: calcWidth(16),
        paddingVertical: calcHeight(24),
        borderRadius: calcWidth(16),
        backgroundColor: COLORS.white,alignSelf: 'center',
    },
    itemAddContainer: {
        width: calcWidth(398 - 32),
        paddingHorizontal: calcWidth(16),
        paddingVertical: calcHeight(16),
        borderRadius: calcWidth(16),
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: calcHeight(8),
    },
    itemAddView1: {
        width: calcWidth(300),
    },
    itemAddView2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: calcHeight(4),
    },
    itemAddIcon1: {
        width: calcWidth(24),
        height: calcWidth(24),
        marginEnd: calcWidth(4),
    },
    itemAddTitle: {
        fontSize: calcFont(16),
        fontFamily: FONTS.semiBold,
        color: COLORS.darkText,
    },
    itemAddDescription: {
        fontSize: calcFont(14),
        fontFamily: FONTS.medium,
        color: COLORS.lightText,
    },
    itemAddIcon2: {
        width: calcWidth(24),
        height: calcWidth(24),
        transform: [{scaleX: I18nManager.isRTL ? 1 : -1}],
    },

});
export default styles;
