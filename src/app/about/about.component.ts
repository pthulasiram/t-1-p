import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/seo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  data: any = {
    'title': 'About - Free IT, Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'We are passionate to work with internet , to collect ebooks and share with readers.',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
 
  constructor(private seo: SeoService, public router: Router, public activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.data['image'] = './assets/images/logo.png';
    this.router.events
    .subscribe((event) => {
      this.seo.updatePageMeta(this.data);
      console.log(event);
    });
    this.seo.updatePageMeta(this.data);
      
  }
}
