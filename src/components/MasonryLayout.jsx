import Masonry from 'react-masonry-css'
import Pin from './Pin'

export default function MasonryLayout({pins}) {

  const breakPointObj = {
    default :4,
    3000:6,
    2000:5,
    1200:3,
    1000:2,
    500:1,
  }

  return (
    <Masonry clasName='flex animate-sidebar_open' breakpointCols={breakPointObj}>
      {pins?.map((pin)=>(<Pin key={pin._id} pin={pin} className='w-max'/>))}
    </Masonry>
  )
}

