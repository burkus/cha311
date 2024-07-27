import { FC } from "react";

import {
  Stack,
  Input,
  Container,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useAtom } from "jotai";

import store from "../store";
import { createParks311Request } from "../lib/311request";
import { PublicParkWorkRequestInputs } from "../types/requests";
import { PublicWorkResponse } from "../types/responses";

import Loading from "./Loading";

const Form: FC = () => {
  const [isLoading, setIsLoading] = useBoolean(false);
  const [location] = useAtom(store.location);
  const toast = useToast();
  const { handleSubmit, control } = useForm<PublicParkWorkRequestInputs>({
    defaultValues: {
      description: "",
      phoneNumber: "",
      latitude: location.lat,
      longitude: location.lng,
      address: "",
    },
  });

  const onSubmit = (data: PublicParkWorkRequestInputs) => {
    setIsLoading.on();
    createParks311Request(data)
      .then((res) => res.json())
      .then((data: PublicWorkResponse) => {
        if (data.response.status.code === 200) {
          toast({
            title: "Great Success!",
            description: "Your request has been submitted",
            duration: 5000,
            isClosable: true,
            status: "success",
          });
        }
        setIsLoading.off();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading.off();
      });
  };

  return (
    <Container position='relative'>
      {isLoading && <Loading />}
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
              <Input {...field} placeholder="Address" type="text" />
            )}
          />
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Latitude" type="number" disabled />
            )}
          />
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Longitude"
                type="number"
                disabled
              />
            )}
          />
          <Input type="submit" />
        </Stack>
      </form>
    </Container>
  );
};

export default Form;
