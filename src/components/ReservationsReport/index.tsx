import React from 'react';
import { ImageBackground, Image, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont, calcHeight } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { Trans } from '../../translation';

interface ReservationsReportProps {
    containerStyle?: ViewStyle;
    title: string;
    image?: string | any;
    count?: number;
    duration?: string;
    percent?: number;
    indicatorIcon?: string | any;
    indicatorColor?: string;
};

const ReservationsReport: React.FC<ReservationsReportProps> = ({
    containerStyle,
    title,
    image,
    count,
    duration,
    percent,
    indicatorIcon,
    indicatorColor,
}) => (
    <View style={[styles.container, containerStyle]}>
        <View>
            <AppText
                title={title}
                fontSize={calcFont(14)}
                fontFamily={FONTS.medium}
                color={COLORS.textDark}
                lineHeight={calcHeight(23)}
                textAlign={'left'}
                marginBottom={calcHeight(8)}
            />
            <AppText
                title={count}
                fontSize={calcFont(24)}
                fontFamily={FONTS.medium}
                color={COLORS.textDark}
                lineHeight={calcHeight(23)}
                textAlign={'left'}
                marginBottom={calcHeight(8)}
            />
            <View style={styles.indicatorContainer}>
                <AppText
                    title={duration}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.light}
                    color={COLORS.textLight}
                    lineHeight={calcHeight(23)}
                    textAlign={'left'}
                />
                <Image source={indicatorIcon} style={styles.icon}/>
                <AppText
                    title={`${percent} ${Trans('rs')}`}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    color={indicatorColor}
                    lineHeight={calcHeight(23)}
                    textAlign={'left'}
                />
            </View>
        </View>
        <Image source={image} style={styles.image}/>
    </View>
);

export default ReservationsReport;
