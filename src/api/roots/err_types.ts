export enum ErrTypes {
    NOT_PARTICIPANT,
    NOT_GIVEN_NAME,
}

export enum ErrRegister {
    NOT_VALID_PASSWORD,
    NOT_VALID_EMAIL,
    USER_EXISTS,
    SOME_EMPTY_FIELDS,
}

export enum ErrLogin {
    NOT_VALID_PASSWORD,
    NOT_VALID_EMAIL,
}

export enum ErrToken {
    NOT_GIVEN_TOKEN,
    NOT_VALID_TOKEN,
}

export enum ErrGroupCreate {
    NOT_GIVEN_TOKEN,
    NOT_VALID_TOKEN,
    NOT_GIVEN_NAME,
}

export enum ErrChannelCreate {
    NOT_GIVEN_TOKEN,
    NOT_VALID_TOKEN,
    EXISTING_CHANNEL,
}