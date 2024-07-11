import {navigate} from '../navigation';
import {NavigationData, Screens} from './ScreensType';

const navigateToScreen: (data: Screens & NavigationData) => void = (
  data: any,
) => {
  navigate(data.name, data.params);
};
export default navigateToScreen;
