import { Component, Injectable , ViewChild, ViewChildren , QueryList, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountPersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { MspAccountMaintenanceDataService } from '../../services/msp-account-data.service';
import { MspAccountApp, AccountChangeOptions, UpdateList } from '../../models/account.model';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractForm, ContainerService, PageStateService } from 'moh-common-lib';
import { StatusInCanada, CanadianStatusReason, CanadianStatusStrings } from '../../../msp-core/models/canadian-status.enum';
import { Relationship } from '../../../../models/relationship.enum';
import { MspPerson } from '../../../../components/msp/model/msp-person.model';
import { BaseForm } from '../../models/base-form';
import { SupportDocuments } from '../../../msp-core/models/support-documents.model';
import {ProcessService} from '../../../../services/process.service';

@Component({
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})

@Injectable()
export class AccountPersonalInfoComponent extends BaseForm implements OnInit, AfterViewInit, OnDestroy {
  static ProcessStepNum = 0;
  lang = require('./i18n');
  docSelected: string ;
  //activitiesOpts: string[] = CanadianStatusReason;

  langStatus = CanadianStatusStrings;

  Activities: typeof CanadianStatusReason = CanadianStatusReason;
  @ViewChild('formRef') form: NgForm;
  @ViewChildren(AccountPersonalDetailsComponent) personalDetailsComponent: QueryList<AccountPersonalDetailsComponent>;
  public buttonstyle: string = 'btn btn-default';
  accountApp: MspAccountApp;
  accountChangeOptions: AccountChangeOptions;
  accountHolderTitle: string = 'Account Holder Identification';
  accountHolderSubtitle: string = 'Please provide the Account Holder’s personal information for verification purposes.';
  person: MspPerson;
  updateList: UpdateList[];
  subscriptions: Subscription[];

  constructor(public dataService: MspAccountMaintenanceDataService,
              protected router: Router,
              protected pageStateService: PageStateService,
              protected containerService: ContainerService,
              protected _processService: ProcessService
              // private _processService: ProcessService,
              ) {
    super(router, containerService, pageStateService, _processService);
  }

  onChange($event) {
    //this.dataService.saveMspAccountApp();
  }

  ngOnInit() {
    this.accountApp = this.dataService.accountApp;
    this.accountChangeOptions = this.dataService.accountApp.accountChangeOptions;
    this.person = this.dataService.accountApp.applicant;
    this.initProcessMembers(AccountPersonalInfoComponent.ProcessStepNum, this._processService);
    this._processService.setStep(AccountPersonalInfoComponent.ProcessStepNum, false);
    //this.initProcessMembers( this._processService.getStepNumber(ProcessUrls.ACCOUNT_PERSONAL_INFO_URL), this._processService);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(itm => itm.unsubscribe());
  }

  ngAfterViewInit() {
    if (this.form) {
      this.subscriptions = [
        this.form.valueChanges.pipe(
          debounceTime(100)
        ).subscribe(() => {
          this.dataService.saveMspAccountApp();
        })
      ];
    }
  }

  get applicant(): MspPerson {
    return this.dataService.accountApp.applicant;
  }

  get spouse(): MspPerson {
    return this.dataService.getMspAccountApp().updatedSpouse;
  }

  get children(): MspPerson[] {
      return this.dataService.getMspAccountApp().updatedChildren;
  }

  immigrationStatusChange(event: boolean) {
    this.accountChangeOptions.immigrationStatusChange = event;
    //  this.dataService.saveMspAccountApp();
  }

  addUpdateSpouse = () => {
    const sp: MspPerson = new MspPerson(Relationship.Spouse);
    this.dataService.getMspAccountApp().addUpdatedSpouse(sp);
  }

  /*
  If the application contains any Visting status , application shouldnt be sumbitted
   */
  hasAnyInvalidStatus(): boolean {
    if (!this.dataService.getMspAccountApp().accountChangeOptions.statusUpdate) {
      return false;
    }
    return this.dataService.getMspAccountApp().hasAnyVisitorInApplication();
  }

  isPhnUniqueInPI() {
    return this.dataService.accountApp.isUniquePhnsInPI ;
  }

  isValid(): boolean {
    return this.dataService.accountApp.isUniquePhnsInPI ;
  }

  statusLabel(): string {
    return 'You Status in Canada';
  }

  setStatus(value: StatusInCanada, p: MspPerson) {
    if (typeof value === 'object') return;
    p.status = value;
    p.currentActivity = null;

    if (p.status !== StatusInCanada.CitizenAdult) {
      p.institutionWorkHistory = 'No';
    }
  }

  changeUpdatingPersonalInfo(value: boolean) {
    this.person.updatingPersonalInfo = value;
    this.accountChangeOptions.personInfoUpdate = !!value;

    if (this.person.updatingPersonalInfo === false) {
      // Uncheck update checkboxes.
      this.person.updateStatusInCanada = false;
      this.person.updateNameDueToMarriage = false;
      this.person.updateNameDueToNameChange = false;
      this.person.updateGender = false;
      this.person.updateNameDueToError = false;
      this.person.updateBirthdate = false;
      this.person.updateGenderDesignation = false;

      // Reset extra fields.
      this.person.status = undefined;
      this.person.updateNameDueToMarriageRequestedLastName = '';
      this.person.updateGenderAdditionalDocs = null;
      this.person.updateGenderAdditionalDocs2 = null;

      // Reset all uploaded images.
      this.person.nameChangeDocs = new SupportDocuments();
      this.person.nameChangeAdditionalDocs = new SupportDocuments();
      this.person.updateStatusInCanadaDocType = new SupportDocuments();
      this.person.updateNameDueToMarriageDocType = new SupportDocuments();
      this.person.updateNameDueToNameChangeDocType = new SupportDocuments();
      this.person.updateGenderDocType = new SupportDocuments();
      this.person.updateGenderDocType2 = new SupportDocuments();
      this.person.updateGenderDocType3 = new SupportDocuments();
      this.person.updateNameDueToErrorDocType = new SupportDocuments();
      this.person.updateBirthdateDocType = new SupportDocuments();
      this.person.updateGenderDesignationDocType = new SupportDocuments();
    }
  }

  hasAnyUpdateSelected(): boolean {
    if (this.person.updatingPersonalInfo === true){
      return (this.person.updateStatusInCanada === true ||
        this.person.updateNameDueToMarriage === true ||
        this.person.updateNameDueToNameChange === true ||
        this.person.updateGender === true ||
        this.person.updateNameDueToError === true ||
        this.person.updateBirthdate === true ||
        this.person.updateGenderDesignation === true);
    } else {
      return true;
    }
  }

  checkDocuments() {
    let valid = true;
    if (this.person.updateStatusInCanada === true && this.person.updateStatusInCanadaDocType.images) {
      valid = valid && this.person.updateStatusInCanadaDocType.images.length > 0;
    }

    if (this.person.updateNameDueToMarriage === true && this.person.updateNameDueToMarriageDocType.images) {
      valid = valid && this.person.updateNameDueToMarriageDocType.images.length > 0;
    }

    if (this.person.updateNameDueToNameChange === true && this.person.updateNameDueToNameChangeDocType.images) {
      valid = valid && this.person.updateNameDueToNameChangeDocType.images.length > 0;
    }

    if (this.person.updateGender === true && this.person.updateGenderDocType.images) {
      valid = valid && this.person.updateGenderDocType.images.length > 0;
      if (this.person.updateGenderAdditionalDocs === true && this.person.updateGenderDocType2.images) {
        valid = valid && this.person.updateGenderDocType2.images.length > 0;
      }
      if (this.person.updateGenderAdditionalDocs2 === true && this.person.updateGenderDocType3.images) {
        valid = valid && this.person.updateGenderDocType3.images.length > 0;
      }
    }

    if (this.person.updateNameDueToError === true && this.person.updateNameDueToErrorDocType.images) {
      valid = valid && this.person.updateNameDueToErrorDocType.images.length > 0;
    }

    if (this.person.updateBirthdate === true && this.person.updateBirthdateDocType.images) {
      valid = valid && this.person.updateBirthdateDocType.images.length > 0;
    }

    // Check additional radio buttons and documents for gender designation
    if (this.person.updateGender === true && this.person.updateGenderDocType.images) {
      valid = valid && this.person.updateGenderDocType.images.length > 0;
      valid = valid && this.isSet(this.person.updateGenderAdditionalDocs);
      if (this.person.updateGenderAdditionalDocs) {
        valid = valid && this.person.updateGenderDocType2.images && this.person.updateGenderDocType2.images.length > 0;
        valid = valid && this.isSet(this.person.updateGenderAdditionalDocs2);
        if (this.person.updateGenderAdditionalDocs2) {
          valid = valid && this.person.updateGenderDocType3.images && this.person.updateGenderDocType3.images.length > 0;
        }
      }
    }

    return valid;
  }

  canContinue(): boolean {
    const valid = super.canContinue()
                  && this.person.updatingPersonalInfo !== undefined
                  && this.hasAnyUpdateSelected()
                  && this.checkDocuments();
    if (valid === false){
      this._processService.setStep(AccountPersonalInfoComponent.ProcessStepNum, false);
    }
    return valid;
  }

  continue(): void {
    if (!this.canContinue()) {
      console.log('Please fill in all required fields on the form.');
      this.markAllInputsTouched();
      return;
    }
    this._processService.setStep(AccountPersonalInfoComponent.ProcessStepNum, true);
    this.navigate('/deam/spouse-info');
  }
}
