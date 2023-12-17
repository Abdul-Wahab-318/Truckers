import axios from '../axiosInstance';

export const signup = async ( body ) => {

    try{

        let { data } = await axios.post( "/register" , body )
        let payload = {
          token : data.token ,
          ...data.user
        }
        delete payload.password_confirmation 
        delete payload.password

        localStorage.setItem('token', payload.token) 

        return payload 

      }
      catch(error)
      {
        let { response } = error
        let errorMessage = response.data.message
        throw errorMessage
    }
  
}

export const signin = async ( body ) => {

    try{

        let { data } = await axios.post( "/login" , body )
        let payload = {
          token : data.token ,
          ...data.user
        }

        localStorage.setItem('token', payload.token)  

        return payload 

    }
    catch(error)
    {
        let { response } = error
        let errorMessage = response.data.error
        
        throw errorMessage
    }


}

export const logout = async () => {

  try{
    let token = localStorage.getItem('token')
    let data = await axios.post( "/logout" , {} , { headers : { Authorization : `Bearer ${token}` } } )
    localStorage.removeItem('token')
  }
  catch(error)
  {
    console.log(error)
  }

}
