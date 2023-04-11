import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {client} from '../client'

export default function Login() {
  const navigate = useNavigate()

  const responseGoogle = (credentialResponse) => {
    //decodificamps la respuesta y almacenamos los datos del usuario en localstorage
    const decode = jwt_decode(credentialResponse.credential)
    localStorage.setItem('user',JSON.stringify(decode))

    //deconstruimos el nombre, el googleid y la foto del usuario del objeto
    const {name,sub,picture} = decode;
    
    //creamos un objeto de sanity para un nuevo usuario(ver backend/schemas/user.js)
    const doc = {
      _id:sub,
      _type:'user',
      userName:name,
      image:picture
    }
    client.createIfNotExists(doc).then(()=>{
      navigate('/',{replace:true})
    })
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 left-0 bg-[#00000070] w-full h-full">
          <div className="p-5">
            <img src={logo} />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
