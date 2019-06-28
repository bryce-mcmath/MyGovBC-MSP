import { Component, OnInit } from '@angular/core';
import { MspDataService } from '../../../../services/msp-data.service';
//import {ProcessService} from '../../service/process.service';
import { MspLogService } from '../../../../services/log.service';
import {
  ApplicantInformation,
  IApplicantInformation
} from '../../models/applicant-information.model';
import { Address } from 'moh-common-lib';
import {
  SpouseInformation,
  ISpouseInformation
} from '../../models/spouse-information.model';
import { ActivatedRoute } from '@angular/router';
import { AssistStateService } from '../../services/assist-state.service';

export interface IContactInformation {}

@Component({
  template: `
    <h1 tabindex="0">{{ title }}</h1>
    <button class="btn btn-default" onclick="window.print();return false;">
      <i class="fa fa-print fa-lg pointer" aria-hidden="true"></i>
      Print
    </button>
    <common-page-section layout="double">
      <msp-review-card-wrapper
        [title]="applicantTitle"
        [routerLink]="applicantLink"
      >
        <msp-review-part
          label="Years Selected"
          [value]="appYears"
        ></msp-review-part>
        <msp-review-part
          label="Name"
          [value]="applicantInfo.name"
        ></msp-review-part>
        <msp-review-part
          label="Birthdate"
          [value]="applicantInfo.birthDate"
        ></msp-review-part>
        <msp-review-part
          label="Personal Health Number"
          [value]="applicantInfo.phn"
        ></msp-review-part>
        <msp-review-part
          label="Social Insurance Number"
          [value]="applicantInfo.sin"
        ></msp-review-part>
        <msp-review-part
          label="Name"
          [value]="applicantInfo.appDocuments"
        ></msp-review-part>
      </msp-review-card-wrapper>
      <msp-review-card-wrapper
        [title]="contactTitle"
        [routerLink]="contactLink"
      >
        <h4>Mailing Address</h4>
        <msp-review-part
          label="Street Address"
          [value]="address.addressLine1"
        ></msp-review-part>
        <msp-review-part label="City" [value]="address.city"></msp-review-part>
        <msp-review-part
          label="Province"
          [value]="address.province"
        ></msp-review-part>
        <msp-review-part
          label="Postal Code"
          [value]="address.postal"
        ></msp-review-part>
        <msp-review-part
          label="Country"
          [value]="address.country"
        ></msp-review-part>
        <h4 class="mt-4">Contact</h4>
        <msp-review-part label="Phone Number" [value]="phone"></msp-review-part>
      </msp-review-card-wrapper>
      <aside>
        <msp-review-card-wrapper
          [title]="spouseTitle"
          [routerLink]="spouseLink"
          *ngIf="hasSpouse"
        >
          <msp-review-part
            label="Years had spouse"
            [value]="spouseYears"
          ></msp-review-part>
          <msp-review-part
            label="Documents"
            [value]="spouseInfo.documents"
          ></msp-review-part>
        </msp-review-card-wrapper>
      </aside>
    </common-page-section>

    <hr />
  `
})
export class AssistanceReviewComponent implements OnInit {
  title = 'Review your application';

  applicantTitle = 'Applicant Information';
  contactTitle = 'Contact Information';
  spouseTitle = 'Spouse Information';

  applicantLink = this.stateSvc.routes[1];
  contactLink = this.stateSvc.routes[3];
  spouseLink = this.stateSvc.routes[2];

  static ProcessStepNum = 3;

  hasSpouse = false;

  // lang = require('./i18n');
  // application: FinancialAssistApplication;
  applicantInfo: IApplicantInformation;
  spouseInfo: ISpouseInformation;
  address: Address;
  phone: string;

  constructor(
    private dataService: MspDataService,
    private route: ActivatedRoute,
    private stateSvc: AssistStateService
  ) {
    const app = this.dataService.finAssistApp;
    this.address = app.mailingAddress;
    this.applicantInformation();
    this.hasSpouse = app.hasSpouseOrCommonLaw;
    console.log(this.hasSpouse);
    this.hasSpouse ? this.spouseInformation() : (this.hasSpouse = false);
    this.phone = app.phoneNumber;
  }

  ngOnInit() {
    this.stateSvc.setIndex(this.route.snapshot.routeConfig.path);
  }

  applicantInformation() {
    const appInfo = new ApplicantInformation(this.dataService.finAssistApp);
    this.applicantInfo = appInfo.getData();
  }

  spouseInformation() {
    const spouseInfo = new SpouseInformation(this.dataService.finAssistApp);
    this.spouseInfo = spouseInfo.getData();
    this.hasSpouse = true;
  }

  get appYears() {
    return this.applicantInfo.years
      .map(itm => itm.toString())
      .reduce((a, b) => `${a}, ${b}`);
  }

  get spouseYears() {
    if (!this.spouseInfo.years) return;
    return this.spouseInfo.years
      .map(itm => itm.toString())
      .reduce((a, b) => `${a}, ${b}`);
  }
}
