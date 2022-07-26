import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { GroupTags } from '../model/group-tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor( private backend:BackendService) { }

  getAllGroupe():Observable<GroupTags[]>{
    return this.backend.sendGetRequest<GroupTags[]>("groupeTags");

  }


}
