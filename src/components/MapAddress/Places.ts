export interface PlaceModel {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
  terms: { offset: number; value: string }[];
}

export interface PlaceDetailsModel {
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
}

export interface PlaceApiResponseModel {
  status: string;
  predictions: PlaceModel[];
}

export interface PlaceDetailsApiResponseModel {
  status: string;
  result: PlaceDetailsModel;
}
