import { ElementRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HighlightDialogData } from 'src/app/types';

@Component({
  selector: 'app-highlight-dialog',
  templateUrl: './highlight-dialog.component.html',
  styleUrls: ['./highlight-dialog.component.scss'],
})
export class HighlightDialogComponent implements OnInit {
  @ViewChild('video')
  videoDiv!: ElementRef<HTMLElement>;

  constructor(
    public dialogRef: MatDialogRef<HighlightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HighlightDialogData
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.videoDiv.nativeElement.insertAdjacentHTML(
      'beforeend',
      this.data.video
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
