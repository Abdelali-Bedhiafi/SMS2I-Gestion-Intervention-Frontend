import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {GroupTags} from "../model/group-tags";
import {MatTableDataSource} from "@angular/material/table";
import {Tags} from "../model/tags";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AddTagDialogComponent} from "../dialog/add-tag-dialog/add-tag-dialog.component";
import {TagsService} from "../service/tags.service";
import {EditTagDialogComponent} from "../dialog/edit-tag-dialog/edit-tag-dialog.component";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements AfterViewInit, OnInit {


  @Input() group!: GroupTags
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tags!: MatTableDataSource<Tags>

  constructor(private tag$: TagsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.tags = new MatTableDataSource(this.group.tags.sort((a,b)=>a.id-b.id));
  }

  ngAfterViewInit(): void {
    this.tags.paginator=this.paginator;
  }

  edit(tag: Tags) {
    const dialgRef = this.dialog.open(EditTagDialogComponent,{data:tag});
    dialgRef.afterClosed().subscribe(_tag=>{
      if(_tag){
        this.tag$.update({id:tag.id,valeur:_tag,groupe:{id:this.group.id}}).subscribe(t => {
          let data = this.tags.data;
          const i = data.findIndex(_t => _t.id == t.id);
          data.splice(i,1,t);
          this.tags.data=data;
        });
      }
    });
  }

  delete(tag: Tags) {
    this.tag$.delete(tag).subscribe(()=>{
      let data = this.tags.data;
      const i = data.findIndex(t => t.id==tag.id);
      data.splice(i,1);
      this.tags.data=data;
    });

  }

  add() {
    const dialogRef = this.dialog.open(AddTagDialogComponent);
    dialogRef.afterClosed().subscribe( _tag => {
      if(_tag){
        this.tag$.add({id:0, valeur: _tag, groupe:{id: this.group.id}}).subscribe(tag =>{
          let data = this.tags.data;
          data .push(tag);
          this.tags.data=data;
        });
      }
    });
  }

}
