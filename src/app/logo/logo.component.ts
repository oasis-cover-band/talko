import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  searchCriteria: BehaviorSubject<string> = this.siteService.searchCriteria;
  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
  }

}
