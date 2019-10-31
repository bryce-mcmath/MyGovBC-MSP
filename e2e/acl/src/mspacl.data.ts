import * as faker from 'faker';
import * as fs from 'fs';

export class FakeDataACL {
    public PHN = 9999999998;
    public birthDate = faker.date.past();
    public postal = faker.address.zipCode('?#? #?#');

}

// Note - we can re-use this method in non-ACL applications too.
export function getJSONData() {
    const x = process.argv;
    const input = process.argv.filter(x => x.startsWith('--data'));
    if (input.toString() !== '') {
        const filename = input.toString().split('=')[1];
        const data = fs.readFileSync(filename, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } else {
        return null;
    }
}
export interface PersonalInfoPageTest {
    PHN: number;
    birthDate: Date;
    postal: string
}
