const nominatimUrl = 'https://nominatim.openstreetmap.org/reverse'

export const createReverseGeocodeUrl = (lat: number, lng: number) => {
    const url = new URL(nominatimUrl)
    url.searchParams.append('format', 'jsonv2')
    url.searchParams.append('lat', lat.toFixed(5))
    url.searchParams.append('lon', lng.toFixed(5))
    return url
}

export const requestReverseGeocode = async (lat: number, lng: number) => {
    const url = createReverseGeocodeUrl(lat, lng)
    const response = await fetch(url)
    if (response.status === 200) return await response.json()
    return {
        error: 'Failed to fetch'
    }
}