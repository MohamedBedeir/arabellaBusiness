import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { Trans } from '../../translation';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import AppTextGradient from '../AppTextGradient';
import AppTextViewGradient from '../AppTextViewGradient';
import AppButtonDefault from '../AppButtonDefault';

interface AvailableServicesItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
};

const AvailableServicesItem: React.FC<AvailableServicesItemProps> = ({
    item,
    onPressEdit,
    onPressDelete,
}) => (
    <View style={styles.container}>
        <View style={styles.dataContainer}>
            <View style={styles.dataLeftContainer}>
                <View style={styles.titleView}>
                    <AppTextGradient
                        title={'#123'}
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
                        title={`120 ${Trans('rs')}`}
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
                        title={Trans('activated')}
                        onPress={() => {}}
                        colorStart={'rgba(92, 190, 67, 0.25)'}
                        colorEnd={'rgba(92, 190, 67, 0.25)'}
                        buttonStyle={{width: calcWidth(140), height: calcHeight(32)}}
                        icon={IMAGES.openGreen}
                        iconStyle={{width: calcWidth(8), height: calcWidth(8)}}
                        titleColor={COLORS.green2}
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
                    <TouchableOpacity onPress={onPressEdit}>
                        <Image source={IMAGES.edit} style={styles.icon}/>
                    </TouchableOpacity>
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
                colorStart={'rgba(92, 190, 67, 0.2)'}
                colorEnd={'rgba(92, 190, 67, 0.2)'}
                title={Trans('hasBeenApproved')}
                fontFamily={FONTS.bold}
                fontSize={calcFont(14)}
                textAlign={'center'}
                textColorStart={COLORS.green2}
                textColorEnd={COLORS.green2}
            />
        </View>
    </View>
);

export default AvailableServicesItem;
