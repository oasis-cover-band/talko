import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import Web3 from 'web3';
import { ParserService } from './parser.service';
import { HttpService } from './http.service';
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
  // contractAddress = '0x099689220846644f87d1137665cded7bf3422747' // ROBOTOS CONTRACT ADDRESS (FOR TESTING)
  // contractAddress = '0x9A534628B4062E123cE7Ee2222ec20B86e16Ca8F' // MEKAVERSE CONTRACT ADDRESS (FOR TESTING)
  contractAddress = '0xF43Aaa80a8F9dE69bc71aeA989AfCeB8DB7b690F' // SOCCERDOGS CONTRACT ADDRESS (FOR TESTING)
  contract!: any; // EMPTY CONTRACT OBJECT (INITIALIZED WITH ADDRESS, ONCE USER IS CONNECTED)
  contractOwner: BehaviorSubject<any> = new BehaviorSubject(undefined); // (WHICH ADDRESS OWNS THE CURRENT CONTRACT)?
  // ****************   USER VARIABLES   *********************** //
  userAddress: BehaviorSubject<string> = new BehaviorSubject<string>(''); // (WHAT IS THIS USER'S ADDRESS?) - VALUE IS 0 IF USER ADDRESS IS UNSET
  approvedAddress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // (IS THIS ADDRESS ALLOWED TO USE THE APP?) - VALUE IS 0. WILL PULL FROM SMART CONTRACT. CURRENTLY PULLS FROM JSON FILE LOCALLY.
  userETHBalance: BehaviorSubject<number> = new BehaviorSubject<number>(0); // (WHAT IS THIS USER'S ETH BALANCE?)
  chainId: BehaviorSubject<any> = new BehaviorSubject(0); // (WHICH BLOCKCHAIN IS THIS USER ON?)
  // ****************   NFT VARIABLES    *********************** //
  pulledassetFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pulledtokenURIFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pulleduriFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  // ****************  BASEURI VARIABLES *********************** //
  pulled_baseTokenURIFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pulledbaseTokenURIFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  // **************** CURRENT # VARIABLES *********************** //
  pulledTotalSupplyFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pulledTotalTokenFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  // ****************   MAX # VARIABLES   *********************** //
  pulled_maxSupplyFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pulledMAX_ELEMENTSFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pulledMAX_SUPPLYFromContract: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  // ****************  END OF VARIABLES  *********************** //
  constructor(
    private parserService: ParserService,
    private httpService: HttpService
  ) {
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

  async searchForNewCollection(): Promise<any> {
    this.getContract().then(async contract => {
      await this.searchForSoccerDoge();
    })
  }
  // TEMPORARY METHOD
  async searchForSoccerDoge(): Promise<any> {
    const idToPull = 6; // test
    this.pulluriFromContract(idToPull).then(
      async uri => {
      await this.iteratePullThenParseCollectionBySingleURI(
        await this.pulleduriFromContract.getValue()
        ).then(
          async afterPulledAndParsed => {
            // here just waiting for console log
          }
        )
    })
  }

  async getContract(): Promise<any> {
    this.contract = await new this.web3.eth.Contract(GenericNFTABI, this.contractAddress);
  }

  async requestAccount(): Promise<any> {
    await this.web3.eth.requestAccounts().then(async allUsersAddresses => {
      // The address in position [0] is the one that is the currently selected address.
      // Web3 is kind of broken so it doesn't automatically update if a user switches the address.
      // Updating of address will be handled elsewhere.
        this.web3.eth.defaultAccount = await allUsersAddresses[0];
        await this.userAddress.next(allUsersAddresses[0]);
        await this.getChainId();
    });
    if (this.listeningForAccountChanges.getValue() === false) {
      await this.listenForAccountChanges();
    }
  }

  async checkIfAddressCanUseApp(): Promise<any> {
    // do and call after request account or within?
  }

  async getUserETHBalance(): Promise<any> {
    this.userETHBalance.next(Number(this.web3.eth.getBalance(this.userAddress.getValue())));
  }
  
  async getChainId(): Promise<any> {
    await this.web3.eth.getChainId().then(async result => {
      this.chainId.next(await result);
    });
  }

  async listenForAccountChanges(): Promise<any> {
    if (this.listeningForAccountChanges.getValue() === false) {
      window.ethereum.on('accountsChanged', async (allUsersAddresses: any) => {
        this.web3.eth.defaultAccount = await allUsersAddresses[0];
        await this.userAddress.next(allUsersAddresses[0]);
        await this.getChainId();
      });
    } else {
       return;
     }
    await this.listeningForAccountChanges.next(true);
  }

  async pullContractAddressFromInputWithWEB3(address: string): Promise <any> {
    this.contractAddress = address;
  }
  async pullContractFromContractAddress(address: string = this.contractAddress): Promise <any> {
    this.contract = new this.web3.eth.Contract(GenericNFTABI, address);
  }
  async pulltotalSupplyFromContract(): Promise<any> {
    await this.contract.methods.totalSupply().call().then((pulledTotalSupply: any) => {
      this.pulledTotalSupplyFromContract.next(pulledTotalSupply);
    }).catch({});
  }
  async pulltotalTokenFromContract(): Promise<any> {
    await this.contract.methods.totalToken().call().then((pulledTotalToken: any) => {
      this.pulledTotalTokenFromContract.next(pulledTotalToken);
    }).catch({});
  }
  async pull_maxSupplyFromContract(): Promise<any> {
    await this.contract.methods._maxSupply().call().then((pulled_maxSupply: any) => {
      this.pulled_maxSupplyFromContract.next(pulled_maxSupply);
    }).catch({});
  }
  async pullMAX_ELEMENTSFromContract(): Promise<any> {
    await this.contract.methods.MAX_ELEMENTS().call().then((pulledMAX_ELEMENTS: any) => {
      this.pulledMAX_ELEMENTSFromContract.next(pulledMAX_ELEMENTS);
    }).catch({});
  }
  async pullMAX_SUPPLYFromContract(): Promise<any> {
    await this.contract.methods.MAX_SUPPLY().call().then((pulledMAX_SUPPLY: any) => {
      this.pulledMAX_SUPPLYFromContract.next(pulledMAX_SUPPLY);
    }).catch({});
  }
  async pull_baseTokenURIFromContract(): Promise<any> {
    await this.contract.methods._baseTokenURI().call().then((pulled_baseTokenURI: any) => {
      this.pulled_baseTokenURIFromContract.next(pulled_baseTokenURI);
    }).catch({});
  }
  async pullbaseTokenURIFromContract(): Promise<any> {
    await this.contract.methods.baseTokenURI().call().then((pulledbaseTokenURI: any) => {
      this.pulledbaseTokenURIFromContract.next(pulledbaseTokenURI);
    }).catch({});
  }

  async pullIPFSJSONDataFromIPFSJSONFileLocation(contract: string): Promise<any> {

  }

  async parseIPFSJSONData(JSONData: any): Promise<any> {

  }

  async pullassetsFromContract(nftID: number): Promise<any> {
    await this.contract.methods.assets(nftID).call().then((pulledassets: any) => {
      this.pulledassetFromContract.next(pulledassets);
    }).catch({});
  }

  async pulltokenURIFromContract(nftID: number): Promise<any> {
    await this.contract.methods.tokenURI(nftID).call().then((pulledtokenURI: any) => {
      this.pulledtokenURIFromContract.next(pulledtokenURI);
    }).catch({});
  }
  // ************************
  // ************************
  // ************************
  // USING SOCCER DOGS TEMPORARILY AS A MODEL
  // THIS IS PROBABLY UNNEEDED BECAUSE WITH THE BASE URL AND THE AMOUNT OF ITEMS
  // IN THE COLLECTION - WE CAN ITERATE THE ENTIRE COLLECTION WITHOUT PULLING
  // EACH TOKEN URI SEPERATELY FROM THE CONTRACT - DUH
  // ************************
  // ************************
  // ************************
  async pulluriFromContract(nftID: number): Promise<any> {
    await this.contract.methods.uri(nftID).call().then((pulleduri: any) => {
      this.pulleduriFromContract.next(pulleduri);
    }).catch({});
  }

  async pullTokenJSONDataFromtokenURI(tokenURI: string): Promise<any> {
    //// call API service to get the JSON data?
    //// send returned data to parser?
  }

  async pullTokenJSONDataFromuri(tokenURI: string): Promise<any> {
    //// call API service to get the JSON data?
    //// send returned data to parser?
  }

  // ************************
  // ************************
  // ************************
  // USING SOCCER DOGS TEMPORARILY AS A MODEL
  // THIS BELOW METHOD WILL BE GOOD TO USE IF
  // A CONTRACT ONLY GIVES A TOKEN URI AND NOT
  // A BASE URI THEREFORE I WOULD HAVE TO SUBSTRING THE FIRST GIVEN TOKEN URI
  // AND THEN ITERATE IT =)
  // ************************
  // ************************
  // ************************

  async iteratePullThenParseCollectionBySingleURI(givenTokenURI: string): Promise<any> {
    await this.parserService.parseSingleURIForBaseURI(givenTokenURI).then(async (baseURI:string) => {
      console.dir(baseURI);
      await this.useCorrectMaximumSupply().then(async correctMaximumSupply => {
        const temporaryArray: any[] = await [];
        let lastSubscription!: Subscription | undefined = await undefined;
        temporaryArray.length = await correctMaximumSupply;
        await temporaryArray.forEach(async (emptyItemInArray: any, index: number) => {
          lastSubscription = await this.httpService.getSingleMetadata(await index)?.subscribe(async returnedMetadata => {
            console.dir(await returnedMetadata);
            temporaryArray[await index] = await returnedMetadata;
          });
          // STORE IN TEMPORARY ARRAY AFTER
        });
        // SHOOT OUT ARRAY TO PARSE TO GET ATTRIBUTE DATA
        await this.parserService.parseCollectionMetadata(this.contractAddress, await temporaryArray);
      });
    })
  }
  
  // ************************
  // ************************
  // ************************
  // THESE FUNCTIONS FIGURE OUT
  // WHICH FUNCTIONS THE CONTRACT
  // HAS AVAILABLE PUBLICALLY
  // ************************
  // ************************
  // ************************

  async useCorrectMaximumSupply(): Promise<any> {

  }
}
