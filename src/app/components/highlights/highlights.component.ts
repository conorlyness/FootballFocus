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
import { Subject, Subscription } from 'rxjs';
import { Highlight } from 'src/app/types';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  video: string;
  title: string;
}

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightsComponent implements OnInit, OnDestroy {
  search: string = '';
  matchHighlights: Highlight[] = [];
  original: Highlight[] = [];
  isLoading: boolean = false;
  subscriptions = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;
  dataSource!: MatTableDataSource<Highlight>;
  highlightsSubject!: Subject<Array<Highlight>>;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllHighlights();
  }

  getAllHighlights() {
    this.subscriptions.add(
      this.api.getAllHighlights().subscribe((highlights: Array<Highlight>) => {
        this.matchHighlights = highlights;
        this.original = highlights;

        this.dataSource = new MatTableDataSource<Highlight>(
          this.matchHighlights
        );
        this.dataSource.paginator = this.paginator;
        this.highlightsSubject = this.dataSource.connect();

        this.isLoading = false;
      })
    );
  }

  filterSearch(search: string) {
    const result = this.original.filter((match: { title: string }) =>
      match.title.toLowerCase().includes(search.toLowerCase())
    );

    this.matchHighlights = result;

    this.dataSource = new MatTableDataSource<Highlight>(this.matchHighlights);
    this.dataSource.paginator = this.paginator;
    this.highlightsSubject = this.dataSource.connect();
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.filterSearch('');
  }

  openHighlight(embeddedVid: string, title: string) {
    const dialogRef = this.dialog.open(HighlightDialog, {
      width: '950px',
      height: '550px',
      data: { video: embeddedVid, title: title },
    });

    dialogRef.afterClosed().subscribe();
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
