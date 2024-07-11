import React from 'react';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont } from '../../utils/sizes';
import { GradientBorderView } from '@good-react-native/gradient-border';

interface AppTabViewProps {
    onPress?: () => void;
    containerStyle?: ViewStyle | any;
    select?: boolean;
    backgroundColor?: string;
    title?: string | any;
};

const AppTabView: React.FC<AppTabViewProps> = ({
    onPress,
    containerStyle,
    select,
    backgroundColor,
    title,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <GradientBorderView
                gradientProps={{
                    colors: [select ? COLORS.primaryGradient : COLORS.textLight, select ? COLORS.secondGradient : COLORS.textLight]
                }}
                style={[styles.container, {backgroundColor}, containerStyle]}
            >
                {select ? (
                    <TextGradient
                        text={title}
                        style={{fontFamily: FONTS.bold, fontSize :calcFont(15), textAlign: 'center'}}
                        colors={[COLORS.primaryGradient, COLORS.secondGradient]}
                        locations={[0, 1]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                    />
                ) : (
                    <AppText
                        title={title}
                        fontSize={calcFont(15)}
                        fontFamily={FONTS.bold}
                        color={COLORS.textLight}
                        textAlign={'center'}
                    />
                )}
                
            </GradientBorderView>
        </TouchableOpacity>
    );
};

export default AppTabView;
