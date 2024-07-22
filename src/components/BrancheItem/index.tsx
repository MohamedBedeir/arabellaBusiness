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

interface BrancheItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
};

const BrancheItem: React.FC<BrancheItemProps> = ({
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
                        title={Trans('description')}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.bold}
                        color={COLORS.textDark}
                        textAlign={'left'}
                    />
                </View>
                <View style={styles.valueView}>
                    <AppText
                        title={'١ وصف الفرع وصف الفرع وصف الفرع وصف الفرع وصف الفرع وصف الفرع وصف الفرعوصف الفرع وصف الفرع وصف الفرع وصف الفرع وصف الفرع'}
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
                        title={'24.45645'}
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
                        title={'الرياض . حي النخيل . الرياض هيب مبني رقم ٣ شقه ١٣'}
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
                    <TouchableOpacity onPress={onPressEdit}>
                        <Image source={IMAGES.edit} style={styles.icon}/>
                    </TouchableOpacity>
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
                        title={'فرع رقم ١'}
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
                        title={'+966540802488'}
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
                        title={'24.45645'}
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
                        title={Trans('activated')}
                        onPress={() => {}}
                        colorStart={'rgba(92, 190, 67, 0.25)'}
                        colorEnd={'rgba(92, 190, 67, 0.25)'}
                        buttonStyle={{width: calcWidth(140), height: calcHeight(32), borderRadius: calcWidth(12)}}
                        icon={IMAGES.openGreen}
                        iconStyle={{width: calcWidth(8), height: calcWidth(8)}}
                        titleColor={COLORS.green2}
                    />
                </View>
            </View>
        </View>
    </View>
);

export default BrancheItem;
