import { browser, by, element, protractor, Key } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import * as fs from 'fs';
import * as sampleFile from './mspdeam-data.json';

/**
 * This class is for GENERAL functions, and all those that target components
 * from the moh-common-lib.  The long-term plan will be to move these over to
 * `moh-common-lib/testing` once created. That way different Angular projects
 * can use the same e2e starting board.
 */

export function getJSONData() {
    const input = process.argv.filter(x => x.startsWith('--data'));
    if (input.toString() !== '') {
        const filename = input.toString().split('=')[1];
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } else {
        return sampleFile;
    }
}

export class MSPDEAMBasePage extends AbstractTestPage {

    protected jsonData = getJSONData();
    protected index: number;

    setIndex(index: number) {
        this.index = index;
    }

    navigateTo() {
        return browser.get('');
    }

    clickContinue() {
        element(by.cssContainingText('button', ' Continue ')).click();
    }

    typeText(labelVal: string, text: string) {
        element(by.cssContainingText('label', `${labelVal}`)).element(by.xpath('../..'))
            .element(by.css('input')).sendKeys(text);
    }

    clickOption(legendVal: string, forVal: string) {
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..'))
            .element(by.css(`label[for^="${forVal}"]`)).click();
    }

    clickRadioButton(nameVal: string, forVal: string) {
        element(by.css(`common-radio[name^=${nameVal}]`)).element(by.css(`label[for^="${forVal}"]`)).click();
    }

    getData() {
        return this.jsonData;
    }

    getInputValue(labelVal: string) {
        return element(by.cssContainingText('label', `${labelVal}`)).element(by.xpath('../..')).element(by.css('input')).getAttribute('value');
    }

    getExtension() {
        return element(by.css('input[name="extension"]')).getAttribute('value');
    }
}

export class MSPDEAMHomePage extends MSPDEAMBasePage {

    navigateTo() {
      return browser.get('/msp/deam/home');
    }

    typeCaptcha(text: string) {
        element(by.css('input[id="answer"]')).sendKeys(text);
    }

    checkConsent() {
        element(by.css('label[for="agree"]')).click();
    }

    clickModalContinue() {
        element(by.css('button[type="submit"]')).click();
    }

    fillPage(index: number) {
        this.setIndex(index);
        this.typeCaptcha('irobot');
        this.checkConsent();
        this.clickModalContinue();
        this.clickContinue();
    }
}

export class MSPDEAMPersonalInfoPage extends MSPDEAMBasePage {

    navigateTo() {
      return browser.get('/msp/benefit/personal-info');
    }

    fillPage(index: number) {
        this.setIndex(index);
        this.typeText('First name', this.jsonData[this.index].facilityAdminFirstName);
        this.typeText('Last name', this.jsonData[this.index].facilityAdminLastName);
        this.typeText('Medical Services Plan Practitioner Number', this.jsonData[this.index].MSPPractitionerNum);
        this.typeText('Contact email (optional)', this.jsonData[this.index].emailAdd);
        this.typeText('Contact phone number', this.jsonData[this.index].phoneNum);
        this.typeText('Extension (optional)', this.jsonData[this.index].extension);
        browser.sleep(2000);
    }

    checkAdminInputValues(index: number) {
        this.getInputValue('First name').then(firstName => {
            expect(firstName).toBe(this.jsonData[this.index].facilityAdminFirstName, 'First name values should be the same');
        });
        this.getInputValue('Last name').then(lastName => {
            expect(lastName).toBe(this.jsonData[this.index].facilityAdminLastName, 'Last name values should be the same');
        });
        this.getInputValue('Medical Services Plan Practitioner Number').then(mspPracNum => {
            expect(mspPracNum).toBe(this.jsonData[this.index].MSPPractitionerNum, 'MSP Practitioner values should be the same');
        });
        this.getInputValue('Contact email (optional)').then(contactEmail => {
            expect(contactEmail).toBe(this.jsonData[this.index].emailAdd, 'Email address values should be the same');
        });
        this.getInputValue('Contact phone number').then(contactPhone => {
            expect(contactPhone.replace(/[^0-9]/g, '')).toBe(this.jsonData[this.index].phoneNum, 'Phone number values should be the same');
        });
    }
}

export class MSPDEAMSpouseInfoPage extends MSPDEAMBasePage {

  navigateTo() {
    return browser.get('msp/deam/spouse-info');
  }

  fillPage() {;
    this.addSpouse();
    this.continue();
  }

  addSpouse() {
      element(by.cssContainingText('button', 'Add Spouse')).click();
  }

}

export class MSPDEAMChildInfoPage extends MSPDEAMBasePage {

  navigateTo() {
    return browser.get('msp/deam/child-info');
  }

  fillPage() {;
    this.addSpouse();
    this.continue();
  }

  addSpouse() {
      element(by.cssContainingText('button', 'Add Child')).click();
  }

}

export class MSPDEAMContactInfoPage extends MSPDEAMBasePage {

  navigateTo() {
      return browser.get('/msp/deam/contact-info');
  }

  fillPage(index: number) {
      this.fillAddress(index);
      this.scrollDown();
      this.fillContactNumber(index);
      this.continue();
  }

  fillAddress(index: number) {
      element.all(by.css('common-street input')).sendKeys(this.jsonData[this.index].address);
      element.all(by.css('common-city input')).sendKeys(this.jsonData[this.index].city);
      element.all(by.css('common-postal-code input')).sendKeys(this.jsonData[this.index].postal);
  }

  fillContactNumber(index: number) {
      element(by.css('input[id^="phone"]')).sendKeys(this.jsonData[this.index].mobile);
  }

  clickIcon(classVal: string){
      element(by.css(`button i[class*="${classVal}"]`)).click();
  }

  checkAddressLine2(){
      return element(by.css('common-street[label="Address Line 2"]')).isPresent();
  }

  checkAddressLine3(){
      return element(by.css('common-street[label="Address Line 3"]')).isPresent();
  }

  checkProvince(){
      return element(by.css('common-province input')).getAttribute('value');
  }
}

export class MSPDDEReviewPage extends MSPDEAMBasePage {

    navigateTo() {
        return browser.get('msp/deam/review');
    }

    clickSubmit() {
        element(by.cssContainingText('button', ' Submit ')).click();
    }

    writeSignature() {
        element(by.cssContainingText('button', 'Sign')).click();
        element(by.css('canvas')).click();
        element(by.cssContainingText('button', 'Accept')).click();
    }

    fillPage(index: number) {
        this.setIndex(index);
        this.scrollDown();
        this.writeSignature();
        this.clickSubmit();
    }
}
