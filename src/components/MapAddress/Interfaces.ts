import { Region } from 'react-native-maps';

export interface Props {
  visible: boolean;
  onClose: () => void;
  location: Region;
  address: string;
  onChangeLocation: (lat: number, lng: number) => void
  onChangeAddressInput: (value: string) => void;
}
