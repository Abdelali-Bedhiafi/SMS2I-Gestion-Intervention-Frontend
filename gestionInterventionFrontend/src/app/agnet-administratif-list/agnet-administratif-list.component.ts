import {AfterViewInit, Component,  ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AgentAdministratifService} from "../service/agent-administratif.service";
import {AgentAdministratif} from "../model/agent-administratif";
import {MatDialog} from "@angular/material/dialog";
import {AddAgentDialogComponent} from "../dialog/add-agent-dialog/add-agent-dialog.component";
import {EditAgentDialogComponent} from "../dialog/edit-agent-dialog/edit-agent-dialog.component";

@Component({
  selector: 'app-agnet-administratif-list',
  templateUrl: './agnet-administratif-list.component.html',
  styleUrls: ['./agnet-administratif-list.component.css']
})
export class AgnetAdministratifListComponent implements AfterViewInit {

  agents!: MatTableDataSource<AgentAdministratif>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private agent$: AgentAdministratifService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.agent$.getAll().subscribe(list => {
      this.agents = new MatTableDataSource(list);
      this.agents.paginator=this.paginator;
    });
  }


  add() {
    const dialogRef = this.dialog.open(AddAgentDialogComponent);
    dialogRef.afterClosed().subscribe(agent=>{
      if(agent){
        this.agent$.add({id:0, nom: agent.nom, prenom: agent.prenom, password: agent.password}).subscribe(agent=>{
          let data =this.agents.data;
          data.push(agent);
          this.agents.data=data;
        });
      }
    });
  }

  edit(agent: AgentAdministratif) {
    const dialogRef = this.dialog.open(EditAgentDialogComponent,{data: agent});
    dialogRef.afterClosed().subscribe( _agent => {
      this.agent$.update(_agent).subscribe(a =>{
       let data =this.agents.data;
       const i = data.findIndex(i => i.id==a.id);
       data.splice(i,1,a);
       this.agents.data=data;
      });
    });
  }
}
