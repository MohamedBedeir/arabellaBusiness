import {Dimensions, Platform, StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
const styles = StyleSheet.create({
    container: {
        width: calcWidth(375),
        backgroundColor: COLORS.white,
        borderTopRightRadius: calcWidth(16),
        borderTopLeftRadius: calcWidth(16),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: calcWidth(26),
        paddingVertical: calcHeight(24),
    },
    listView: {
        width: calcWidth(375),
        marginTop: calcHeight(24),
        marginBottom: calcHeight(32),
        alignItems: 'center',
    },
    itemLangContainer: {
        width: calcWidth(343),
        paddingHorizontal: calcWidth(16),
        borderRadius: calcWidth(12),
        borderColor: COLORS.borderLight,
        borderWidth: 0.6,
        height: calcHeight(48),
        marginBottom: calcHeight(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemLangView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLangIcon: {
        width: calcWidth(20),
        height: calcWidth(20),
        marginEnd: calcWidth(8),
    },
    itemLangImage: {
        width: calcWidth(24),
        height: calcWidth(24),
    },
    
});
export default styles;