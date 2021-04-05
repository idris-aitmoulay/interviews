export interface UserDetails {
    id: number;
    email: string;
}

export interface UserAuth {
    user: UserDetails;
    permissions: string[];
}
