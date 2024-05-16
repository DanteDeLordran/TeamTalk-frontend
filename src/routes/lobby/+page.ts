import { goto } from '$app/navigation'
export const load = async ({ fetch }) => {

    let token = ''
    const session = sessionStorage.getItem('token')

    if (session) {
        token = session
    } else {
        goto('/')
    }

    return {
        token
    }

}