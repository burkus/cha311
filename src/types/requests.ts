export interface PublicParkWorkRequest extends Record<string, unknown> {
  title: "Public Park Work Request";
  description: string;
  request_type_id: 1004930;
  latitude: number; // 35.036706625854414
  longitude: number; // -85.30535950877973
  address: string;
  user_address: string;
  long_address: string;
  zipcode: undefined;
  space_id: null;
  client_id: number; // 1000051
  custom_field_16975: string; // phone number
  has_image: 0 | 1;
  image: string; // binary data?
}

export type PublicParkWorkRequestInputs = Pick<
  PublicParkWorkRequest,
  "description" | "latitude" | "longitude" | "address" | "image"
> & { phoneNumber: string };

export const createPublicParkWorkRequest = (
  request: PublicParkWorkRequestInputs
): PublicParkWorkRequest => ({
    ...request,
  title: "Public Park Work Request",
  request_type_id: 1004930,
  user_address: request.address,
  long_address: request.address,
  zipcode: undefined,
  space_id: null,
  client_id: 1000051,
  custom_field_16975: request.phoneNumber,
  has_image: request.image ? 1 : 0,
});
