import React, { useEffect } from 'react'
import { loader } from '@/utils/gmap'

interface MapProps {
  element?: HTMLElement | null
  options: google.maps.MapOptions
}

const useMap = ({ element, options }: MapProps) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const mapRef = React.useRef<google.maps.Map | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const { Map } = await loader.importLibrary('maps')

      if (!element) return

      mapRef.current = new Map(element, options)

      setLoading(false)
    }

    initMap().then()
  }, [element])

  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.setOptions(options)
  }, [options])

  return { mapRef, loading }
}

export default useMap
