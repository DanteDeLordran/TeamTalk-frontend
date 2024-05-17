import { goto } from '$app/navigation'
import type { User } from '../../api/models/user.js'
export const load = async ({ fetch }) => {

    let token = ''
    const session = sessionStorage.getItem('token')
    const user : User = JSON.parse(sessionStorage.getItem('user')!)

    if (session) {
        token = session
    } else {
        goto('/')
    }

    return {
        token,
        user
    }

}