import React from 'react';
import { ImageBackground, Image, View, TouchableOpacity, I18nManager } from 'react-native';
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
import moment from 'moment';

interface NotificationItemProps {
    item?: any;
    onPress?: () => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
    item,
    onPress,
}) => {

    const dataSection = () => {
        return (
            <LinearGradient
                style={styles.dataContainer}
                colors={[!item?.isRead ? COLORS.primaryGradient : COLORS.gray, !item?.isRead ? COLORS.secondGradient : COLORS.gray]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View>
                    <AppText
                        title={I18nManager.isRTL ? item?.title : item?.titleEn}
                        fontSize={calcFont(18)}
                        fontFamily={FONTS.extra_bold}
                        color={!item?.isRead ? COLORS.white : COLORS.primaryGradient}
                        textAlign={'left'}
                        marginBottom={calcHeight(8)}
                    />
                    <AppText
                        title={I18nManager.isRTL ? item?.message : item?.messageEn}
                        fontSize={calcFont(16)}
                        fontFamily={FONTS.regular}
                        color={!item?.isRead ? COLORS.white : COLORS.primaryGradient}
                        textAlign={'left'}
                        marginBottom={calcHeight(12)}
                        width={calcWidth(240)}
                        numberOfLines={3}
                    />
                    <AppText
                        title={`${moment(item.createdAt).format('DD/MM/YYYY')}   ${moment(item.createdAt).format('LT')}`}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                </View>
                <Image source={ !item?.isRead ? IMAGES.openDetailsWhite : IMAGES.nextDark} style={styles.dataIcon}/>
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
                <View style={styles.detailsView}>
                    <AppDataLine
                        containerStyle={{width: calcWidth(318 - 80)}}
                        image={IMAGES.moreService}
                        title={'تصفيف شعر , ميكاب كامل, تصفيف شعر , ميكاب كامل, تصفيف شعر , ميكاب كامل'}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        textColor={COLORS.textDark}
                        textAlign={'left'}
                        textWidth={calcWidth(318 - 120)}
                    />
                    <AppText
                        title={'12/7/2024  12:25'}
                        fontSize={calcFont(12)}
                        fontFamily={FONTS.medium}
                        color={COLORS.textLight}
                    />
                </View>
            </View>
        );
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {backgroundColor: COLORS.white}]}
        >
            {dataSection()}
            {/* {detailsSection()} */}
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
        </TouchableOpacity>
    );
}

export default NotificationItem;
