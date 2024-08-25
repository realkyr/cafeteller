import { loader } from '@/utils/gmap'
import { Location } from '@/types'

const useInitMap = () => {
  const initializeMap = async (location: Location) => {
    if (!location) return

    const { Map } = await loader.importLibrary('maps')

    const mapOptions = {
      center: {
        lng: location.lon,
        lat: location.lat
      },
      zoom: 15,
      mapId: 'map'
    }

    const element = document.getElementById('map')
    if (!element) return

    const map = new Map(element, mapOptions)

    const { AdvancedMarkerElement, PinElement } = (await loader.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary

    const image = document.createElement('img')
    image.src = '/assets/Images/pin.png'

    new AdvancedMarkerElement({
      position: mapOptions.center,
      map: map,
      content: image,
      title: 'Marker'
    })
  }

  return { initializeMap }
}

export default useInitMap
