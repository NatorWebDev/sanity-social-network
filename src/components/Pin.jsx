import { urlFor } from "../client";


export default function Pin({pin:{postedBy,image,_id,destination}}) {
  return (
    <div>
        <img src={urlFor(image).width(250).url()} alt="user-post" className="rounded-lg w-full" />
    </div>
  )
}
