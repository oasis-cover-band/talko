import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';
declare const window: any;
const GenericNFTABI = require('../assets/abi/GenericNFTABI.json');
// import contract abi here // most NFT contracts will use ERC-721 or I belive 1151 standard so it will all have the function to pull JSON for the collection

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  // ****************   SITE VARIABLES   *********************** //
  listeningForAccountChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // (IS THIS INSTANCE LISTENING FOR USER ACCOUNT CHANGES?) - ON INIT, NO, IT'S NOT. =)
  // ****************  WEB 3 VARIABLES   *********************** //
  web3!: Web3; // WEB3 INSTANCE (UNDEFINED)

  // **************** CONTRACT VARIABLES *********************** //
  contractAddress = '0x099689220846644f87d1137665cded7bf3422747' // ROBOTOS CONTRACT ADDRESS (FOR TESTING)
  contract!: any; // EMPTY CONTRACT OBJECT (INITIALIZED WITH ADDRESS, ONCE USER IS CONNECTED)
  // ****************   USER VARIABLES   *********************** //
  userAddress: BehaviorSubject<string | 0> = new BehaviorSubject<string | 0>(0); // (WHAT IS THIS USER'S ADDRESS?) - VALUE IS 0 IF USER ADDRESS IS UNSET
  chainId: BehaviorSubject<any> = new BehaviorSubject(0); // (WHICH BLOCKCHAIN IS THIS USER ON?)
  // ****************  END OF VARIABLES  *********************** //
  constructor() {
    this.initializeWeb3();
  }

  async initializeWeb3() {
    this.web3 = new Web3(Web3.givenProvider);
    if (Web3.givenProvider) {
      this.web3 = new Web3(Web3.givenProvider);
    } else {
      this.web3 = new Web3(window.ethereum);
    }
    if (!this.web3.givenProvider && !this.web3.currentProvider) {
      this.web3 = new Web3('http://localhost:8545');
    }
    try {
      this.getContract();
      this.requestAccount();
      // Actions to take when account changes
      // this.getAllDonuts();
      // this.getData();
      setInterval(() => {
        this.web3.eth.getChainId().then(result => {
          if (result !== this.chainId.getValue()) {
            this.chainId.next(result);
          } else {

          }
        });
      }, 5000);
    } catch (error) {
    }
  }

  async getContract(): Promise<any> {
    this.contract = new this.web3.eth.Contract(GenericNFTABI, this.contractAddress);
  }

  async requestAccount(): Promise<any> {
    await this.web3.eth.requestAccounts().then(async allUsersAddresses => {
      // The address in position [0] is the one that is the currently selected address.
      // Web3 is kind of broken so it doesn't automatically update if a user switches the address.
      // Updating of address will be handled elsewhere.
        this.web3.eth.defaultAccount = await allUsersAddresses[0];
        await this.userAddress.next(allUsersAddresses[0]);
        await this.web3.eth.getChainId().then(async result => {
          this.chainId.next(await result);
        });
    });
    if (this.listeningForAccountChanges.getValue() === false) {
      await this.listenForAccountChanges();
    }
  }

  async listenForAccountChanges(): Promise<any> {
    if (this.listeningForAccountChanges.getValue() === false) {
      window.ethereum.on('accountsChanged', async (allUsersAddresses: any) => {
        this.web3.eth.defaultAccount = await allUsersAddresses[0];
        await this.userAddress.next(allUsersAddresses[0]);
        await this.web3.eth.getChainId().then(async result => {
          await this.chainId.next(result);
        });
      });
    } else {
       return;
     }
    await this.listeningForAccountChanges.next(true);
  }

  async pullContractAddressFromInputWithWEB3(address: string): Promise <any> {

  }
  async pullContractFromContractAddress(address: string): Promise <any> {

  }

  async pullIPFSJSONFileLocationFromContract(contract: string): Promise<any> {

  }

  async pullIPFSJSONDataFromIPFSJSONFileLocation(contract: string): Promise<any> {

  }

  async parseIPFSJSONData(JSONData: any): Promise<any> {

  }


}
