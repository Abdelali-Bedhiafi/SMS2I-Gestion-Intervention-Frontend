import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Technicien } from '../technicien';
import { TechnicienService } from '../technicien.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  techniciens$!: Observable<Technicien[]>;

  constructor(private technicien:TechnicienService) { }

  ngOnInit(): void {
    this.techniciens$=this.technicien.getAll();
  }

}
