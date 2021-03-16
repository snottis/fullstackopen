import axios from 'axios'
import React, {useState, useEffect} from 'react'




export const useResource = (baseUrl) =>{
    const [resource, setResource] = useState([])

    useEffect(() => {
        axios.get(baseUrl).then(res => setResource(res.data))
    }, [baseUrl])

    const create = async (object, config) => {
        const res = await axios.post(baseUrl, object, config)
        setResource(resource.concat(res.data))
        return res.data
    }

    const update = async (id, object) => {
        const res = await axios.put(`${baseUrl}/${id}`, object)
        return res.data
    }

    return [resource, {create, update}]
}