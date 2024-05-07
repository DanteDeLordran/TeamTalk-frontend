import type { Channel } from '../../../api/models/group.js'

export const load = async({params, fetch}) => {

    let token = ''
    const session = sessionStorage.getItem('token')

    if (session) {
        token = session
    }
    
    const fetchChannels = async(id: string) => {
        const res = await fetch('http://localhost:8000/channels/All/' + id, {
            headers: {
                token : token
            }
        })
        const data : Channel[] = await res.json()
        return data
    }

    const channels = await fetchChannels(params.group)

    return {
        channels
    }

}