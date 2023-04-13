import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

import { client} from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

export default function Feed() {
  const [loading, setLoading] = useState(true)

  if(lodaing) return <Spinner message="we are adding new ideas to your feed!"/>

  return (
    <div>Feed</div>
  )
}
