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
import { DUMMY_DATA } from '../../utils/dummyData';
import moment from 'moment';

interface ReservationItemProps {
    item?: any;
    type?: string;
    onPress?: () => void;
};

const ReservationItem: React.FC<ReservationItemProps> = ({
    item,
    type,
    onPress,
}) => {
    console.log('item-------------', item);
    
    const _item = item;
    const _status: any = DUMMY_DATA.APPOINTMENT_STATUS;
    var state = '';
    for (let i = 0; i < _status.length; i++) {
        if (_item?.status == _status[i]?.key) {
            state = I18nManager.isRTL ? _status[i].name : _status[i].nameEn;
        }
    }
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
                        title={`${Trans('reserveNumber')} ${_item?.id}`}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        color={COLORS.white}
                        textAlign={'left'}
                        marginBottom={calcHeight(8)}
                    />
                    <AppText
                        title={`${_item?.invoice?.totalPriceAfterDiscount} ${Trans('rs')}`}
                        fontSize={calcFont(24)}
                        fontFamily={FONTS.extra_bold}
                        color={COLORS.white}
                        textAlign={'left'}
                        marginBottom={calcHeight(20)}
                    />
                    <View style={styles.dataStatusContainer}>
                        <AppText
                            title={state}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.white}
                            textAlign={'left'}
                        />
                    </View>
                </View>
                    <Image source={IMAGES.openDetailsWhite} style={styles.dataIcon}/>
            </LinearGradient>
        );
    };

    const detailsSection = () => {
        var services: string = '';
        if (type == 'training') {
            services = I18nManager.isRTL ? _item?.serviceBookings[0]?.service?.name : _item?.serviceBookings[0]?.service?.nameEn;
        } else {
            for (let i = 0; i < _item?.serviceBookings?.length; i++) {
                services = `${I18nManager.isRTL ? _item?.serviceBookings[i]?.service?.name : _item?.serviceBookings[i]?.service?.nameEn}${_item?.serviceBookings?.length == i+1 ? '' : ','} ${services}`;
            }
        };
        
        return (
            <View>
                {(type != 'training' && type != 'sports_club_manager') && (
                    <AppDataLine
                        containerStyle={{}}
                        image={IMAGES.moreAddress}
                        title={`${_item?.address}`}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        textColor={COLORS.textDark}
                        textAlign={'left'}
                        textWidth={calcWidth(318 - 40)}
                    />
                )}
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreAccount2}
                    title={_item?.customer?.name}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                />
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreDate}
                    title={`${Trans('day')}: ${moment(_item?.serviceBookings[0]?.scheduledAt).format('DD/MM/YYYY')}  -  ${Trans('time')}: ${moment(_item?.serviceBookings[0]?.scheduledAt).format('hh:mm')}`}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                />
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreService}
                    title={services}
                    fontSize={calcFont(14)}
                    fontFamily={FONTS.medium}
                    textColor={COLORS.textDark}
                    textAlign={'left'}
                    textWidth={calcWidth(318 - 40)}
                    numberOfLines={3}
                />
            </View>
        );
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
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
        </TouchableOpacity>
    );
}

export default ReservationItem;
