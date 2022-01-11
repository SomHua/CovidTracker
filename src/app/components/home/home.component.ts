import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed  =0;
  totalActive =0;
  totalDeath=0;
  totalRecovered=0;
  globalData!: GlobalDataSummary[];
  constructor(private dataService : DataServiceService) { }

  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            this.globalData = result; 
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active!
                this.totalConfirmed += cs.confirmed!
                this.totalDeath += cs.deaths!
                this.totalRecovered += cs.active!
              }

            })

          }, 
          complete : ()=>{
          }
        }
      )
  }

}
