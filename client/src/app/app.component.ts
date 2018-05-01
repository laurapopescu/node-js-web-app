import { Component } from '@angular/core';

declare const TradingView: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

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
