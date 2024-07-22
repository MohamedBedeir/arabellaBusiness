import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { StatusBar, Platform, I18nManager } from 'react-native';

let statusBar_heigh:number = 0;

if (Platform.OS == 'android') {
  statusBar_heigh = StatusBar.currentHeight as number;
} else {

}

const calcWidth: (width: number) => number = (pixels: number) => {
  const deviceRatio = (pixels * 100) / 375;
  return widthPercentageToDP(deviceRatio);
};
const calcHeight: (heigh: number) => number = (pixels: number) => {
  const deviceRatio = (pixels * 100) / (Platform.OS == 'android'? 812 : 812);
  return heightPercentageToDP(deviceRatio);
};
const calcFont: (width: number) => number = (pixels: number) => {
  const pixel: number = I18nManager.isRTL ?  pixels * 65 : pixels * 80;
  const deviceRatio = (pixel) / 375;
  return widthPercentageToDP(deviceRatio);
};

export {calcWidth, calcHeight, calcFont};
