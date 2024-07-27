import { PublicParkWorkRequestInputs, createPublicParkWorkRequest } from "../types/requests"
import { Cha311URL } from "./const"

const formify = (data: Record<string, unknown>) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key] as string))
    return formData;
}

export const createParks311Request = async (form: FormData) => {
    return await fetch(Cha311URL, {
        method: 'POST',
        body: form
    })
}