import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { GroupTags } from '../model/group-tags';
import {Tags} from "../model/tags";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor( private backend:BackendService) { }

  getAllGroupe():Observable<GroupTags[]>{
    return this.backend.sendGetRequest<GroupTags[]>("groupeTags");
  }
  addGroup(group: {id: number,nomGroup:string}):Observable<GroupTags>{
    return this.backend.sendPostRequest<GroupTags>("groupeTags",group);
  }

  updateGroup(group:{id: number,nomGroup:string}):Observable<GroupTags>{
    return this.backend.sendPutRequest<GroupTags>("groupeTags/"+group.id,group);
  }

  deleteGroup(group:GroupTags):Observable<void>{
    return this.backend.sendDeleteRequest<void>("groupeTags/"+group.id);
  }


  add(tag: {id:number,valeur:string,groupe:{id:number}}): Observable<Tags> {
    return this.backend.sendPostRequest<Tags>("tags",tag);
  }

  delete(tag: Tags):Observable<void> {
    return this.backend.sendDeleteRequest<void>("tags/"+tag.id);
  }

  update(tag: {id:number,valeur:string,groupe:{id:number}}):Observable<Tags> {
    return this.backend.sendPutRequest<Tags>("tags/"+tag.id,tag);
  }
}
