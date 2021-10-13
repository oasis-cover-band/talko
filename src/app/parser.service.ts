import { Injectable } from '@angular/core';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor(
    private fileService: FileService
  ) { }

  async parseSingleURIForBaseURI(givenTokenURI: string): Promise<string> {
    return await givenTokenURI.substr(0, givenTokenURI.lastIndexOf('/')) ;
  }
  async parseCollectionMetadata(contractAddress: string, collectionMetadata: any[]): Promise<string> {
    return await '';
  }
}
