export interface Group {
    id: string
    name:         string;
    members:      Member[];
    roles:        Role[];
    creationDate: Date;
}

export interface Member {
    id:       string;
    name:     string;
    lastname: string;
    username: string;
    email:    string;
    accepted: boolean;
    banned:   boolean;
    rolename: string;
}

export interface Role {
    rolename:                   string;
    can_send_messages:          boolean;
    can_delete_messages:        boolean;
    can_modify_messages:        boolean;
    can_send_invitation:        boolean;
    can_revoke_invitation:      boolean;
    can_delete_others_messages: boolean;
    can_kick_others:            boolean;
    can_ban_others:             boolean;
    can_assign_roles:           boolean;
    can_manage_group:           boolean;
    can_delete_group:           boolean;
    can_accept_participants:    boolean;
}

export interface Channel {
    id:           string;
    group_id:     string;
    channel_name: string;
}

export interface ChannelRequest {
    group_id:     string;
    channel_name: string;
}