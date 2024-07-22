import React from 'react';
import { ImageBackground, Image, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { Trans } from '../../translation';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import AppTextGradient from '../AppTextGradient';
import AppButtonDefault from '../AppButtonDefault';
import AppTextViewGradient from '../AppTextViewGradient';
import AppDataLine from '../AppDataLine';
import LinearGradient from 'react-native-linear-gradient';

interface ReservationItemProps {
    item?: any;
    onPress?: () => void;
};

const ReservationItem: React.FC<ReservationItemProps> = ({
    item,
    onPress,
}) => {

    const dataSection = () => {
        return (
            <LinearGradient
                style={styles.dataContainer}
                colors={[COLORS.primaryGradient, COLORS.secondGradient]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View>
                    <AppText
                        title={`${Trans('reserveNumber')} 1234`}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        color={COLORS.white}
                        textAlign={'left'}
                        marginBottom={calcHeight(8)}
                    />
                    <AppText
                        title={`1520 ${Trans('rs')}`}
                        fontSize={calcFont(24)}
                        fontFamily={FONTS.extra_bold}
                        color={COLORS.white}
                        textAlign={'left'}
                        marginBottom={calcHeight(20)}
                    />
                    <View style={styles.dataStatusContainer}>
                        <AppText
                            title={'ملغي'}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.white}
                            textAlign={'left'}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <Image source={IMAGES.openDetailsWhite} style={styles.dataIcon}/>
                </TouchableOpacity>
            </LinearGradient>
        );
    };

    const detailsSection = () => {
        return (
            <View>
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreAddress}
                    title={'الرياض , 48 شارع عبدالحميد احمد'}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                />
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreAccount2}
                    title={'جنا محمد سالم البراوى'}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                />
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreDate}
                    title={'15/10/2024'}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                />
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreService}
                    title={'تصفيف شعر , ميكاب كامل, تصفيف شعر , ميكاب كامل, تصفيف شعر , ميكاب كامل'}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {dataSection()}
            {detailsSection()}
            {/* <View style={styles.dataContainer}>
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
                        <TouchableOpacity>
                            <Image source={IMAGES.edit} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
            </View> */}
        </View>
    );
}

export default ReservationItem;