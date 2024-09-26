import React, { useRef } from 'react'
import { Input, InputProps, InputRef } from 'antd'
import usePlaceAutocomplete from '@/hooks/map/usePlaceAutocomplete'

interface AutocompleteProps extends InputProps {
  onPlaceChanged?: (place: google.maps.places.PlaceResult) => void
}

const Autocomplete = ({ onPlaceChanged, ...props }: AutocompleteProps) => {
  const ref = useRef<InputRef>(null)

  usePlaceAutocomplete({
    element: ref.current?.input || null,
    onPlaceChanged
  })

  return <Input ref={ref} {...props} />
}

export default Autocomplete
