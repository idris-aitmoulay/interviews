import {RoleStatus} from "../../role/constants";

export interface UserDetails {
    id: number;
    email: string;
}

export interface UserAuth {
    user: UserDetails;
    permissions: string[];
    role: RoleStatus[]
}
