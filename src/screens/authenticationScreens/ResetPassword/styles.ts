import {StyleSheet} from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../../utils/sizes';
import { COLORS, FONTS } from '../../../utils/theme';

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










    otpContainer: {
        width: calcWidth(340 - 58),
        marginTop: calcHeight(64),
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
        fontSize: calcFont(24),
        // fontStyle: 'normal',
        // fontWeight: '500',
    },
    dontHaveAccountView: {
        width: calcWidth(343),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: calcHeight(34),
        flexDirection: 'row',
    },
    dontHaveAccountTouch: {
        marginHorizontal: calcWidth(4),
    },
    passwordContainer: {
        marginTop: calcHeight(48),
    },
});
export default styles;
