export const ApiUri = 'http://localhost:8000';

export namespace Routes {
    // User routes
    export const registerRoute = '/users/register';
    export const loginRoute = '/users/login';
    export const authenticateRoute = '/users/authenticate';
    export const updateUserRoute = '/users/edit'

    // Group routes
    export const createGroupRoute = '/groups/create';
    export const getUserGroupsRoute = '/groups/All';

    // Channel routes
    export const createChannelRoute = '/channels/create';
    export const getGroupChannelsRoute = '/channels/All/';

    // Message routes
    export const sendMessageRoute = '/messages/send';
    export const getChannelMessagesRoute = '/messages/get/';
    export const deleteMessageRoute = '/messages/delete/';

}