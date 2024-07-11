import React from 'react';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { calcFont, calcHeight } from '../../utils/sizes';
import { FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';

interface SearchByDateProps {
    containerStyle?: ViewStyle;
    onPress?: () => void;
    title: string;
    dateColor?: string;
};

const SearchByDate: React.FC<SearchByDateProps> = ({
    containerStyle,
    onPress,
    title,
    dateColor,
}) => (
    <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onPress}
    >
        <Image source={IMAGES.calender} style={styles.image}/>
        <AppText
            title={title}
            fontSize={calcFont(14)}
            fontFamily={FONTS.medium}
            color={dateColor}
            lineHeight={calcHeight(23)}
            textAlign={'left'}
        />
    </TouchableOpacity>
);

export default SearchByDate;
