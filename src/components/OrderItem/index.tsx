import React from 'react';
import { ImageBackground, Image, View, TouchableOpacity, I18nManager } from 'react-native';
import { styles } from './styles';
import AppText from '../AppText';
import { Trans } from '../../translation';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS, FONTS } from '../../utils/theme';
import { IMAGES } from '../../assets/Images';
import AppDataLine from '../AppDataLine';
import LinearGradient from 'react-native-linear-gradient';
import { DUMMY_DATA } from '../../utils/dummyData';
import moment from 'moment';

interface OrderItemProps {
    item?: any;
    type?: string;
    onPress?: () => void;
};

const OrderItem: React.FC<OrderItemProps> = ({
    item,
    type,
    onPress,
}) => {
    console.log('OrderItem-------------------------', item);
    
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
                        title={`${Trans('orderNumber')} ${_item?.id}`}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        color={COLORS.white}
                        textAlign={'left'}
                        marginBottom={calcHeight(8)}
                    />
                    <AppText
                        title={`${_item?.priceAfterDiscount} ${Trans('rs')}`}
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
        var products: string = '';
        for (let i = 0; i < _item?.productOrderProducts?.length; i++) {
            products = `${I18nManager.isRTL ? _item?.productOrderProducts[i]?.productAttribute?.product?.name : _item?.productOrderProducts[i]?.productAttribute?.product?.nameEn}${_item?.productOrderProducts?.length == i+1 ? '' : ','} ${products}`;
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
                {_item?.scheduledAt && (
                    <AppDataLine
                        containerStyle={{}}
                        image={IMAGES.moreDate}
                        title={`${Trans('day')}: ${moment(_item?.scheduledAt).format('DD/MM/YYYY')}  -  ${Trans('time')}: ${moment(_item?.scheduledAt).format('LT')}`}
                        fontSize={calcFont(14)}
                        fontFamily={FONTS.medium}
                        textColor={COLORS.textDark}
                        textAlign={'left'}
                        textWidth={calcWidth(318 - 40)}
                    />
                )}
                <AppDataLine
                    containerStyle={{}}
                    image={IMAGES.moreService}
                    title={products}
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
        </TouchableOpacity>
    );
}

export default OrderItem;
