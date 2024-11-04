import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private dialogRef = new BehaviorSubject<boolean>(false);
  currentDialogRef = this.dialogRef.asObservable();

  openDialog() {
    this.dialogRef.next(true);
  }

  closeDialog() {
    this.dialogRef.next(false);
  }

  constructor() {}
}
