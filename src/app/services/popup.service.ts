import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  destroyRef() {
    throw new Error('Method not implemented.');
  }
  private dialogRef = new BehaviorSubject<boolean>(false);
  currentDialogRef = this.dialogRef.asObservable();

  openDialog() {
    document.body.style.overflow = 'hidden';
    this.dialogRef.next(true);
  }

  closeDialog() {
    document.body.style.overflow = '';
    this.dialogRef.next(false);
  }

  constructor() {}
}
