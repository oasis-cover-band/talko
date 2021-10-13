import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SiteService } from '../site.service';
import { BehaviorSubject } from 'rxjs';
import { fadeDownAnimations } from '../animations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [ fadeDownAnimations ]
})
export class SearchBarComponent implements OnInit {

  @ViewChild('inputElement') inputElement!: ElementRef;
  placeholderText = 'Enter an NFT contract address (ETH only)';
  searchHidden: BehaviorSubject<boolean> = this.siteService.searchHidden;
  searchMinimized: BehaviorSubject<boolean> = this.siteService.searchMinimized;
  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
  }

  alertSiteService(event: any): void {
    this.siteService.searchCriteria.next(this.inputElement.nativeElement.value);
  }

}