import type LoginDTO from '../models/LoginDTO';
import type RegisterLocalInfo from '../models/RegisterLocalInfo';
import type { Channel, ChannelRequest, Group } from '../models/group';
import type { Message, MessageRequest } from '../models/message';
import type { User } from '../models/user';
import {ApiUri, Routes} from './api_routes';
import { ErrChannelCreate, ErrGroupCreate, ErrLogin, ErrRegister, ErrToken, ErrTypes } from './err_types';

export namespace Users {
   
    export async function register(registerInfo: RegisterLocalInfo): Promise<undefined | ErrRegister> {
        const route = Routes.registerRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(registerInfo)
        });

        if (res.status === 400) {
            const err_type = await res.json();
            switch (err_type.message) {
                case 'NOT_VALID_PASSWORD':
                    return ErrRegister.NOT_VALID_PASSWORD;
                case 'NOT_VALID_EMAIL':
                    return ErrRegister.NOT_VALID_EMAIL;
                case 'USER_EXISTS':
                    return ErrRegister.USER_EXISTS;
                case 'SOME_EMPTY_FIELDS':
                    return ErrRegister.SOME_EMPTY_FIELDS;
            }
        }

        return undefined;
    }

    export async function login(userLogin: LoginDTO): Promise<string | ErrLogin | undefined> {
        const route = Routes.loginRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        });

        if (res.status === 404) 
            return undefined;

        if (res.status === 400) {
            const err_type = await res.json();

            switch (err_type.message) {
                case 'NOT_VALID_EMAIL':
                    return ErrLogin.NOT_VALID_EMAIL;
                case 'NOT_VALID_PASSWORD':
                    return ErrLogin.NOT_VALID_PASSWORD;
            }
        }

        const token = await res.json();
        return token;

    }

    export async function authenticate(token: string): Promise<User | ErrToken> {
        const route = Routes.authenticateRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                token
            }
        });

        if (res.status === 400) {
            const err_type = await res.json();
            
            switch (err_type.message) {
                case 'NOT_GIVEN_TOKEN':
                    return ErrToken.NOT_GIVEN_TOKEN;
                case 'NOT_VALID_TOKEN':
                    return ErrToken.NOT_VALID_TOKEN;
            }
        }

        const user: User = await res.json();
        return user;

    }
}

export namespace Groups {
    export async function create(name: string, token: string): Promise<Group | ErrGroupCreate> {
        const route = Routes.createGroupRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                token
            },
            body: JSON.stringify({name: name})
        });

        if (res.status === 400) {
            const err_type = await res.json();
            switch (err_type.message) {
                case 'NOT_GIVEN_NAME':
                    return ErrGroupCreate.NOT_GIVEN_NAME;
                case 'NOT_VALID_TOKEN':
                    return ErrGroupCreate.NOT_VALID_TOKEN;
                case 'NOT_GIVEN_TOKEN':
                    return ErrGroupCreate.NOT_GIVEN_TOKEN;
            }
        }

        const group_result: Group = await res.json();
        group_result.creationDate = new Date(group_result.creationDate);

        return group_result;
    }
    
    export async function getUserGroups(token: string): Promise<Group[] | ErrToken> {
        const route = Routes.getUserGroupsRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                token
            }
        });

        if (res.status === 400) {
            const err_type = await res.json();

            switch(err_type) {
                case 'NOT_GIVEN_TOKEN':
                    return ErrToken.NOT_GIVEN_TOKEN;
                case 'NOT_VALID_TOKEN':
                    return ErrToken.NOT_VALID_TOKEN;
            }
        }

        const groups: Group[] = await res.json();

        for (let i = 0; i < groups.length; ++i) {
            const group = groups[i];
            group.creationDate = new Date(group.creationDate);
        }

        return groups;
    }
}

export namespace Channels {
    export async function create(channel: ChannelRequest, token: string): Promise<undefined | ErrChannelCreate> {
        const route = Routes.createChannelRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                token
            },
            body: JSON.stringify(channel)
        });

        if (res.status === 400) {
            const err_type = await res.json();
            switch (err_type.message) {
                case 'NOT_GIVEN_TOKEN':
                    return ErrChannelCreate.NOT_GIVEN_TOKEN;
                case 'NOT_VALID_TOKEN':
                    return ErrChannelCreate.NOT_VALID_TOKEN;
                case 'EXISTING_CHANNEL':
                    return ErrChannelCreate.EXISTING_CHANNEL;
            }
        }

        return undefined;
    }
    
    export async function getGroupChannels(group_id: string, token: string): Promise<Channel[] | ErrToken> {
        const route = Routes.getGroupChannelsRoute;
        const res = await fetch(`${ApiUri}${route}${group_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                token
            }
        });

        if (res.status === 400) {
            const err_type = await res.json();

            switch (err_type.message) {
                case 'NOT_GIVEN_TOKEN':
                    return ErrToken.NOT_GIVEN_TOKEN;
                case 'NOT_VALID_TOKEN':
                    return ErrToken.NOT_VALID_TOKEN;
            }
        }

        const channels: Channel[] = await res.json();
        return channels;
    }
}

export namespace Messages {
    export async function send(message: MessageRequest, token: string): Promise<Message | ErrToken> {
        const route = Routes.sendMessageRoute;
        const res = await fetch(`${ApiUri}${route}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                token
            },
            body: JSON.stringify(message)
        });

        if (res.status === 400) {
            const err_type = await res.json();

            switch(err_type.message) {
                case 'NOT_GIVEN_TOKEN':
                    return ErrToken.NOT_GIVEN_TOKEN;
                case 'NOT_VALID_TOKEN':
                    return ErrToken.NOT_VALID_TOKEN;
            }
        }

        const message_response: Message = await res.json();
        message_response.createdAt = new Date(message_response.createdAt);

        return message_response;
    }

    export async function getGroupMessages(channel_id: string, token: string) {
        const route = Routes.getChannelMessagesRoute;
        const res = await fetch(`${ApiUri}${route}${channel_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                token
            },
        });

        if (res.status === 400) {
            const err_type = await res.json();

            switch (err_type.message) {
                case 'NOT_GIVEN_TOKEN':
                    return ErrToken.NOT_GIVEN_TOKEN;
                case 'NOT_VALID_TOKEN':
                    return ErrToken.NOT_VALID_TOKEN;
            }
        }

        const messages: Message[] = await res.json();

        for (let i = 0; i < messages.length; ++i) {
            const message = messages[i];
            message.createdAt = new Date(message.createdAt);
        }

        return messages;
    }
}