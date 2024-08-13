import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';
const styles = StyleSheet.create({
    modalView: {
        maxHeight: calcHeight(480),
        backgroundColor: COLORS.white,
        borderTopLeftRadius: calcWidth(16),
        borderTopRightRadius: calcWidth(16),
        justifyContent: 'center',
        paddingHorizontal: calcWidth(16),
        paddingVertical: calcHeight(24),
    },
    itemContainer: {
        width: calcWidth(343),
        height: calcHeight(48),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: calcHeight(16),
        borderBottomColor: COLORS.borderLight,
        borderBottomWidth: 0.5,
    },
    itemIcon: {
        width: calcHeight(24),
        height: calcHeight(24),
        marginEnd: calcWidth(12),
    },
});
export default styles;