import { StyleSheet } from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';

interface Styles {
    button: (color: string) => string;
};

const styles = StyleSheet.create<Styles | any>({
    modalView: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: calcWidth(20),
        borderTopRightRadius: calcWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: calcHeight(20),
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
    button: (color: string) => ({
        backgroundColor: color,
        borderRadius: calcWidth(4),
        height: calcHeight(45),
        width: calcWidth(335),
        alignSelf: "center",
        marginBottom: calcHeight(12),
    })
});
export default styles;