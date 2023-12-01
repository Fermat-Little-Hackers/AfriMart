
import axios from "axios"
import {useQuery} from "react-query"
export default function useFetchURI(uri :string) {

 const API=`https://ipfs.io/ipfs/${uri}/metadata.json`

console.log(uri)
 const getUri = async () =>{
    return await axios.get(API).then((res)=>
     res.data
   )
 }

 const{data, isLoading, isError} = useQuery(['URI',uri], getUri)
 return{data, isLoading, isError}

}


