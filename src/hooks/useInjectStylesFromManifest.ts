import { useEffect } from 'react'

function useInjectStylesFromManifest() {
  useEffect(() => {
    const fetchManifestAndInjectStyles = async () => {
      let manifest: Record<string, string> = {}
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CORE_MF}/static/assets-manifest.json`
        )
        manifest = await res.json()

        console.log('Fetched manifest:', manifest)
      } catch (error) {
        console.error('Error fetching manifest:', error)
        return
      }

      const cssLinks = Object.keys(manifest)
        .filter((key) => key.endsWith('.css'))
        .map((key) => {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = `${process.env.NEXT_PUBLIC_CORE_MF}/${manifest[key]}?v=${Date.now()}`
          return link
        })

      cssLinks.forEach((link) => {
        // add document to top of head to ensure styles are loaded first
        document.head.insertBefore(link, document.head.firstChild)
      })
    }

    fetchManifestAndInjectStyles().then()
  }, []) // Empty dependency array ensures this runs only once after initial render
}

export default useInjectStylesFromManifest
