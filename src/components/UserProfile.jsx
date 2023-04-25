import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology,photography'

export default function UserProfile() {
  /* const [image, setImage] = useState("");  NO SE USA*/ 
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

 /*  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${
        import.meta.env.VITE_PIXABAY_KEY
      }&q=technology&image_type=photo&min_width=1600&min_height=900`
    )
      .then((response) => response.json())                          CODIGO QUE HICE PORQUE NO FUNCIONABA
      .then((data) => {                                             UNSPLASH, LUEGO ENTENDI COMO FUNCIONA
        setImage(data.hits[0].largeImageURL);                       Y AHORA ME DA PENA BORRARLO
        console.log(data);
      });
  }, []); */

  if (!user) {
    return <Spinner message="Loading Profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="banner"
              className="w-full h-[370px] 2xl:h-[510] shadow-lg object-cover"
            />
            <img src={user.image} className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover" alt="user" />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-10 right-0 p-2">
              {userId === user._id && (
                <button onClick={()=>{
                  googleLogout();
                }}
                className="bg-white b-2 rounded-full cursor-pointer outline-none shadow-md flex p-5 items-center justify-around"
                >
                  <AiOutlineLogout color='red' font-size={21}/>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
