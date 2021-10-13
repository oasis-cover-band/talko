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

  userAddress: BehaviorSubject<string> = this.web3Service.userAddress;
  approvedAddress: BehaviorSubject<boolean> = this.web3Service.approvedAddress;
  chainId: BehaviorSubject<number> = this.web3Service.chainId;

  constructor(
    private web3Service: Web3Service
  ) {
    setTimeout(() => {
      this.animateFavIcon();
    }, 2500);
  }

  animateFavIcon() {
    setInterval(() => {
      if (this.currentFavIconFrame < this.favIconFrames) {
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
