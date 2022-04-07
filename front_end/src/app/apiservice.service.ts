import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }
  /*connect frontend*/
  apiUrl = "http://localhost:3000/details"

  //get All data
  getAllData():Observable<any>{
    return this._http.get(this.apiUrl);
  }

  //create a student
  createData(data:any):Observable<any>{
    console.log(data,"createapi")
    return this._http.post(this.apiUrl,data);
  }

  //Delete data
  deleteData(id:any):Observable<any>{
    let ids=id;
    return this._http.delete(this.apiUrl+"/"+String(ids));
  }

  //Update data
  updateData(data:any,id:any):Observable<any>{
    return this._http.put(this.apiUrl+"/"+String(id),data);
  }

  //get single data
  getSingleData(id:any){
    return this._http.get(this.apiUrl+"/"+String(id));
  }
}
