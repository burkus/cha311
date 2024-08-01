import { FC } from "react";

import {
  Stack,
  Input,
  Container,
  useToast,
  useBoolean,
  InputGroup,
  Button,
  InputRightAddon,
} from "@chakra-ui/react";
import { useForm, Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { useAtom } from "jotai";

import store from "../store";
import { createParks311Request } from "../lib/311request";
import { PublicWorkResponse } from "../types/responses";
import { requestReverseGeocode } from "../lib/geocoding";

import Loading from "./Loading";

const Form: FC = () => {
  const [isLoading, setIsLoading] = useBoolean(false);
  const [location] = useAtom(store.location);
  const [, setRequests] = useAtom(store.requests);
  const toast = useToast();
  const { handleSubmit, control } = useForm();

  const handleAutofill = (field: ControllerRenderProps<FieldValues, 'address'>) => () => { 
    const request = () => requestReverseGeocode(location.lat, location.lng)
      .then((data) => {
        field.onChange(data.display_name);
      })
      .catch(() => {
        toast({
            title: "Failed to fetch address",
            description: 'Address could not be fetched',
            isClosable: true,
            status: 'warning'
        })
      });

      setTimeout(request, 1000)
  }

  const onSubmit = (data: Record<string, unknown>) => {
    data.latitude = location.lat;
    data.longitude = location.lng;
    setIsLoading.on();
    createParks311Request(data)
      .then((res) => res.json())
      .then((data: PublicWorkResponse) => {
        if (data.response.status.code === 200) {
          toast({
            title: "Great Success!",
            description: `Your request # is ${data.response.request_id}`,
            isClosable: true,
            duration: 1000000,
            status: "success",
          });
          setRequests((prev) => [...prev, data.response.request_id]);
        }
        setIsLoading.off();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading.off();
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack padding={3}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Description" type="text" />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Phone Number" type="tel" />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <Input {...field} placeholder="Address" type="text" />
                <InputRightAddon>
                  <Button onClick={handleAutofill(field)}>autofill</Button>
                </InputRightAddon>
              </InputGroup>
            )}
          />
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={location.lat}
                placeholder="Latitude"
                type="number"
                disabled
              />
            )}
          />
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={location.lng}
                placeholder="Longitude"
                type="number"
                disabled
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="file"
                accept="image/*"
                capture="environment"
                value={field.value?.fileName}
                onChange={(e) => field.onChange(e.target.files?.[0])}
                pt={1}
                disabled={isLoading}
              />
            )}
          />
          <Input type="submit" disabled={isLoading} />
        </Stack>
      </form>
      {isLoading && <Loading />}
    </Container>
  );
};

export default Form;
