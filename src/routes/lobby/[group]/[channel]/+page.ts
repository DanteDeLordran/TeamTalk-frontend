import type { Message } from '../../../../api/models/message.js'

export const load = async({fetch, params}) => {

    let token = ''
    let userId = ''
    const sessionToken = sessionStorage.getItem('token')
    const sessionUser = sessionStorage.getItem('user_id')

    if (sessionToken && sessionUser) {
        token = sessionToken
        userId = sessionUser
    }

    const fetchMessages = async(id : string) => {
        const res = await fetch('http://localhost:8000/messages/get/' + id, {
            headers: {
                token : token
            }
        })
        const data : Message[] = await res.json()
        return data
    }

    return {
        messages : await fetchMessages(params.channel),
        userId,
        channelId: params.channel,
        token
    }

}