import { Company } from "app/shared/class/companyModel";

export class User {
    constructor(
        public email: string,
        public username: string,
        public userData?: UserData

    ) { }
}

export class UserData {
    constructor(
        public accessLevel?: AccessLevel,
        public company?: Company
    ) { }
}

export class AccessLevel {
    constructor(
        public level: number
    ) { }
}