import {Dimensions, Platform, StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
const styles = StyleSheet.create({
    modalView: {
        height: calcHeight(480),
        backgroundColor: COLORS.white,
        borderTopLeftRadius: calcWidth(24),
        borderTopRightRadius: calcWidth(24),
        justifyContent: 'center',
        paddingHorizontal: calcWidth(16),
        paddingVertical: calcHeight(24),
        paddingTop: calcHeight(28),
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: calcFont(18),
        color: COLORS.textDark,
        marginBottom: calcHeight(16),
        textAlign: 'left',
    },
    itemContainer: {
        width: calcWidth(396),
        height: calcHeight(48),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: calcHeight(16),
    },
    itemView: {
        width: calcWidth(396),
        height: calcHeight(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBlockColor: COLORS.lightGray,
        borderBottomWidth: 1,

    },
    itemViewRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemIcon: {
        width: calcHeight(24),
        height: calcHeight(24),
        marginEnd: calcWidth(12),
    },
    itemImage: {

    },
    itemTitle: {
        fontSize: calcFont(16),
        color: COLORS.textDark,
        fontFamily: FONTS.medium,
    },
    itemText: {

    },
    button: {
        height: calcHeight(60),
    }
});
export default styles;