import { goto } from '$app/navigation'
import type { Message } from '../../../../api/models/message.js'
import { Messages } from '../../../../api/roots/api_services.js'
import { ErrToken } from '../../../../api/roots/err_types.js'

export const load = async({fetch, params}) => {

    let token = ''
    let userId = ''
    const sessionToken = sessionStorage.getItem('token')
    const sessionUser = sessionStorage.getItem('user_id')

    if (sessionToken && sessionUser) {
        token = sessionToken
        userId = sessionUser
    }else{
        goto('/')
    }

    const messages_res = await Messages.getGroupMessages(params.channel, token);

    if (messages_res === ErrToken.NOT_GIVEN_TOKEN || messages_res === ErrToken.NOT_VALID_TOKEN) {
        alert('La sesión caducó, ¡Inicie sesión nuevamente!');
        sessionStorage.clear();
        goto('/');
        return;
    }

    return {
        messages : messages_res,
        userId,
        channelId: params.channel,
        token
    }

}