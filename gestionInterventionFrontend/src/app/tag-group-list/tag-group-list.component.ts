import { Component, OnInit } from '@angular/core';
import {TagsService} from "../service/tags.service";
import {GroupTags} from "../model/group-tags";
import {MatDialog} from "@angular/material/dialog";
import {AddTagGroupDialogComponent} from "../dialog/add-tag-group-dialog/add-tag-group-dialog.component";
import {EditTagGroupDialogComponent} from "../dialog/edit-tag-group-dialog/edit-tag-group-dialog.component";


@Component({
  selector: 'app-tag-group-list',
  templateUrl: './tag-group-list.component.html',
  styleUrls: ['./tag-group-list.component.css']
})
export class TagGroupListComponent implements OnInit {

  tags!: GroupTags[];
  ready = false;

  constructor(private tag$: TagsService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tag$.getAllGroupe().subscribe(list=>{
      this.tags=list;
      this.ready= true;
    });
  }

  edit(group: GroupTags) {
    const dialogRef = this.dialog.open(EditTagGroupDialogComponent,{data:group});
    dialogRef.afterClosed().subscribe(nom =>{
      if(nom){
        this.tag$.updateGroup({id: group.id,nomGroup:nom}).subscribe(() =>{
          group.nomGroup=nom
        });
      }
    });
  }

  delete(group: GroupTags) {
    this.tag$.deleteGroup(group).subscribe(()=>{
      const index = this.tags.findIndex( g => g.id == group.id);
      this.tags.splice(index,1);
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddTagGroupDialogComponent);
    dialogRef.afterClosed().subscribe( nom =>{
      if(nom){
        this.tag$.addGroup({id:0,nomGroup:nom}).subscribe( g =>{
          g.tags=[];
          this.tags.push(g);
        });
      }
    });
  }
}
