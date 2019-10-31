import * as faker from 'faker';

export class FakeDataEnrolment {

    private static seedVal: number = Math.floor(Math.random() * Math.floor(1000));

    contactInfo(): ContactPageTest {
        return {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            postal: faker.address.zipCode('?#? #?#'),
            mobile: faker.phone.phoneNumberFormat(2)
        };
    }

    personalInfo(): PersonalInfoPageTest {
        return {
            firstName: faker.name.firstName(),
            middleName: Math.random() > 0.5 ? faker.name.firstName() : undefined,
            lastName: faker.name.lastName(),
            birthDate: faker.date.between('1980-01-01', '1990-12-31'),
            arrivalDateBC:  faker.date.past(10),
        };
    }

    childInfo(): ChildInfoPageTest {
        return {
            firstName: faker.name.firstName(),
            middleName: Math.random() > 0.5 ? faker.name.firstName() : undefined,
            lastName: faker.name.lastName(),
            birthDate: faker.date.between('1980-01-01', '1990-12-31'),
            arrivalDateBC: faker.date.past(10),
            schoolName: faker.company.companyName(),
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            postal: faker.address.zipCode('?#? #?#'),
            departureDate: faker.date.between('1980-01-01', '1990-12-31'),
            completionDate: faker.date.between('2020-01-01', '2030-12-31')
        };
    }

    getSeed() {
        return FakeDataEnrolment.seedVal;
    }

    setSeed(seed = this.getSeed()) {
        faker.seed(seed);
    }
}

export interface ContactPageTest {
    street: string;
    city: string;
    postal: string;
    mobile: string;
}

export interface PersonalInfoPageTest {
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: Date;
    arrivalDateBC: Date;
}

export interface ChildInfoPageTest {
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: Date;
    arrivalDateBC: Date;
    schoolName: string;
    street: string;
    city: string;
    postal: string;
    departureDate: Date;
    completionDate: Date;
}
