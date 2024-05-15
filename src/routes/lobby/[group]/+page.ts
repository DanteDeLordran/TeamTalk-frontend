import { goto } from '$app/navigation'
import type { Channel } from '../../../api/models/group.js'

export const load = async ({ params, fetch }) => {

    let token = ''
    const session = sessionStorage.getItem('token')

    if (session) {
        token = session
    } else {
        goto('/')
    }

    const fetchChannels = async (id: string) => {
        const res = await fetch('http://localhost:8000/channels/All/' + id, {
            headers: {
                token: token
            }
        })
        const data: Channel[] = await res.json()
        return data
    }

    const channels = await fetchChannels(params.group)
    const groupId = params.group

    return {
        channels,
        groupId,
        token
    }

}