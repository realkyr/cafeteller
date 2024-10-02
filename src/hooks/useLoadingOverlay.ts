import { useAtom } from 'jotai'
import { loadingAtom } from '@/atom/loading'

const useLoadingOverlay = () => {
  const [, setLoading] = useAtom(loadingAtom)
  return setLoading
}

export default useLoadingOverlay
