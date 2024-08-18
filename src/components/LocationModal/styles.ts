import { StyleSheet } from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: COLORS.red,
        borderTopLeftRadius: calcWidth(20),
        borderTopRightRadius: calcWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: calcHeight(20),
        height: 400,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: calcFont(16),
        color: COLORS.primaryGradient,
        marginVertical: calcHeight(4),
    },
    description: {
        fontFamily: FONTS.medium,
        fontSize: calcFont(16),
        color: COLORS.gray,
        marginVertical: calcHeight(4),
        textAlign: 'center',
        width: '80%',
    },
    buttonsView: {
        marginTop: calcHeight(32),
    },
});
export default styles;