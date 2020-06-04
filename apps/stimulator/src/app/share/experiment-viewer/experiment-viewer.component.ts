import { AfterContentInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Options as SliderOptions } from 'ng5-slider/options';

import { IOEvent } from '@stechy1/diplomka-share';

import { environment } from '../../../environments/environment';
import { Round } from '../../player/round';

@Component({
  selector: 'stim-experiment-viewer',
  templateUrl: './experiment-viewer.component.html',
  styleUrls: ['./experiment-viewer.component.sass']
})
export class ExperimentViewerComponent implements OnInit, AfterContentInit, OnDestroy {

  private static readonly DEFAULT_OUTPUT_COLORS = [
    'rgba(119,94,64,0.5)',
    'rgba(126,113,95,0.5)',
    'rgba(156,154,121,0.5)',
    'rgba(213,102,44,0.5)',
    'rgba(101,73,119,0.5)',
    'rgba(62,72,85,0.5)',
    'rgba(69,109,147,0.5)',
    'rgba(123,156,172,0.5)',
  ];

  // Čítač pro uběhlá kola experimentu
  // 1 kolo experimentu = poslední výstup zhasnul
  private _rounds = 0;
  // Čítač všech eventů
  private _eventOffsetCounter = 0;
  // Index do pole offsetů
  eventOffsetIndex = 0;
  // Pole offsetů pro začátek kol
  private _eventOffsetIndexArray = [];

  // Pole všech eventů, které uběhly v aktuálním experimentu
  private _events: IOEvent[] = [];

  private _incommingEventSubscription: Subscription;

  @ViewChild('experimentCanvas', {static: true}) canvas: ElementRef;
  @Input() outputCount = environment.maxOutputCount;
  @Input() lineHeight = 30;
  @Input() peakHeight = 20;
  @Input() maxDelta = 30;
  @Input() graphOffset = 30;
  @Input() incommingEvent: Observable<IOEvent>;
  @Input() set events(events: IOEvent[]) {
    this._events = events;
  }

  // Nastavení pro posuvník kol v prohlížeči experimentu
  eventOffsetIndexOptions: SliderOptions = {
    floor: 1,
    ceil: 1,
    showTicks: true,
    showTicksValues: true,
    tickStep: 1,
    animate: false
  };

  constructor() { }

  ngOnInit() {
    if (this.incommingEvent !== undefined) {
      this._incommingEventSubscription = this.incommingEvent.subscribe((event: IOEvent) => {
        this._handleIncommingEvent(event);
      });
    }
  }

  ngAfterContentInit(): void {
    this._renderExperimentProgress();
  }

  ngOnDestroy(): void {
    if (this._incommingEventSubscription !== undefined) {
      this._incommingEventSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._renderExperimentProgress();
  }

  private _handleIncommingEvent(event: IOEvent) {
    // Uložím si událost do pole všech událostí
    this._events.push(event);

    // Pokud přišla událost z posledního výstupu s deaktivací
    if (event.ioType === 'output' && event.state === 'off' && event.index === (this.outputCount - 1)) {
      this._renderExperimentProgress();
    }

    // Pokud přišla událost z prvního výstupu s deaktivací
    if (event.ioType === 'output' && event.state === 'off' && event.index === 0) {
      // Zvýším počet dostupných kol
      this._rounds++;
      // Do pole offsetů vložím aktuální hodnotu z čítače offsetů
      this._eventOffsetIndexArray.push(this._eventOffsetCounter);

      // Aktualizuji nastavení slideru
      // shorturl.at/ijAFQ
      const newOptions: SliderOptions = Object.assign({}, this.eventOffsetIndexOptions);
      // Maximální hodnota slideru odpovídá počtu kol
      newOptions.ceil = Math.max(1, this._rounds);
      newOptions.showTicks = this._rounds < 15;
      newOptions.showTicksValues = this._rounds < 15;
      // Zpátky přiřadím nastavení
      this.eventOffsetIndexOptions = newOptions;

      // A zahájím kreslení
      this._renderExperimentProgress();
    }
    // Vždycky inkrementuji čítač událostí
    this._eventOffsetCounter++;
  }

  /**
   * Hlavní funkce starající se o vykreslení celého grafu
   */
  private _renderExperimentProgress() {
    // Získám HTML canvas element
    const canvas = (this.canvas.nativeElement as HTMLCanvasElement);
    // Nastavím šířku přes celý rodičovský element
    canvas.width = canvas.parentElement.parentElement.clientWidth;
    // Výška bude odpovídat počtu výstupů + 1 vynásobený výškou jedné řádky
    canvas.height = (this.outputCount + 1) * this.lineHeight;
    // Získám grafický kontext
    const graphics = canvas.getContext('2d');
    // Připravím mřížku
    const events: Round[] = this._prepareCanvasView(graphics);

    // Tato proměnná je použita při kreslení indexu vykresleného kola
    let j = 1;

    // Budu iterovat od začátku vybraného kola až do konce (v ideálním případě)
    for (let i = this._eventOffsetIndexArray[this.eventOffsetIndex]; i < this._events.length; i++) {
      // Získám aktuálně zpracovávanou událost
      const event = this._events[i];
      // Pokud se jedná o výstup
      if (event.ioType === 'output') {
        // A pokud v pomocných datech na indexu nic není
        if (events[event.index].output.event === null) {
          // Tak událost uložím
          events[event.index].output.event = event;
          // Pokud se jedná o aktivaci výstupu
          if (event.state === 'on') {
            // Posunu Y-ovou souřadnici o velikost peaku směrem nahoru
            // To je z důvodu, abych vždy začínal na hlavní čáře
            events[event.index].output.y -= this.peakHeight;
          }
          // Víc se touto událostí nebudu zabývat, takže budu pokračovat zpracováním
          // další události
          continue;
        }
      }

      // V tomto stavu jsem si jistý, že existuje předchozí událost na mém indexu

      // Získám předchozí událost
      const previousEvent = events[event.index];
      // Uložím si dříve vypočítanou X-ovou hodnotu
      const lastX = previousEvent.output.x;
      // Uložím si dříve vypočítanou Y-ovou hodnotu
      const lastY = previousEvent.output.y;
      // Vypočítám rozdíl mezi aktuální a předchozí události
      let delta = event.timestamp - this._events[event.index].timestamp;
      // Pokud je rozdíl větší, než maximální možný
      if (delta > this.maxDelta) {
        // Upravím rozdíl na maximální možný
        delta = this.maxDelta;
      }

      // Nová X-ová souřadnice bude výsledkem součtu staré + rozdílu v časových značkách
      let newX = lastX + delta;
      // Nová Y-ová souřadnice bude zatím odpovídat staré
      let newY = lastY;
      // Pokud se dostanu na ose X za šířku canvasu
      if (newX > (canvas.width - this.graphOffset)) {
        // Zvýším offset, čímž se celý graf posune o jedno kolo doleva
        this.eventOffsetIndex++;

        // Víc už toho nakreslit nemůžu, protože bych se dostal mimo graf
        // Tak kreslení ukončím
        return;
      }

      // Opět nastavím styl čáry na černou barvu
      graphics.strokeStyle = 'black';
      // A započnu další cestu
      graphics.beginPath();
      // Přesunu se na souřadnice, kde skončila předchozí událost
      graphics.moveTo(lastX, lastY);

      // Pokud budu kreslit událost s výstupem
      if (event.ioType === 'output') {
        // A výstup se aktivoval
        if (event.state === 'on') {
          // Vím, že předchozí událost byla deaktivace
          // Budu kreslit čáru od oddělovací čáry nahoru (pouze)

          // Od nového X odečtu deltu, protože se nikam nechci posunout
          newX -= delta;
          // Přesunu se na úroveň oddělovací čáry
          graphics.moveTo(newX, newY);
          // Od nového Y odečtu velikost peaku, čímž získám Y-ovou souřadnici
          newY -= this.peakHeight;
          // Do tohoto místa vykreslím čáru
          graphics.lineTo(newX, newY);
          // A ještě se ujistím, že se vše správně vykreslilo
          graphics.stroke();
        } else { // Výstup se deaktivovat
          // Při deaktivaci výstupu musím zkontrolovat předchozí událost

          // Pokud se v předchozí události výstup aktivoval
          if (previousEvent.output.event.state === 'on') {
            // Budu kreslit vodorovnou čáru peaku, pak svislou dolů k oddělovací čáře a nakonec další vodorovnou čáru

            //
            graphics.moveTo(lastX, lastY);
            // Kreslím první vodorovnou čáru peaku
            // Využívám dříve vypočtených souřadnic
            graphics.lineTo(newX, newY);
            // Zvýšením Y-ové souřadnice se dostanu výškově na hladinu oddělovací čáry
            newY += this.peakHeight;
            // Kreslím první svislou čáru dolů
            graphics.lineTo(newX, newY);
            // Inkrementuji X-ovou souřadnici
            newX += delta;
            // Kreslím druhou vodorovnou čáru peaku
            graphics.lineTo(newX, newY);
            // Ujistím se, že vše se vykreslilo
            graphics.stroke();
          } else { // V opačném případě (předchozí událost byla také deaktivace)
            // Podruhé inkrementuji X-ovou souřadnici
            newX += delta;
            // graphics.moveTo(lastX, lastY);
            // A vykreslím vodorovnou čáru na stejné výškové hladině, jako je oddělovací čára
            graphics.lineTo(newX, newY);
            // Ujistím se, že vše se vykreslilo
            graphics.stroke();
          }
        }

        // Nakonec uložím aktuální událost, jako předchozí
        events[event.index].output.event = event;
        // Také si uložím nově vypočátané X-ové a Y-ové souřadnice
        events[event.index].output.x = newX;
        events[event.index].output.y = newY;
      } else { // Budu kreslit událost s vstupem
        // Stisk tlačítka budeme kreslit modrou barvou
        graphics.strokeStyle = 'blue';
        // Založím pomocnou proměnnou s hodnotou 0
        let deltaY = 0;
        // Pokud byla předchozí událost typu 'aktivace výstupu'
        if (previousEvent.output.event && previousEvent.output.event.state === 'on') {
          // Uložím do proměnné výšku peaku
          deltaY = this.peakHeight;
        }
        // Pokud se jednalo o aktivaci výstupu, přičtením delty se dostanu na
        // úroveň oddělovací čáry
        newY += deltaY;
        // Na tuto pozici se pak přesunu
        graphics.moveTo(newX, newY);
        // Po přesunu opět zkontroluji předchozí událost, tentokrát ale na deaktivaci
        if (previousEvent.output.event && previousEvent.output.event.state === 'off') {
          // Pokud se jednalo o deaktivaci, opět nastavím deltě hodnotu výšku peaku
          deltaY = this.peakHeight;
        }
        // Odečtením se dostanu na výšku peaku
        newY -= deltaY;
        // Nakreslím čáru
        graphics.lineTo(newX, newY);
        // A ujistím se, že se vše vykreslí
        graphics.stroke();
      }

      // Opět pro jistotu nechám vše potřebné vykreslit
      graphics.stroke();
      // A ukončím cestu
      graphics.closePath();

      // Pokud začínám nové kolo
      if (event.ioType === 'output' && event.state === 'off' && event.index === 0) {
        // Započnu novou cestu
        graphics.beginPath();
        // Nastavím barvu čáry
        graphics.strokeStyle = 'orange';
        // Přesunu se na X-ovou souřadnici události a Y-ovou nechám na 0
        graphics.moveTo(newX, 0);
        // Udělám čáru přes celou výšku canvasu
        graphics.lineTo(newX, canvas.height);
        // A ujistím se, že se vše vykreslilo
        graphics.stroke();
        // Ukončím cestu
        graphics.closePath();
        // A nastavím barvu čáry opět na černou
        graphics.strokeStyle = 'black';
        // Vypočítám X-ovou souřadnici textu jako průměr mezi starou a novou hodnotou
        const textX = (lastX + newX) / 2;
        // Vypíšu pod graf index právě zpracovaného kola
        graphics.strokeText(`${this.eventOffsetIndex + j}.`, textX, canvas.height - 10);
        // Inkrementuji počet zpracovaných kol
        j++;
      }
    }
  }

  /**
   * Vykreslí základní souřadnicový systém + mřížku
   *
   * @param graphics Renderovací kontext
   */
  private _prepareCanvasView(graphics: CanvasRenderingContext2D): Round[] {
    const canvas = graphics.canvas;
    // Založím pole, které naplním základními eventy
    const events: Round[] = [];

    // Nejdříve celý canvas vymažeme
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    // Započnu novou cestu
    graphics.beginPath();
    // A přesunu se na začátek canvasu
    graphics.moveTo(0, 0);

    // Proiteruji přes všechny výstupy, které se v experimentu použily
    for (let i = 0; i < this.outputCount; i++) {
      // Založím pomocnou proměnou jednoho kola
      const event: Round = {
        // V proměnné bude mít své místo jak 'input', tak 'output'
        input: {event: null, x: this.graphOffset, y: this.lineHeight + (i * this.lineHeight)},
        output: {event: null, x: this.graphOffset, y: this.lineHeight + (i * this.lineHeight)},
      };
      // Vyberu barvu do pozadí
      graphics.fillStyle = ExperimentViewerComponent.DEFAULT_OUTPUT_COLORS[i];
      // A vykreslím obdélník reprezentující jeden řádek = jeden výstup
      graphics.fillRect(event.output.x - this.graphOffset, event.output.y - this.lineHeight, canvas.width, this.lineHeight);
      // Nastavím černou čáru
      graphics.strokeStyle = 'black';
      // A vypíšu index výstupu k příslušnému řádku
      graphics.strokeText(`${i + 1}.`, event.output.x - (this.graphOffset / 2), event.output.y - (this.lineHeight / 2) + 3);
      // Přesunu se na začátek grafu
      graphics.moveTo(event.output.x, event.output.y);
      // Nastavím styl čáry na světle šedou s vysokou hodnotou průhlednosti
      graphics.strokeStyle = 'rgba(62,62,62,0.28)';
      // Vykreslím čáru oddělující jednotlivé výstupy
      graphics.lineTo(canvas.width, event.output.y);
      // Ujistím se, že vše je vykreslené
      graphics.stroke();
      // Nakonec vložím data
      events.push(event);
    }

    // Ještě jednou se ujistím, že je vše vykreslené
    graphics.stroke();
    // Uzavřu cestu
    graphics.closePath();
    // A opět se přesunu na začátek canvasu
    graphics.moveTo(0, 0);

    return events;
  }

  handleOffsetIndexChange(offsetIndex: number) {
    this.eventOffsetIndex = offsetIndex - 1;
    this._renderExperimentProgress();
  }
}
