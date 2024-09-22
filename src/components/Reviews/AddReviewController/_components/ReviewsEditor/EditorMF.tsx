import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Editor),
  { ssr: false }
)

export default Editor
