import * as faker from 'faker';
import * as fs from 'fs';

export class FakeDataACL {

    private static seedVal: number = Math.floor(Math.random() * Math.floor(1000));
    public hasJsonData: boolean = false;

    personalInfo(): PersonalInfoPageTest {
        return {
            PHN: 9999999998,
            birthDate: faker.date.past(),
            postal: faker.address.zipCode('?#? #?#')
        }
    }

    getSeed() {
        return FakeDataACL.seedVal;
    }

    setSeed(seed = this.getSeed()) {
        faker.seed(seed);
    }

    getJSONData() {
        const x = process.argv;
        const input = process.argv.filter(x => x.startsWith('--data'));
        if (input.toString() !== '') {
            const filename = input.toString().split('=')[1];
            const data = fs.readFileSync(filename, 'utf8');
            const jsonData = JSON.parse(data);
            this.hasJsonData = true;
            return jsonData;
        } else {
            return null;
        }
    }
}

export interface PersonalInfoPageTest {
    PHN: number;
    birthDate: Date;
    postal: string
}
