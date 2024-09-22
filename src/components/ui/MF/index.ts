import dynamic from 'next/dynamic'

const dynamicImport = (
  component: keyof typeof import('core_cafeteller/components')
) =>
  dynamic(
    () =>
      import('core_cafeteller/components').then((module) => module[component]),
    { ssr: false }
  )

const Button = dynamicImport('Button')
const CoffeeLoader = dynamicImport('CoffeeLoader')

export { Button, CoffeeLoader }
