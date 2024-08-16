import React from 'react'

const useViewport = () => {
  const [viewport, setViewport] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  React.useEffect(() => {
    const handleWindowResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return viewport
}

export default useViewport
