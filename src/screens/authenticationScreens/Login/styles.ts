import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../utils/sizes';
import { COLORS } from '../../../utils/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dataContainer: {
        width: calcWidth(375),
        minHeight: calcHeight(644 + 40),
        marginTop: -calcHeight(20),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderTopLeftRadius: calcWidth(20),
        borderTopRightRadius: calcWidth(20),
        paddingHorizontal: calcWidth(16),
        paddingTop: calcHeight(42),
    },
    titleContainer: {
        width: calcWidth(343),
    },
    forgotContainer: {
        width: calcWidth(343),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: calcHeight(20),
    },
    forgotPasswordView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    forgotIcon: {
        width: calcWidth(24),
        height: calcWidth(24),
        marginEnd: calcWidth(8),
    },
    forgotRememberContainer: {

    },
    dontHaveAccountView: {
        width: calcWidth(343),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: calcHeight(192),
        flexDirection: 'row',
    },
    dontHaveAccountTouch: {
        marginHorizontal: calcWidth(4),
    },
});
export default styles;
