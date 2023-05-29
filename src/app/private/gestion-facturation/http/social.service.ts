import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Observable } from "rxjs";
import { Social } from "../models/social";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getSocialById(id :number):Observable<Social>{
    return this.http.get<Social>(`${this.constant.socialsUrl}/${id}`);
  }

  getAllSocial(): Observable<Social[]>{
    return this.http.get<Social[]>(`${this.constant.socialsUrl}`);
  }

  addSocial(social: Social): Observable<any> {
    return this.http.post(`${this.constant.socialsUrl}`, social);
  }

  updateSocialById( id :number, social: Social) :Observable<Social>{
    return this.http.put<Social>(`${this.constant.socialsUrl}/${id}`,social);
  }

  deleteSocialById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.socialsUrl}/${id}`,{ responseType: 'text'});
  }
}
