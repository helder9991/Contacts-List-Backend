interface IUpdateContactDTO {
    id: number;
    name: string;
    yearsOld: number;
    phoneNumbers: [{
        id: number;
        number: string;
    }]
}

export { IUpdateContactDTO };
