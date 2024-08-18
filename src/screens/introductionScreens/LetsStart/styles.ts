import {Platform, StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../utils/sizes';
import { COLORS } from '../../../utils/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: calcHeight(24 + 44),

    },
    languageLangContainer: {
        width: calcWidth(343),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    languageLangView: {
        // width: calcWidth(81),
        height: calcHeight(32),
        borderRadius: calcHeight(16),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: calcWidth(12),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    languageLangImage: {
        width: calcHeight(24),
        height: calcHeight(24),
        marginHorizontal: calcWidth(2),
    },
    messageContainer: {
        width: calcWidth(343),
        marginTop: Platform.OS == 'ios' ? calcHeight(465) : calcHeight(465 + 44),

    },
    authContainer: {
        marginTop: calcHeight(32),
    },
    authView: {
        width: calcWidth(343),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: calcHeight(36),
        flexDirection: 'row',
    },
    authTouch: {
        marginHorizontal: calcWidth(4),
    },




    logo: {
        width: calcWidth(193),
        height: calcWidth(193),
    },
    footer: {
        width: calcWidth(430),
        height: calcHeight(134),
        marginTop: calcHeight(252),
    },
});
export default styles;
