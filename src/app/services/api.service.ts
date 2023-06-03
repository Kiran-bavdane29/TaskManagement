import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( 
    private http: HttpClient
   ) { }

   postTask(data: any) {
    return this.http.post<any>("http://localhost:3000/TaskPriorities/", data);
   }

   getTaskData() {
    return this.http.get<any>("http://localhost:3000/TaskPriorities/");
   }

   putTaskData(data: any,id: number) {
    return this.http.put<any>("http://localhost:3000/TaskPriorities/"+id, data);
   }

   deleteTaskData(id: number) {
    return this.http.delete<any>("http://localhost:3000/TaskPriorities/"+id);
   }
}
