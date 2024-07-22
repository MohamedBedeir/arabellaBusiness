import React from 'react';
import { Image, View, TouchableOpacity, I18nManager } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { Trans } from '../../translation';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import AppTextGradient from '../AppTextGradient';
import AppTextViewGradient from '../AppTextViewGradient';
import AppButtonDefault from '../AppButtonDefault';
import { DUMMY_DATA } from '../../utils/dummyData';

interface ServicesItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
    onUpdateState?: () => void;
};

const ServicesItem: React.FC<ServicesItemProps> = ({
    item,
    onPressEdit,
    onPressDelete,
    onUpdateState,
}) => {
    var myStateName: string = '';
    var myStateColor: string = item?.myStateId == 1 ? COLORS.green2 : COLORS.yellow;
    var myStateBackgroundColor: string = item?.myStateId == 1 ?  COLORS.backgroundGreen : COLORS.backgroundYellow;
    var myStateIcon: string = item?.myStateId == 1 ? IMAGES.openGreen : IMAGES.openYellow;
    for (let i = 0; i < DUMMY_DATA.SERVICESTATUES.length; i++) {
        if (DUMMY_DATA.SERVICESTATUES[i].id == item?.myStateId) {
            myStateName = I18nManager.isRTL ? DUMMY_DATA.SERVICESTATUES[i].nameAr : DUMMY_DATA.SERVICESTATUES[i].nameEn;
        }
    };

    var stateName: string = (item?.state == 'pending' || item?.state == 'reviewing') ? Trans('underReview') : item?.state == 'approved' ? Trans('hasBeenApproved') : item?.state == 'rejected' ? Trans('unacceptable'): '';
    var stateColor: string = (item?.state == 'pending' || item?.state == 'reviewing') ? COLORS.yellow : item?.state == 'approved' ? COLORS.green2 : item?.state == 'rejected' ? COLORS.red : '';
    var stateBackgroundColor: string = (item?.state == 'pending' || item?.state == 'reviewing') ? COLORS.backgroundYellow : item?.state == 'approved' ? COLORS.backgroundGreen : item?.state == 'rejected' ? COLORS.backgroundRed : '';

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <View style={styles.dataLeftContainer}>
                    <View style={styles.titleView}>
                        <AppTextGradient
                            title={item?.id}
                            fontSize={calcFont(16)}
                            fontFamily={FONTS.extra_bold}
                            colorStart={COLORS.secondGradient}
                            colorEnd={COLORS.primaryGradient}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('image')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={[styles.valueView, {height: calcHeight(170)}]}>
                        <Image source={IMAGES.serviceTest} style={styles.itemImage}/>
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('price')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={`${item?.price} ${Trans('rs')}`}
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
                            title={Trans('condition')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppButtonDefault
                            title={myStateName}
                            onPress={onUpdateState}
                            colorStart={myStateBackgroundColor}
                            colorEnd={myStateBackgroundColor}
                            buttonStyle={{width: calcWidth(140), height: calcHeight(32)}}
                            icon={myStateIcon}
                            iconStyle={{width: calcWidth(8), height: calcWidth(8)}}
                            titleColor={myStateColor}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('systemServiceStatus')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                </View>
                <View style={styles.dataRightContainer}>
                    <View style={styles.editContainer}>
                        {(item.state != 'reviewing' && item?.state != 'pending') && (
                            <TouchableOpacity onPress={onPressEdit}>
                                <Image source={IMAGES.edit} style={styles.icon}/>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={onPressDelete}>
                            <Image source={IMAGES.delete} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('serviceName')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={[styles.valueView, {height: calcHeight(170), justifyContent: 'flex-start', paddingTop: calcHeight(16)}]}>
                        <AppText
                            title={'بدكير'}
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
                        <AppText
                            title={Trans('category')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={'تقليم الاظافر'}
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
                        <AppText
                            title={Trans('estimatedTime')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={`20 ${Trans('minute')}`}
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
                    colorStart={stateBackgroundColor}
                    colorEnd={stateBackgroundColor}
                    title={stateName}
                    fontFamily={FONTS.bold}
                    fontSize={calcFont(14)}
                    textAlign={'center'}
                    textColorStart={stateColor}
                    textColorEnd={stateColor}
                />
            </View>
        </View>
    )
}

export default ServicesItem;
