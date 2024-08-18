interface CommonProps {
  className?: string
  style?: React.CSSProperties
}

declare module 'core_cafeteller/components' {
  const Card: React.FC<{
    className?: string
    src: string
    title: string
    description: string

    titleProps?: CommonProps
    descriptionProps?: CommonProps
  }>
  const AddCard: React.FC<{
    className?: string
    title: string
    onClick: () => void
  }>
  const CoffeeLoader: React.FC<any>

  const LazyImage: React.FC<any>

  const Button: React.FC<any>

  export { Card, AddCard, CoffeeLoader, LazyImage, Button }
}

declare module 'core_cafeteller/icons' {
  const ReviewFace: React.FC<any>
  const Search: React.FC<any>
  const Instagram: React.FC<any>
  const Facebook: React.FC<any>
  const Twitter: React.FC<any>

  export { ReviewFace, Search, Instagram, Facebook, Twitter }
}
