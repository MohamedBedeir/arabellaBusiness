import React from 'react';
import { Image, Text, View } from 'react-native';
import AppText from '../AppText';
import { IMAGES } from '../../assets/Images';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont } from '../../utils/sizes';
import { styles } from './styles';

interface ReservationStepDataProps {
    title?: string | any;
    active?:  boolean;
};

const ReservationStepData: React.FC<ReservationStepDataProps> = ({
    title,
    active,
}) => (
    <View style={styles.container}>
        <Image source={active ? IMAGES.stepDone : IMAGES.stepNext} style={styles.image}/>
        <AppText
            title={title}
            fontSize={calcFont(16)}
            fontFamily={FONTS.regular}
            color={active ? COLORS.textDark : COLORS.textLight}
            textAlign={'left'}
        />
    </View>
);

export default ReservationStepData;
                   