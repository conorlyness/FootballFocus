import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export interface DialogData {
  video: any;
}

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightsComponent implements OnInit, OnDestroy {
  search: string = '';
  matchHighlights: any[] = [];
  original!: any;
  isLoading: boolean = false;
  subscriptions = new Subscription();

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.api.getAllHighlights().subscribe((highlights: any) => {
        this.matchHighlights = highlights;
        this.original = highlights;
        this.isLoading = false;
      })
    );
  }

  filterSearch(search: any) {
    console.log(search);
    const result = this.original.filter((match: { title: any }) =>
      match.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log('the origional : ', this.original);
    this.matchHighlights = result;
    console.log(console.log('match hightlights : ', this.matchHighlights));
  }

  openHighlight(embeddedVid: any) {
    const dialogRef = this.dialog.open(HighlightDialog, {
      width: '950px',
      height: '750px',
      data: { video: embeddedVid },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-highlight.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightDialog implements OnInit {
  @ViewChild('video')
  videoDiv!: ElementRef<HTMLElement>;

  constructor(
    public dialogRef: MatDialogRef<HighlightDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
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
