import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  async parseSingleURIForBaseURI(): Promise<string> {
    return await '';
  }
  async parseCollectionMetadata(): Promise<string> {
    return await '';
  }
}
