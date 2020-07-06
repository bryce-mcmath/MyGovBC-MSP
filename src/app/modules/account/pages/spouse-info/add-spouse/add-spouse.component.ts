import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountChangeOptions, MspAccountApp, UpdateList } from 'app/modules/account/models/account.model';
import { MspAccountMaintenanceDataService } from '../../../services/msp-account-data.service';
import { CanadianStatusStrings, StatusInCanada } from 'app/modules/msp-core/models/canadian-status.enum';
import { SupportDocuments } from 'app/modules/msp-core/models/support-documents.model';
import { nameChangeSupportDocuments } from 'app/modules/msp-core/components/support-documents/support-documents.component';
import { nameChangeSupportDocs } from 'app/modules/msp-core/components/support-documents/support-documents.component';
import { SupportDocumentTypes } from 'app/modules/msp-core/models/support-documents.enum';
import { Base } from 'moh-common-lib';
import { MspPerson } from '../../../../../components/msp/model/msp-person.model';
import { isAfter } from 'date-fns';

@Component({
  selector: 'msp-add-spouse',
  templateUrl: './add-spouse.component.html',
  styleUrls: ['./add-spouse.component.scss']
})
export class AddSpouseComponent extends Base implements OnInit {

  @Input() accountChangeOptions: AccountChangeOptions;
  @Input() spouse: MspPerson;
  @Input() accountApp: MspAccountApp;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  status: StatusInCanada[] = [
    StatusInCanada.CitizenAdult,
    StatusInCanada.PermanentResident
  ];
  supportDocList: SupportDocumentTypes[] = [
    SupportDocumentTypes.CanadianBirthCertificate,
    SupportDocumentTypes.CanadianPassport,
    SupportDocumentTypes.CanadianCitizenCard
  ];

  langStatus = CanadianStatusStrings;
  nameChangeDocList = nameChangeSupportDocuments();
  spouseNameChangeDocList = nameChangeSupportDocs();

  constructor(public dataService: MspAccountMaintenanceDataService) {
    super();
  }

  ngOnInit() {
    //this.spouse = this.dataService.accountApp.spouse;
    this.accountApp = this.dataService.accountApp;
  }

  setGender(evt: any) {
    this.spouse.gender = evt;
    this.onChange.emit(evt);
  }

  setUpdateNameDueToMarriage(evt: any) {
    this.spouse.updateNameDueToMarriage = evt;
    this.onChange.emit(evt);
  }

  get updateNameDueToMarriage(){
    return this.spouse.updateNameDueToMarriage
  }

  get marriageDateError() {
    return this.spouse.dateOfBirth !== undefined && this.spouse.marriageDate !== undefined
      && this.spouse.dateOfBirth !== null && this.spouse.marriageDate !== null
      && isAfter(this.spouse.dateOfBirth, this.spouse.marriageDate);
  }

  get items() {
    return [
      {
        'label': 'Marriage certificate',
        'value': SupportDocumentTypes.MarriageCertificate
      },
      {
        'label': 'Legal Name Change Certificate',
        'value': SupportDocumentTypes.ChangeOfNameCertificate
      }
    ];
  }

  get hasStatus() {
    // Has to have values
    return this.spouse.status !== undefined;
  }

  get statusDocuments(): SupportDocuments {
    return this.spouse.updateStatusInCanadaDocType;
  }

  set statusDocuments(document: SupportDocuments) {
    this.spouse.updateStatusInCanadaDocType = document;
    if (document.images && document.images.length === 0) {
      // no status documents remove any name documents
      this.spouse.nameChangeDocs.documentType = null;
      this.spouse.nameChangeDocs.images = [];
    }
  }

  isPhnUniqueInPI() {
    return this.dataService.accountApp.isUniquePhnsInPI;
  }

  get phnList() {
    return [this.accountApp.applicant.previous_phn];
  }

  get accountUpdateList(): UpdateList[] {
    return [
      {
        'label': 'Update status in Canada',
        'value': this.spouse.updateStatusInCanada
      },
      {
        'label': 'Update name - due to marriage or other',
        'value': this.spouse.updateNameDueToMarriage
      },
      {
        'label': 'Correct name - due to error',
        'value': this.spouse.updateNameDueToError
      },
      {
        'label': 'Correct birthdate',
        'value': this.spouse.updateBirthdate
      },
      {
        'label': 'Correct gender',
        'value': this.spouse.updateGender
      },
      {
        'label': 'Change gender designation',
        'value': this.spouse.updateGenderDesignation
      }
    ];
  }

  get spouseNameChangedocs() {
    return [
      {
        'label': 'Marriage Certificate',
        'value': SupportDocumentTypes.MarriageCertificate
      },
      {
        'label': 'Legal Name Change Certificate',
        'value': SupportDocumentTypes.ChangeOfNameCertificate
      }
    ];
  }
}
