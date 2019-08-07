import { browser } from 'protractor';
import { FakeDataRetroPA } from './mspretro-pa.data';
import { HomePage, PersonalInfoPage, SpouseInfoPage, ContactInfoPage, ReviewPage, AuthorizePage } from './mspretro-pa.po';   
import { fillConsentModal } from '../../msp-generic-tests';

fdescribe('MSP Retro PA - End to End Test (Happy Path)', () => {
    let homePage: HomePage;
    let personalPage: PersonalInfoPage;
    let spousePage: SpouseInfoPage;
    let contactPage: ContactInfoPage;
    let reviewPage: ReviewPage;
    let authorizePage: AuthorizePage;

    const data = new FakeDataRetroPA;
    let personalInfoData;
    let contactData;

    const HOME_PAGE_URL = `msp/assistance/home`;
    const PERSONAL_PAGE_URL = `msp/assistance/personal-info`;
    const SPOUSE_PAGE_URL = `msp/assistance/spouse`;
    const CONTACT_PAGE_URL = `msp/assistance/contact`;
    const REVIEW_PAGE_URL = `msp/assistance/review`;
    const AUTHORIZE_PAGE_URL = `msp/assistance/authorize-submit`;
    const CONFIRMATION_PAGE_URL = `msp/assistance/confirmation`;

    beforeEach(() => {
        homePage = new HomePage();
        personalPage = new PersonalInfoPage();
        spousePage = new SpouseInfoPage();
        contactPage = new ContactInfoPage();
        reviewPage = new ReviewPage();
        authorizePage = new AuthorizePage();
        personalInfoData = data.personalInfo();
        contactData = data.contactInfo();
        data.setSeed();
    });

    afterEach(() => {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('01. User selects one tax year and has a spouse', () => {
        fillConsentModal(HOME_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'should navigate to the Home Page');
        homePage.fillPage();
        expect(browser.getCurrentUrl()).toContain(PERSONAL_PAGE_URL, 'should continue to the Personal Info Page');
        personalPage.fillPersonalInfoPage(personalInfoData);
        personalPage.continue();
        expect(browser.getCurrentUrl()).toContain(SPOUSE_PAGE_URL, 'should continue to the Spouse Info Page');
        spousePage.fillSpouseInfoPage();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL, 'should continue to the Contact Info Page');
        contactPage.fillContactInfoPage(contactData);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should contunue to the Authorization Page');
        authorizePage.fillPage();
        authorizePage.continue();
        browser.sleep(30000);
        expect(browser.getCurrentUrl()).toContain(CONFIRMATION_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

    it('02. User selects two tax years and has a spouse', () => {
        fillConsentModal(HOME_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'should navigate to the Home Page');
        homePage.selectYear('2018');
        homePage.selectYear('2017');
        homePage.continue();
        expect(browser.getCurrentUrl()).toContain(PERSONAL_PAGE_URL, 'should continue to the Personal Info Page');
        personalPage.fillPersonalInfo(personalInfoData);
        personalPage.uploadOneFileWithYear('2018');
        personalPage.uploadOneFileWithYear('2017');
        personalPage.continue();
        expect(browser.getCurrentUrl()).toContain(SPOUSE_PAGE_URL, 'should continue to the Spouse Info Page');
        spousePage.fillSpouseInfoPage();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL, 'should continue to the Contact Info Page');
        contactPage.fillContactInfoPage(contactData);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should contunue to the Authorization Page');
        authorizePage.fillPage();
        authorizePage.continue();
        browser.sleep(15000);
        expect(browser.getCurrentUrl()).toContain(CONFIRMATION_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

    it('03. User selects multiple tax years and has a spouse', () => {
        fillConsentModal(HOME_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'should navigate to the Home Page');
        homePage.fillPageWithMultipleYears();
        expect(browser.getCurrentUrl()).toContain(PERSONAL_PAGE_URL, 'should continue to the Personal Info Page');
        personalPage.fillPersonalInfo(personalInfoData);
        personalPage.uploadMultipleFiles(2013, 2018);
        personalPage.continue();
        expect(browser.getCurrentUrl()).toContain(SPOUSE_PAGE_URL, 'should continue to the Spouse Info Page');
        spousePage.fillSpouseInfoPage();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL, 'should continue to the Contact Info Page');
        contactPage.fillContactInfoPage(contactData);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should contunue to the Authorization Page');
        authorizePage.fillPage();
        authorizePage.continue();
        browser.sleep(15000);
        expect(browser.getCurrentUrl()).toContain(CONFIRMATION_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

    it('04. User has NO spouse', () => {
        fillConsentModal(HOME_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'should navigate to the Home Page');
        homePage.fillPage();
        expect(browser.getCurrentUrl()).toContain(PERSONAL_PAGE_URL, 'should continue to the Personal Info Page');
        personalPage.fillPersonalInfoPage(personalInfoData);
        personalPage.continue();
        expect(browser.getCurrentUrl()).toContain(SPOUSE_PAGE_URL, 'should continue to the Spouse Info Page');
        spousePage.continue();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL, 'should continue to the Contact Info Page');
        contactPage.fillContactInfoPage(contactData);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should contunue to the Authorization Page');
        authorizePage.fillPage();
        authorizePage.continue();
        browser.sleep(15000);
        expect(browser.getCurrentUrl()).toContain(CONFIRMATION_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

    it('05. User selects two tax years and spouse checks and unchecks the second year', () => {
        fillConsentModal(HOME_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'should navigate to the Home Page');
        homePage.selectYear('2018');
        homePage.selectYear('2017');
        homePage.continue();
        expect(browser.getCurrentUrl()).toContain(PERSONAL_PAGE_URL, 'should continue to the Personal Info Page');
        personalPage.fillPersonalInfo(personalInfoData);
        personalPage.uploadOneFileWithYear('2018');
        personalPage.uploadOneFileWithYear('2017');
        personalPage.continue();
        expect(browser.getCurrentUrl()).toContain(SPOUSE_PAGE_URL, 'should continue to the Spouse Info Page');
        spousePage.clickButton('btn', 'Add Spouse');
        spousePage.selectYear('2018');
        spousePage.uploadOneFile();
        spousePage.selectYear('2017');
        spousePage.selectYear('2017');
        spousePage.continue();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL, 'should continue to the Contact Info Page');
        contactPage.fillContactInfoPage(contactData);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should contunue to the Authorization Page');
        authorizePage.fillPage();
        authorizePage.continue();
        browser.sleep(15000);
        expect(browser.getCurrentUrl()).toContain(CONFIRMATION_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

    /*
    it('should be able to successfully pass test for maximum length for each field', () => {
        let personalInfoData = data.personalInfoMax();
        fillConsentModal(HOME_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'should navigate to the Home Page');
        homePage.fillPage();
        expect(browser.getCurrentUrl()).toContain(PERSONAL_PAGE_URL, 'should continue to the Personal Info Page');
        personalPage.fillPersonalInfoPage(personalInfoData);
        personalPage.continue();
        expect(browser.getCurrentUrl()).toContain(SPOUSE_PAGE_URL, 'should continue to the Spouse Info Page');
        spousePage.fillSpouseInfoPage();
        browser.sleep(10000);
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL, 'should continue to the Contact Info Page');
        contactPage.fillContactInfoPage(contactData);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should contunue to the Authorization Page');
        authorizePage.fillPage();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);
    */

});