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
import endpoints from '../../network/endpoints';

interface BrancheItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
};

const BrancheItem: React.FC<BrancheItemProps> = ({
    item,
    onPressEdit,
    onPressDelete,
}) => {
    var color: string = item?.isActive ? COLORS.green2 : COLORS.yellow;
    var icon: string = item?.isActive ? IMAGES.openGreen : IMAGES.openYellow;
    var stateBackgroundColor: string = item?.isActive ? COLORS.backgroundGreen : COLORS.backgroundYellow;
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
                        <Image source={{uri: `${endpoints.imageUrl}${item?.featuredImage}`}} style={styles.itemImage}/>
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('description')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={I18nManager.isRTL ? item?.description : item?.descriptionEn}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                            numberOfLines={3}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('longitude')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={item?.location?.coordinates[1]}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('address')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={I18nManager.isRTL ? item?.address : item?.addressEn}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                            numberOfLines={3}
                        />
                    </View>
                </View>
                <View style={styles.dataRightContainer}>
                    <View style={styles.editContainer}>
                        {/* <TouchableOpacity onPress={onPressEdit}>
                            <Image source={IMAGES.edit} style={styles.icon}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={onPressDelete}>
                            <Image source={IMAGES.delete} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('name')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={[styles.valueView, {height: calcHeight(170), justifyContent: 'flex-start', paddingTop: calcHeight(16)}]}>
                        <AppText
                            title={I18nManager.isRTL ? item?.name : item?.nameEn}
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
                            title={Trans('phone')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={item?.phoneNumber}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('latitude')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={item?.location?.coordinates[0]}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
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
                            title={item?.isActive ? Trans('activated') : Trans('deactivated')}
                            onPress={() => {}}
                            colorStart={stateBackgroundColor}
                            colorEnd={stateBackgroundColor}
                            buttonStyle={{width: calcWidth(140), height: calcHeight(32), borderRadius: calcWidth(12)}}
                            icon={icon}
                            iconStyle={{width: calcWidth(8), height: calcWidth(8)}}
                            titleColor={color}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BrancheItem;
