import React from 'react';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AppText from '../AppText';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, FONTS } from '../../utils/theme';
import { calcFont } from '../../utils/sizes';

interface AppTabProps {
    onPress?: () => void;
    containerStyle?: ViewStyle;
    select?: boolean;
    title?: string | any;
};

const AppTab: React.FC<AppTabProps> = ({
    onPress,
    containerStyle,
    select,
    title,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                style={[styles.container, containerStyle]}
                colors={[select ? COLORS.primaryGradient : COLORS.white, select ? COLORS.secondGradient : COLORS.white]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.titleContainer}>
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
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default AppTab;
