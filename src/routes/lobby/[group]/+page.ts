import { goto } from '$app/navigation'
import type { Channel } from '../../../api/models/group.js'
import { Channels } from '../../../api/roots/api_services.js'
import { ErrToken } from '../../../api/roots/err_types.js'

export const load = async ({ params, fetch }) => {

    let token = ''
    const session = sessionStorage.getItem('token')

    if (session) {
        token = session
    } else {
        goto('/')
    }

    let channels: Channel[] = []

    const channel_res = await Channels.getGroupChannels(params.group, token);

    if (channel_res === ErrToken.NOT_GIVEN_TOKEN || channel_res === ErrToken.NOT_VALID_TOKEN) {
        alert('La sesión caducó, ¡Vuelva a iniciar sesión!');
        sessionStorage.clear();
        return;
    }

    channels = channel_res;

    const groupId = params.group

    return {
        channels,
        groupId,
        token
    }

}