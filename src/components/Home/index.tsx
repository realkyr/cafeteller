import React from 'react'

import withMeta from '@/hoc/withMeta'
import NavbarContainer from '@/components/ui/NavbarContainer'
import Footer from '@/components/ui/Footer'
import AllReview from '@/components/Home/_components/AllReview'
import RecentReview from '@/components/Home/_components/RecentReview'
import CarouselBanner from '@/components/Home/_components/CarouselBanner'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('./Layout'), { ssr: false })

function Home() {
  const container = React.useRef<HTMLDivElement | null>(null)

  return (
    <Layout
      outerRef={container}
      header={
        <>
          <NavbarContainer container={container} />
          <CarouselBanner />
          <RecentReview />
          <AllReview />
        </>
      }
      footer={<Footer />}
    />
  )
}

export default withMeta(Home, {
  title: 'Home',
  description: 'Because good cafés deserve a shout out',
  keywords: ['home', 'page', 'cafeteller'],
  'og:title': 'Home',
  'og:description': 'Because good cafés deserve a shout out',
  'og:type': 'website',
  'og:image': '/assets/Images/COVER1.jpg'
})
