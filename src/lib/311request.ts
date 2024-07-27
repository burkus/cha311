import { PublicParkWorkRequestInputs, createPublicParkWorkRequest } from "../types/requests"
import { Cha311URL } from "./const"

export const createParks311Request = async (data: Record<string, unknown>) => {
    const form = new FormData()
    const fullRequest = createPublicParkWorkRequest(data as PublicParkWorkRequestInputs);
    
    Object.keys(fullRequest).forEach((key) =>
        form.append(key, fullRequest[key] as string)
    )

    return await fetch(Cha311URL, {
        method: 'POST',
        body: form
    })
}