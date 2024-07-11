import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';

export const styles = StyleSheet.create({
    container: {
        height :calcHeight(41),
    },
    titleContainer: {
        height :calcHeight(38),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: calcWidth(12),
    },
});
