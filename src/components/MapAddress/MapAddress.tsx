import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Text,
  Platform,
  FlatList,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import * as interfaces from './Interfaces';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import useGetPlaces from './useGetPlaces';
import useGetPlaceDetails from './useGetPlaceDetails';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import { Trans } from '../../translation';
import AppButtonDefault from '../AppButtonDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from '../AppLoading';
import { IMAGES } from '../../assets/Images';
import { calcFont, calcHeight, calcWidth } from '../../utils/sizes';
import { COLORS } from '../../utils/theme';


const { width, height } = Dimensions.get('screen');

const MapAddress: FC<interfaces.Props> = props => {
  const {
    location,
    visible,
    onClose,
    onChangeLocation,
    onChangeAddressInput,
    address,
  } = props;
  console.log('location---------?>>>>>>>>>>>>>>>>>>>>>>>', address, location);
  
  const [isShowPlacesView, setIsShowPlacesView] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(address);
  const getPlacesApi = useGetPlaces();
  const [_location, set_Location] = useState<any>({
    latitude: 0,
    longitude: 0,
  })
  const getPlaceDetailsApi = useGetPlaceDetails({
    onSuccess(response) {
      console.log('useGetPlaceDetails--onSuccess-', response);
      
      onChangeLocation(
        response.geometry.location.lat,
        response.geometry.location.lng,
      );
      set_Location({latitude: response.geometry.location.lat, longitude: response.geometry.location.lng})
    },
  });

  useEffect(() => {
    if (true) {
      if (!address) {
        getMyLocation();
      } else {
        if(location.latitude) {
          set_Location({latitude: location.latitude, longitude: location.longitude})
        } else {
          getAddressLocation();
        }
      }
    }
  }, [visible]);

  useEffect(() => {
    setSearchText(address);
  }, [address]);
  
  const getAddressLocation = async () => {
    onChangeAddressInput(address);
    setSearchText(address);
    Geocoder.init('AIzaSyAbzST6gOX5cU-EZr4f6LlPlyH0crvaL0I');
    Geocoder.from(address, {
      southwest: {lat: 36.05, lng: -115.25},
      northeast: {lat: 36.16, lng: -115.10}})
      .then((json: any) => {
        var location2 = json.results[0].geometry.location;
        console.log('location-------', location2);
        set_Location({latitude: location2.lat, longitude: location2.lng});
        onChangeLocation(location2.lat, location2.lng);
      })
      .catch((error: any) => console.warn(error));
  };



  const getMyLocation = (): void => {
    console.log('getMyLocation-------------');
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        Geolocation.requestAuthorization("always");
      }

      if (Platform.OS === "android") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      }
    };

    requestLocationPermission().then(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then((location: any) => {
          console.log('location----------', location);
          const myLocation = {
            lat: location.latitude,
            lng: location.longitude,
          };
          set_Location({latitude: location.latitude, longitude: location.longitude});
          // setSearchText(location);
          getAddress(location.latitude, location.longitude)
          AsyncStorage.setItem("lat_lng", JSON.stringify(myLocation));
        })
        .catch((error: any) => {
          console.log("error--------", error);

          const { code, message } = error;
          console.warn(code, message);
        });
    });
  };

  const closeButton = (): ReactNode => (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: width * 0.04,
        top: Platform.OS === 'ios' ? height * 0.08: height * 0.02,
      }}
      onPress={() => {
        setIsShowPlacesView(false);
        onClose();
        set_Location({latitude: 0, longitude: 0});
      }}
    >
      <Image
        source={IMAGES.nextDark}
        style={{ width: calcWidth(28), height: calcWidth(28), marginTop: calcHeight(8), marginHorizontal: calcWidth(8) }}
      />
    </TouchableOpacity>
  );

  const addressInput = (): ReactNode => {
    return (
      <View
        style={{
          paddingHorizontal: width * 0.03,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          alignSelf: 'center',
          top: Platform.OS === 'ios' ? height * 0.2 : height * 0.1,
          width: width * 0.94,
          height: height * 0.06,
          borderRadius: 8,
          borderColor: COLORS.gray,
          borderWidth: 1,
        }}
      >
        <TextInput
          placeholder={'بحث عن الموقع'}
          style={{
            textAlign: 'left',
            width: width * 0.72,
            color: '#333333',
            fontSize: calcFont(12),
            // fontFamily: 'Almarai-Regular',
          }}
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            if (!isShowPlacesView) {
              setIsShowPlacesView(true);
            }
            getPlacesApi.getPlaces(text);
          }}
        />
        <Image
          source={IMAGES.mapMarker}
          style={{ width: width * 0.06, height: height * 0.06 }}
          resizeMode="contain"
        />
      </View>
    );
  };
  console.log('getPlacesApi---------------', getPlacesApi.response);

  const suggestedPlaces = (): ReactNode => (
    <TouchableOpacity
      style={{
        position: 'absolute',
        alignSelf: 'center',
        top: Platform.OS === 'ios' ? height * 0.12 : height * 0.16,
        width: width * 0.375,
        height: height * 0.8,
      }}
      onPressOut={() => setIsShowPlacesView(false)}
    >
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          width: width * 0.7,
          minHeight: height * 0.12,
          maxHeight: height * 0.25,
        }}
      >
        {getPlacesApi.isLoading ? (
          <View
            style={{
              flex: 1,
              height: height * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="small" color="#203F77" />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getPlacesApi.response}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#EFEFEF',
                  paddingHorizontal: calcWidth(8),
                  paddingVertical: calcHeight(6),
                }}
                onPress={() => {
                  setIsShowPlacesView(false);
                  onChangeAddressInput(item.description);
                  setSearchText(item.description);
                  getPlaceDetailsApi.getPlaceDetails(item.place_id);
                }}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    color: '#333333',
                    fontSize: calcFont(12),
                    // fontFamily: 'Almarai-Regular',
                  }}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.place_id}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const detectLocationButton = (): ReactNode => (
    <View
      style={{
        width: calcWidth(375),
        height: calcHeight(96),
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.lightGray,
        borderTopWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppButtonDefault
        title={Trans('save')}
        onPress={() => {
          onClose();
          onChangeAddressInput(searchText);
          set_Location({latitude: 0, longitude: 0});
          setIsShowPlacesView(false);
        }}
        colorStart={COLORS.primaryGradient}
        colorEnd={COLORS.secondGradient}
      />
    </View>
  );
  const getAddress = async (latitude: number, longitude: number) => {
    Geocoder.init('AIzaSyAbzST6gOX5cU-EZr4f6LlPlyH0crvaL0I');
    console.log('json------------->>>>>>==========>>>>>>>111');
    
    Geocoder.from(latitude, longitude)
      .then((json: any) => {
        console.log('json------------->>>>>>==========>>>>>>>', json);
        setSearchText(json.results[0].formatted_address);
        // var addressComponent = json.results[0].address_components[0];
        // console.log(addressComponent);
      })
      .catch((error: any) => console.log('error-------', error));
  };
  console.log('_location-------', _location);
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setIsShowPlacesView(false);
        onClose();
        set_Location({latitude: 0, longitude: 0});
      }}
      animationType="slide"
    >
      <View style={{ flex: 1, backgroundColor: COLORS.white}}>
        {_location.latitude != 0 ? (
          <MapView
            // region={location}   latitude: lat, longitude: lng
            initialRegion={{
              latitude: _location.latitude,
              longitude: _location.longitude,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
            style={{ flex: 1 }}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onPress={(location: any) => {
              console.log('------------->>>>>>>', location);
              getAddress(
                location.nativeEvent.coordinate.latitude,
                location.nativeEvent.coordinate.longitude,
              );
              onChangeLocation(
                location.nativeEvent.coordinate.latitude,
                location.nativeEvent.coordinate.longitude,
              );
              set_Location({
                latitude: location.nativeEvent.coordinate.latitude,
                longitude: location.nativeEvent.coordinate.longitude,
              });
            }}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onRegionChangeComplete={location =>
              console.log('11----------', location)
            }
          >
            <Marker
              coordinate={{
                latitude: _location.latitude,
                longitude: _location.longitude,
              }}
            >
              <Image
                source={IMAGES.mapMarker}
                style={{ width: calcWidth(24), height: calcWidth(24) }}
              />
            </Marker>
          </MapView>
        ) : (
          <AppLoading
            size={'large'}
            margin_top={calcHeight(440)}
            visible={true}

          />
        )}
        {closeButton()}
        {addressInput()}
        {/* {myLocationButton()} */}
        {detectLocationButton()}
        {getPlacesApi.response.length > 0 &&
          isShowPlacesView &&
          suggestedPlaces()}
      </View>
    </Modal>
  );
};

export default MapAddress;
