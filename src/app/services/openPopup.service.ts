import { Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenPopupService {
  constructor(private renderer: Renderer2) {}

  private dialogRef = new BehaviorSubject<boolean>(false);
  currentDialogRef = this.dialogRef.asObservable();

  openDialog() {
    console.log('service = open');

    this.renderer.addClass(document.body, 'dialog-open');
    this.dialogRef.next(true);
  }

  closeDialog() {
    this.renderer.removeClass(document.body, 'dialog-open');
    this.dialogRef.next(false);
  }

  destroyRef() {
    throw new Error('Method not implemented.');
  }
}
