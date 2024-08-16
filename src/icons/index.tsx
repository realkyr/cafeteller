import dynamic from 'next/dynamic'

const dynamicImport = (
  iconName: keyof typeof import('core_cafeteller/icons')
) =>
  dynamic(
    () => import('core_cafeteller/icons').then((module) => module[iconName]),
    { ssr: false }
  )

const ReviewFace = dynamicImport('ReviewFace')
const Search = dynamicImport('Search')
const Twitter = dynamicImport('Twitter')
const Facebook = dynamicImport('Facebook')
const Instagram = dynamicImport('Instagram')

export { ReviewFace, Search, Twitter, Facebook, Instagram }
