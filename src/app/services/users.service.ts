import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  users = [];

  getUserDetail(id: string) {
    return this.http.get(this.URL + '/users/' + id);
  }

  getAllUsers() {
    return this.http.get(this.URL + '/users');
  }

  addNewUser(data: any) {
    this.http.post(this.URL + '/users', data).subscribe();
  }

  deleteUser(id: string) {
    return this.http.delete(this.URL + '/users/' + id);
  }
  
  getPaginatedUsers(pageSize: number, offset: number) {
    const params = new HttpParams().set('limit', pageSize).set('offset', offset);
    return this.http.get(this.URL + '/users', {params: params});
  }
}
