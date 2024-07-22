import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { Trans } from '../../translation';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import AppTextGradient from '../AppTextGradient';

interface SectionItemProps {
    item?: any;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
};

const SectionItem: React.FC<SectionItemProps> = ({
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
            </View>
            <View>
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
            </View>
            </View>
        </View>
        <View style={styles.keyView2}>
            <AppText
                title={Trans('description')}
                fontSize={calcFont(14)}
                fontFamily={FONTS.bold}
                color={COLORS.textDark}
                textAlign={'left'}
            />
        </View>
        <View style={styles.valueView2}>
            <AppText
                title={'وصف القسم وصف القسم وصف القسم وصف القسم وصف القسم وصف القسم'}
                fontSize={calcFont(14)}
                fontFamily={FONTS.medium}
                color={COLORS.textDark}
                textAlign={'left'}
                width={calcWidth(340 - 24)}
            />
        </View>
    </View>
);

export default SectionItem;
