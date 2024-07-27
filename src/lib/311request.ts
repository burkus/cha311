import { PublicParkWorkRequestInputs, createPublicParkWorkRequest } from "../types/requests"
import { Cha311URL } from "./const"

export const createParks311Request = async (form: FormData, data: Record<string, unknown>) => {
    const fullRequest = createPublicParkWorkRequest(data as PublicParkWorkRequestInputs);
    console.log(fullRequest);
    Object.keys(fullRequest).forEach((key) =>
        form.append(key, fullRequest[key] as string)
    )

    return await fetch(Cha311URL, {
        method: 'POST',
        body: form
    })
}