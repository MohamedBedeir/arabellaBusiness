import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import Navigation from './navigation';
import { store } from './redux/store/store';
import { calcFont, calcHeight, calcWidth } from './utils/sizes';
import { I18nManager, Image, StatusBar } from 'react-native';
import { IMAGES } from './assets/Images';
import { FONTS } from './utils/theme';
import I18n from 'i18n-js';

const SuccessIcon = () => {
  return <Image source={IMAGES.accountsReturns} style={{width: calcWidth(25), height: calcWidth(25)}} />;
};

const DangerIcon = () => {
  return <Image source={IMAGES.accountsReturns} style={{width: calcWidth(25), height: calcWidth(25)}} />;
};

const WarningIcon = () => {
  return <Image source={IMAGES.accountsReturns} style={{width: calcWidth(25), height: calcWidth(25)}} />;
};

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <MenuProvider skipInstanceCheck backHandler>
          <Toast ref={(ref) => global['toast'] = ref} />
          <ToastProvider
            placement="bottom"
            duration={2000}
            animationType="slide-in"
            animationDuration={250}
            successColor="#78aa7a"
            dangerColor="#f3776e"
            warningColor="#ebc680"
            normalColor="gray"
            successIcon={<SuccessIcon />}
            dangerIcon={<DangerIcon />}
            warningIcon={<WarningIcon />}
            textStyle={{fontSize: calcFont(14), fontFamily: FONTS.medium, marginHorizontal: calcWidth(6)}}
            // offset={50}
            offsetTop={0}
            offsetBottom={-5}
            swipeEnabled={true}
            style={{minWidth: calcWidth(430), height: calcHeight(60), borderRadius: 0}}
          >
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <Navigation />
          </ToastProvider>
        </MenuProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
