import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: 'AIzaSyCxnAxJAY5NyxcS3dvXfjFTMMbGBevUm-U',
  version: 'weekly',
  libraries: ['places'],
  language: 'th',
  region: 'TH'
})

export { loader }
