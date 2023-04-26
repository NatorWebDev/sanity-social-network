import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { fetchUser } from "../utils/fetchUser";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,technology,photography";

const activeBtnStyles = 'bg-red-500 mx-2 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-[#ddddee] mx-2 text-black font-bold p-2 rounded-full w-20 outline-none'

export default function UserProfile() {
  /* const [image, setImage] = useState("");  NO SE USA*/
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const activeUser = fetchUser();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(()=>{
    if(activeBtn==='created'){
      const createdPinsQuery = userCreatedPinsQuery(userId)
      client.fetch(createdPinsQuery)
      .then((data)=>{
        setPins(data)
      })
    }else{
      const savedPinsQuery = userSavedPinsQuery(userId)
      client.fetch(savedPinsQuery)
      .then((data)=>{
          setPins(data)
      })
    }
  },[text,userId])

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

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              alt="user"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-10 right-0 p-2">
              {userId == activeUser?.sub && (
                <button
                  onClick={logout}
                  className="bg-white b-2 rounded-full cursor-pointer outline-none shadow-md flex p-5 items-center justify-around"
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
              {pins?.length ? (
                <div className="px-2">
                  <MasonryLayout pins={pins}/>
                </div>  
              ):(
                <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                  No Pins Found!
                </div>
              )}

        </div>
      </div>
    </div>
  );
}
