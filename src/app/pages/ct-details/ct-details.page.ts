import { CtService } from './../../services/ct.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ct-details',
  templateUrl: './ct-details.page.html',
  styleUrls: ['./ct-details.page.scss'],
})
export class CtDetailsPage implements OnInit {
 
  information = null;
 
  constructor(private activatedRoute: ActivatedRoute, private ctService: CtService) { }

  ngOnInit() {
    // Get the ID that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');
 
    // Get the information from the API
    this.ctService.getDetails(id).subscribe(result => {
      this.information = result;
    });
  }
 
  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

}
