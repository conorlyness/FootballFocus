import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { Highlight } from 'src/app/types';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HighlightDialogComponent } from '../highlight-dialog/highlight-dialog.component';

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
  @ViewChild('content', { read: ElementRef }) topOfPage!: ElementRef;
  dataSource!: MatTableDataSource<Highlight>;
  private highlightsSubject!: Subject<Array<Highlight>>;
  highlightsObs$!: Observable<Array<Highlight>>;

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
        this.highlightsObs$ = this.highlightsSubject.asObservable();

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
    this.highlightsObs$ = this.highlightsSubject.asObservable();
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.filterSearch('');
  }

  openHighlight(embeddedVid: string, title: string) {
    const dialogRef = this.dialog.open(HighlightDialogComponent, {
      width: '950px',
      height: '550px',
      data: { video: embeddedVid, title: title },
    });

    dialogRef.afterClosed().subscribe();
  }

  scrollUp(): void {
    setTimeout(() =>
      this.topOfPage.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
