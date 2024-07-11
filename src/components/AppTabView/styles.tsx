import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../utils/sizes';

export const styles = StyleSheet.create({
    container: {
        // minWidth: calcWidth(100),
        height :calcHeight(32),
        borderWidth: 1,
        borderRadius: calcWidth(12),
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: calcWidth(12),
        paddingRight: calcWidth(12),
        marginEnd: calcWidth(8),
    },
});
