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
        paddingHorizontal: calcWidth(15.5),
        paddingVertical: calcHeight(24),
    },
    itemContainer: {
        width: calcWidth(49),
        height: calcHeight(44),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: COLORS.borderLight,
    },
    itemIcon: {
        width: calcHeight(24),
        height: calcHeight(24),
        marginEnd: calcWidth(12),
    },
    modalActionContainer: {
        width: calcWidth(343),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: calcHeight(24),
      },
});
export default styles;