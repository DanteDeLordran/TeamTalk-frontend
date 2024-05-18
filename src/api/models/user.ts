export interface User {
    id:       string;
    name:     string;
    lastname: string;
    username: string;
    email:    string;
}

export interface UserRequest {
    name:     string;
    lastname: string;
    username: string;
    email:    string;
}