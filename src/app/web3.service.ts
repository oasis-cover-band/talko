import { Injectable } from '@angular/core';
// import contract abi here // most NFT contracts will use ERC-721 or I belive 1151 standard so it will all have the function to pull JSON for the collection

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor() { }


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
