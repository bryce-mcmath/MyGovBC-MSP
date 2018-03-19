import { TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AccountPrepareComponent } from './prepare.component';
import { MspDataService } from '../../service/msp-data.service';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import {MspConsentModalComponent} from "../../common/consent-modal/consent-modal.component";
import {MspCancelComponent} from "../../common/cancel/cancel.component";
import {MspLoggerDirective} from "../../common/logging/msp-logger.directive";
import { MspLogService } from '../../service/log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProcessService } from "../../service/process.service";
import { MspApiService } from '../../service/msp-api.service';

import { CaptchaComponent } from "mygovbc-captcha-widget/src/app/captcha/captcha.component";
import { CaptchaDataService } from "mygovbc-captcha-widget/src/app/captcha-data.service";

describe('AccountPrepareComponent', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPrepareComponent, MspConsentModalComponent, MspCancelComponent, MspLoggerDirective, CaptchaComponent],
      imports: [FormsModule, HttpModule, RouterTestingModule, LocalStorageModule.withConfig({
          prefix: 'ca.bc.gov.msp',
          storageType: 'sessionStorage'
      })],
      providers: [MspDataService, MspLogService, ProcessService,
        LocalStorageService, CaptchaDataService, MspApiService
        
      ]
    })
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AccountPrepareComponent);
    expect(fixture.componentInstance instanceof AccountPrepareComponent).toBe(true, 'should create AccountPrepareComponent');

  });
})
