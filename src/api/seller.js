import axios from '../axiosInstance';

export const signup = async ( body ) => {

    try{

        let { data } = await axios.post( "/user/register" , body , { withCredentials : true } )
        let payload = data.user

        return payload 

      }
      catch(error)
      {
        let { response } = error
        throw response
    }
  
}

export const signin = async ( body ) => {

    try{

        let { data } = await axios.post( "/user/login" , body )
        let payload = {
          ...data.user
        } 

        return payload 

    }
    catch(error)
    {
        let { response } = error
        throw response.data.message
    }


}

export const logout = async () => {

  try{
    let data = await axios.post( "/user/logout" , {} )
  }
  catch(error)
  {
    console.log(error)
  }

}
