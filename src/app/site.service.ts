import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  searchCriteria: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchMinimized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
