import { PublicParkWorkRequestInputs, createPublicParkWorkRequest, PublicParkWorkRequest } from "../types/requests"
import { Cha311URL } from "./const"

const formify = (data: PublicParkWorkRequest) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return formData;
}

export const createParks311Request = async (req: PublicParkWorkRequestInputs) => {
    const fullRequest = createPublicParkWorkRequest(req)
    return await fetch(Cha311URL, {
        method: 'POST',
        body: formify(fullRequest)
    })
}