import {atom} from 'jotai'

const coords = {
    lat: 35.0458,
    lng: -85.3094
}
navigator.geolocation.getCurrentPosition((data) => {
    coords.lat = data.coords.latitude
    coords.lng = data.coords.longitude
})

const location = atom(coords)
    

const requests = atom<Array<number>>([])

export default {
    location,
    requests
}