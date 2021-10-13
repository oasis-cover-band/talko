import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  
  userAddress: BehaviorSubject<string | 0> = this.siteService.userAddress;

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
  }

}
