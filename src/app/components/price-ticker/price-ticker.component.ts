import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


declare const TradingView: any;
@Component({
  selector: 'price-ticker',
  templateUrl: './price-ticker.component.html',
  styleUrls: ['./price-ticker.component.scss']
})
export class PriceTickerComponent implements OnInit, AfterViewInit  {

// allows for loading with any symbol
symbol = [
  {
    proName: 'BITSTAMP:BTCUSD',
    title: 'BTC/USD'
  },
  {
    proName: 'BITSTAMP:ETHUSD',
    title: 'ETH/USD'
  },
  {
    description: 'LTC/USD',
    proName: 'KRAKEN:LTCUSD'
  },
  {
    description: 'BCH/USD',
    proName: 'KRAKEN:BCHUSD'
  },
  {
    description: 'BNB/USD',
    proName: 'BNB/BITSTAMP:BTCUSD'
  }
];
settings: any = {};
// id for being able to check for errors using postMessage
widgetId = '';

constructor(private elRef: ElementRef) { }


@ViewChild('containerDiv', { static: false }) containerDiv!: ElementRef;

ngOnInit(): void {
}




ngAfterViewInit(): void {
  // need to do this in AfterViewInit because of the Input
  setTimeout(() => {
    this.widgetId = `${this.symbol}_fundamnetals`;

    // postMessage listener for handling errors
    if (window.addEventListener) {
      window.addEventListener('message', (e: any) => {
        if (e && e.data) {
          // console.log(e);
          const payload = e.data;
          // if the frameElementId is from this component, the symbol was no good and we should hide the widget
          if (payload.name === 'tv-widget-no-data' && payload.frameElementId === this.widgetId) {
            this.containerDiv.nativeElement.style.display = 'none';
          }
        }
      },
        false,
      );
    }


    this.settings = {
      symbols: this.symbol,
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'en',
      innerHeight: 130,
      innerWidth: 130
    };


    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.id = this.widgetId;
    script.innerHTML = JSON.stringify(this.settings);
    this.containerDiv.nativeElement.appendChild(script);
    const brandingDiv = document.createElement('div');
    brandingDiv.innerHTML = `
  <div class="tradingview-widget-copyright">
  <a href="https://www.tradingview.com/symbols/${this.symbol}/" rel="noopener" target="_blank">
  <span class="blue-text">${this.symbol} Fundamental Data</span></a>
            by TradingView
        </div>
`;

  });
}

}
