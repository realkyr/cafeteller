import { loader } from '@/utils/gmap'
import { Location } from '@/types'
import useMap from '@/hooks/map/useMap'
import { useEffect, useRef } from 'react'
import useMarker from '@/hooks/map/useMarker'

const useInitMap = (element: HTMLElement | null, location: Location) => {
  const { loading, mapRef } = useMap({
    element: element,
    options: {
      center: {
        lng: location.lon,
        lat: location.lat
      },
      zoom: 15,
      mapId: 'map'
    }
  })

  useMarker({
    map: mapRef.current,
    options: {
      position: {
        lng: location.lon,
        lat: location.lat
      },
      title: 'Marker'
    }
  })

  return { loading }
}

export default useInitMap
