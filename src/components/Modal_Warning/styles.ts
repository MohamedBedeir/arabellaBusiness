import { StyleSheet } from 'react-native';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
const styles = StyleSheet.create({
    modalContainer: {
        width: calcWidth(343),
        backgroundColor: COLORS.white,
        borderRadius: calcWidth(16),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: calcWidth(26),
        paddingVertical: calcHeight(24),
    },
    image: {
        width: calcWidth(160),
        height: calcWidth(120),
        marginBottom: calcHeight(8),
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: calcFont(21),
        color: COLORS.textDark,
        marginBottom: calcHeight(36),
        textAlign: 'left',
    },
    discription: {
        fontFamily: FONTS.medium,
        fontSize: calcFont(18),
        color: COLORS.textDark,
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: calcHeight(24),
    },
    buttonsContainer: {
        width: calcWidth(311),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer1: {
        height: calcHeight(50),
        width: calcWidth(168),
        borderRadius: calcWidth(16),
    },
    buttonTitle1: {
        color: COLORS.white,
        fontSize: calcFont(16),
    },
    buttonContainer2: {
        height: calcHeight(50),
        width: calcWidth(168),
        borderRadius: calcWidth(16),
    },
    buttonTitle2: {
        color: COLORS.textDark,
        fontSize: calcFont(16),
    },
});
export default styles;