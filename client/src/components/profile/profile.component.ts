import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDetails } from '../../interfaces/authentication';

declare const TradingView: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => { 
      this.details = user;
    }, (err) => { 
      console.log(err);
    })
  }

  ngAfterViewInit() {
    new TradingView.widget({
       'container_id': 'technical-analysis',
       'autosize': true,
       'symbol': 'ETHBTC',
       'interval': '120',
       'timezone': 'exchange',
       'theme': 'Dark',
       'style': '1',
       'toolbar_bg': '#f1f3f6',
       'withdateranges': true,
       'hide_side_toolbar': false,
       'allow_symbol_change': true,
       'save_image': false,
       'hideideas': true,
       'studies': [ 
       'MASimple@tv-basicstudies' ],
       'show_popup_button': true,
       'popup_width': '1000',
       'popup_height': '650'
     });
   }

}