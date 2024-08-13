import { useState } from 'react';
import { ApiResponse } from 'apisauce';
import { PlaceApiResponseModel, PlaceModel } from './Places';
import { get_places } from '../../network';

interface ReturnedData {
  isLoading: boolean;
  response: PlaceModel[];
  getPlaces: (name: string) => Promise<void>;
}

interface Options {
  onSuccess?: () => void;
  onError?: () => void;
  limit?: number;
}

const useGetPlaces = (options?: Options): ReturnedData => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<PlaceModel[]>([]);

  const getPlaces = async (name: string): Promise<void> => {
    console.log('name--------', name);
    
    try {
      setIsLoading(true);
      const result: ApiResponse<PlaceApiResponseModel> = await get_places(name);
      console.log('getPlaces ==========>>>>> ', result);
      if (result.status == 200 && result.data) {
        setResponse(result.data.predictions);
        if (options?.onSuccess) {
          options?.onSuccess();
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
    getPlaces,
  };
};

export default useGetPlaces;
