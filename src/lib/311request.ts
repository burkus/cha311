import { Cha311URL } from "./const"


export const createParks311Request = async (form: FormData) => {
    return await fetch(Cha311URL, {
        method: 'POST',
        body: form
    })
}