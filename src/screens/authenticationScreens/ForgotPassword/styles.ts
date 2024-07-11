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
});
export default styles;
