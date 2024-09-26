import React, { useEffect } from 'react'
import { loader } from '@/utils/gmap'
import { message } from 'antd'

const RESTRICT_COUNTRY = { country: ['th', 'au', 'jp'] }

interface UsePlaceAutocompleteProps {
  element: HTMLInputElement | null
  onPlaceChanged?: (place: google.maps.places.PlaceResult) => void
}

const usePlaceAutocomplete = ({
  element,
  onPlaceChanged
}: UsePlaceAutocompleteProps) => {
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  )

  const onPlaceChangeListener = () => {
    const place = autocompleteRef.current?.getPlace()

    if (place && onPlaceChanged) {
      onPlaceChanged(place)
    } else {
      message.error('Place not found').then()
    }
  }

  useEffect(() => {
    const initAutocomplete = async () => {
      const { Autocomplete } = (await loader.importLibrary(
        'places'
      )) as google.maps.PlacesLibrary

      if (!element) return

      const autocomplete = new Autocomplete(element, {
        types: ['establishment'],
        componentRestrictions: RESTRICT_COUNTRY,
        fields: ['address_component', 'formatted_address', 'name', 'geometry']
      })

      autocomplete.addListener('place_changed', onPlaceChangeListener)
      autocompleteRef.current = autocomplete
    }

    initAutocomplete().then()
  }, [element])

  return {
    autocompleteRef
  }
}

export default usePlaceAutocomplete
