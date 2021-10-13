import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  favIcon: HTMLLinkElement | null = document.querySelector('#favIcon');
  currentFavIconFrame: number = 0;
  favIconFrames: number = 38;
  searchCriteria: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchMinimized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  userAddress: BehaviorSubject<string | 0> = this.web3Service.userAddress;
  constructor(
    private web3Service: Web3Service
  ) {
    this.animateFavIcon();
  }

  animateFavIcon() {
    setInterval(() => {
      if (this.currentFavIconFrame <= this.favIconFrames) {
        this.changeFavIcon();
        this.currentFavIconFrame++;
      } else {
        this.currentFavIconFrame = 0;
      }
    }, 100);
  }

  changeFavIcon() {
    if (this.favIcon !== null) {
      this.favIcon.href = '../assets/logo-pngs/logo (' + (this.currentFavIconFrame + 1) + ').png';
    }
  }
}
