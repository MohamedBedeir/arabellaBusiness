import React from 'react';
import { COLORS } from '../../utils/theme';
import { styles } from './styles';
import { View } from 'react-native';

interface ReservationStepLineProps {
    active?: boolean;
};

const ReservationStepLine: React.FC<ReservationStepLineProps> = ({
    active,
}) => (
    <View style={[styles.container, {borderColor: active ? COLORS.primaryGradient : COLORS.textLight}]}/>
);

export default ReservationStepLine;
                   