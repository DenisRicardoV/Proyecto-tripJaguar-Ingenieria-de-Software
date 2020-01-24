import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './number.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule,MatMenuModule , MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatFormFieldControl, MatInputModule, MatProgressBarModule, MatDialogModule, MatDialog, MatDialogRef, MatError, MatDatepickerModule, MatNativeDateModule, MatDatepickerInput, MatHorizontalStepper, MatStepperModule, MatExpansionModule, MatChipsModule, MatProgressSpinnerModule, MatGridListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './upload/upload.component';
import { NotifierModule } from 'angular-notifier';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhoneDirective } from './phone.directive';
import { MessageComponent } from './message/message.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    MatToolbarModule,

    MatMenuModule,
    BrowserAnimationsModule,

    MatButtonModule,

    MatSidenavModule,

    MatIconModule,
    MatFormFieldModule,

    MatListModule,

    MatCardModule,
    MatCheckboxModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    DragDropModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressBarModule,
    NotifierModule,
    MatStepperModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatGridListModule


  ],
  declarations: [NumberDirective, PhoneDirective, UploadComponent, NotFoundComponent, MessageComponent],
  exports:[NumberDirective, PhoneDirective,MessageComponent,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatNativeDateModule ,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,

    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    DragDropModule,
    MatProgressBarModule,
    MatDialogModule,
    UploadComponent,
    NotFoundComponent,
    MatDatepickerModule,
    MatStepperModule,
    NotifierModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    ChartsModule
  ]
  ,providers:[MatDialog, MatError,MatDatepickerInput]
})
export class SharedModule { }
