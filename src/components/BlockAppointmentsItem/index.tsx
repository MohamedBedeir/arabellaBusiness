import React from 'react';
import { ImageBackground, Image, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { Trans } from '../../translation';
import { calcFont } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import AppTextGradient from '../AppTextGradient';
import AppButtonDefault from '../AppButtonDefault';
import AppTextViewGradient from '../AppTextViewGradient';

interface BlockAppointmentsItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
};

const BlockAppointmentsItem: React.FC<BlockAppointmentsItemProps> = ({
    item,
    onPressEdit,
    onPressDelete,
}) => (
    <View style={styles.container}>
        <View style={styles.dataContainer}>
            <View style={styles.dataLeftContainer}>
                <View style={styles.titleView}>
                    <AppTextGradient
                        title={item.title}
                        fontSize={calcFont(16)}
                        fontFamily={FONTS.extra_bold}
                        colorStart={COLORS.secondGradient}
                        colorEnd={COLORS.primaryGradient}
                        textAlign={'left'}
                    />
                </View>
                <View style={styles.keyView}>
                    <AppText
                        title={Trans('longTimeAgo')}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.bold}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                </View>
                <View style={styles.valueView}>
                    <AppText
                        title={item.dateFron}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                    {item?.timeFrom && (
                        <AppText
                            title={item.timeFrom}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.extra_bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    )}
                </View>
                <View style={styles.keyView}>
                    <AppText
                        title={Trans('type')}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.bold}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                </View>
            </View>
            <View style={styles.dataRightContainer}>
                <View style={styles.editContainer}>
                    <TouchableOpacity onPress={onPressEdit}>
                        <Image source={IMAGES.edit} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDelete}>
                        <Image source={IMAGES.delete} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyView}>
                    <AppText
                        title={Trans('forWhile')}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.bold}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                </View>
                <View style={styles.valueView}>
                    <AppText
                        title={item.dateFron}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                    {item?.timeTo && (
                        <AppText
                            title={item.timeTo}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.extra_bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    )}
                </View>
                <View style={styles.keyView}>
                </View>
            </View>
        </View>
        <View style={styles.typeContainer}>
            <AppTextViewGradient
                containerStyle={styles.typeView}
                colorStart={'rgba(237, 81, 155, 0.2)'}
                colorEnd={'rgba(197, 122, 222, 0.2)'}
                title={item?.type}
                fontFamily={FONTS.bold}
                fontSize={calcFont(14)}
                textAlign={'center'}
                textColorStart={COLORS.secondGradient}
                textColorEnd={COLORS.primaryGradient}
            />
        </View>
    </View>
);

export default BlockAppointmentsItem;