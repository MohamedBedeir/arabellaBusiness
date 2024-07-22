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

interface EmployeeItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
    onUpdateState?: () => void;
};

const EmployeeItem: React.FC<EmployeeItemProps> = ({
    item,
    onPressEdit,
    onPressDelete,
    onUpdateState,
}) => {
    var myStateName: string = '';
    var myStateColor: string = item?.stateId == 1 ? COLORS.green2 : COLORS.yellow;
    var myStateBackgroundColor: string = item?.stateId == 1 ?  COLORS.backgroundGreen : COLORS.backgroundYellow;
    var myStateIcon: string = item?.stateId == 1 ? IMAGES.openGreen : IMAGES.openYellow;
    for (let i = 0; i < DUMMY_DATA.SERVICESTATUES.length; i++) {
        if (DUMMY_DATA.SERVICESTATUES[i].id == item?.stateId) {
            myStateName = I18nManager.isRTL ? DUMMY_DATA.SERVICESTATUES[i].nameAr : DUMMY_DATA.SERVICESTATUES[i].nameEn;
        }
    };
    return (
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
                            title={Trans('name')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={item?.name}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                            numberOfLines={3}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('branch')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={I18nManager.isRTL ? item?.branchNameAr : item?.branchNameEn}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.keyView}>
                        <AppText
                            title={Trans('email')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={item?.email}
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
                            title={Trans('salon')}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.bold}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
                    </View>
                    <View style={styles.valueView}>
                        <AppText
                            title={I18nManager.isRTL ? item?.saloneNameAr : item?.saloneNameEn}
                            fontSize={calcFont(14)}
                            fontFamily={FONTS.medium}
                            color={COLORS.textDark}
                            textAlign={'left'}
                        />
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
                            buttonStyle={{width: calcWidth(140), height: calcHeight(32), borderRadius: calcWidth(12)}}
                            icon={myStateIcon}
                            iconStyle={{width: calcWidth(8), height: calcWidth(8)}}
                            titleColor={myStateColor}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default EmployeeItem;
