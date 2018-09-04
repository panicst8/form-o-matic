import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  constructor(private http: HttpClient) {}

  assetsFolder = 'assets';

  getSchema(schemaName: string) {
    return this.http.get(`${this.assetsFolder}/schemas/${schemaName}.json`);
  }
}
