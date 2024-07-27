import {atom} from 'jotai'

const location = atom({
    lat: 35.0458,
    lng: 85.3094
})

const requests = atom<Array<number>>([])

export default {
    location,
    requests
}