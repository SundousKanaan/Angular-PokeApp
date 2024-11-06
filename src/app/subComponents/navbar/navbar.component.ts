import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  darkMode = false;

  openDialog() {
    if (this.dialogRef) {
      this.dialogRef.nativeElement.showModal();
      this.dialogRef.nativeElement.classList.remove('close');
      document.body.style.overflow = 'hidden';
    }
  }

  closeNavbar() {
    this.dialogRef.nativeElement.close();
    this.dialogRef.nativeElement.classList.add('close');
    document.body.style.overflow = '';
  }

  handleMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('darkMode');
  }
}
