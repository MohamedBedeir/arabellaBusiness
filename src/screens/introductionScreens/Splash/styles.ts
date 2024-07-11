import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../utils/sizes';
import { COLORS } from '../../../utils/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray,
        alignItems:'center',
        justifyContent: 'center',
        marginStart: calcWidth(0),
    },
    splashScreen: {
        width: '100%',
    height: '100%',
        resizeMode: 'cover',
    },
    
});
export default styles;
