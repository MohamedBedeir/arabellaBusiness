import { useState } from 'react';
import { ApiResponse } from 'apisauce';
import { PlaceDetailsApiResponseModel, PlaceDetailsModel } from './Places';
import { get_laceDetails } from '../../network';

interface ReturnedData {
  isLoading: boolean;
  response: PlaceDetailsModel;
  getPlaceDetails: (placeId: string) => Promise<void>;
}

interface Options {
  onSuccess?: (response: PlaceDetailsModel) => void;
  onError?: () => void;
  limit?: number;
}

const responseInitData: PlaceDetailsModel = {
  formatted_address: '',
  geometry: {
    location: {
      lat: 0,
      lng: 0,
    },
  },
};

const useGetPlaceDetails = (options?: Options): ReturnedData => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<PlaceDetailsModel>(responseInitData);

  const getPlaceDetails = async (placeId: string): Promise<void> => {
    console.log('get_PlaceDetails-----------',placeId);
    try {
      setIsLoading(true)
      const result: ApiResponse<PlaceDetailsApiResponseModel> =
        await get_laceDetails(placeId);
      console.log('getPlaceDetails ==============>>>>>>> ', result);
      if (result.status == 200 && result.data) {
        setResponse(result.data.result);
        if (options?.onSuccess) {
          options?.onSuccess(result.data.result);
        }
      } else {
        if (options?.onError) {
          options?.onError();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    response,
    getPlaceDetails,
  };
};

export default useGetPlaceDetails;
