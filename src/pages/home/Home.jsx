import React from 'react'
import Layout from '../../componets/layout/Layout'
import HeroSection from '../../componets/herosection/HeroSection'
import Images from '../../assets/Images'
import Categroy from '../../componets/catgeory/Categroy'
import HomepageproductCard from '../../componets/homepageproductcard/HomepageproductCard'
import Track from '../../componets/track/Track'
import Testimoinal from '../../componets/testimoinal/Testimoinal'
import Loder from '../../componets/loder/Loder'

function Home() {

  return (
    <Layout>
        <HeroSection/>
        <Categroy/>
        <HomepageproductCard/>
        <Track/>
        <Testimoinal/>
        {/* <Loder/> */}
    </Layout>
  )
}

export default Home