import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { calcHeight, calcWidth } from '../../utils/sizes';

const styles = StyleSheet.create({
    container: {
        maxHeight: calcHeight(480),
        backgroundColor: Colors.white,
        borderTopLeftRadius: calcWidth(16),
        borderTopRightRadius: calcWidth(16),
        justifyContent: 'center',
        paddingHorizontal: calcWidth(15.5),
        paddingVertical: calcHeight(24),
    },
    modalActionContainer: {
        width: calcWidth(343),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: calcHeight(24),
    },
});

export default styles;