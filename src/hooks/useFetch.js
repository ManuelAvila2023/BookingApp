import axios from "axios"
import { useState } from "react"

const useFetch = () => {

 const [response, setResponse] = useState() 

 const getApi = (url) => {
  axios.get(url)
    .then(res => setResponse(res.data))
    .catch(err => console.log(err))
 }  
 return [response, getApi]
}

export default useFetch