export class Company {
    constructor(
        public clientId: number,
        public companyGuid: string,
        public name: string,
        public companyId?: string
    ) { }
}