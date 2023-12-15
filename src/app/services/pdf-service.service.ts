import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }

  private pageNumberSource = new BehaviorSubject<number>(1);
  currentPageNumber$ = this.pageNumberSource.asObservable();

  setPageNumber(pageNumber: number) {
    this.pageNumberSource.next(pageNumber);
  }

  
}
