import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../utils/sizes';
import { COLORS } from '../../../utils/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    border: {
        marginTop: -calcHeight(20),
        width: calcWidth(375),
        paddingTop: calcHeight(44),
        alignItems: 'center',
        paddingHorizontal: calcWidth(16),
        borderTopLeftRadius: calcWidth(20),
        borderTopRightRadius: calcWidth(20),
        backgroundColor: COLORS.white,
    },
    titleContainer: {
        width: calcWidth(343),
    },
    dataContainer: {
        width: calcWidth(375),
        minHeight: calcHeight(644 + 40),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingHorizontal: calcWidth(16),
    },
    termsAndContainer: {
        width: calcWidth(343),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: calcHeight(20),
    },
    termsAndIcon: {
        width: calcWidth(20),
        height: calcWidth(20),
        marginEnd: calcWidth(8),
    },
    dontHaveAccountView: {
        width: calcWidth(343),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: calcHeight(62),
        marginBottom: calcHeight(34),
        flexDirection: 'row',
    },
    dontHaveAccountTouch: {
        marginHorizontal: calcWidth(4),
    },
});
export default styles;
