import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Resp } from './model/resp.model';

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sourcePerson: string;
  destinationPerson: string;
  @ViewChild('sourcePerson') sourcePersonEle: ElementRef;
  @ViewChild('destinationPerson') destinationPersonEle: ElementRef;

  resp: Resp;
  paths: Object[];
  isLoading: boolean = false;

  constructor(private http: Http) { }

  ngOnInit() { }

  getDegree() {
    if ((this.sourcePersonEle.nativeElement.value != '') && (this.destinationPersonEle.nativeElement.value != '')) {
      this.sourcePerson = this.sourcePersonEle.nativeElement.value;
      this.destinationPerson = this.destinationPersonEle.nativeElement.value;
      let obj = {};
      obj["source"] = this.sourcePerson;
      obj["destination"] = this.destinationPerson;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.isLoading = true;
      this.http.post('https://immense-ridge-71816.herokuapp.com/api/actors', JSON.stringify(obj), options)
        .map(res => res.json())
        .subscribe((data: Resp) => {
          this.isLoading = false;
          this.resp = data;

          this.paths = data.path.reverse();
          console.log(data);
        });
    }
  }
}
