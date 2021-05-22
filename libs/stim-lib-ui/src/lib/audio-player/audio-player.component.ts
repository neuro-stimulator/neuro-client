import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';

@Component({
  selector: 'stim-lib-ui-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.sass'],
})
export class AudioPlayerComponent implements OnInit {
  @ViewChild('audioPlayer', { static: true }) player: ElementRef;
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @Input() title: string;

  @Input() displayTitle = true;
  @Input() autoPlay = false;
  @Input() displayVolumeControls = true;

  @Output() requestFileChange: EventEmitter<void> = new EventEmitter<void>();
  loaderDisplay = false;
  isPlaying = false;
  currentTime = 0;
  volume = 0.1;
  duration = 0.01;
  private _inicialized = false;

  private _audioUrl: string;

  get audioUrl() {
    return this._audioUrl;
  }

  @Input() set audioUrl(audioUrl: string) {
    this._audioUrl = audioUrl;
    this._player().src = audioUrl;
  }

  ngOnInit() {
    if (this.audioUrl) {
      this._bindPlayerEvent();
    }
  }

  handlePlay() {
    if (this.loaderDisplay) {
      return;
    }
    if (this.player.nativeElement.paused) {
      this.player.nativeElement.play(this.currentTime);
    } else {
      this.currentTime = this._player().currentTime;
      this._player().pause();
    }
  }

  handleToggleVolume() {
    if (this.volume === 0) {
      this._setVolume(1.0);
    } else {
      this._setVolume(0);
    }
  }

  sliderTimeChange(event: Event) {
    this.player.nativeElement.currentTime = (event.target as HTMLInputElement).value;
  }

  handleShowFileBrowser() {
    this.requestFileChange.emit(undefined);
    //   this.modal.showComponent = FileBrowserComponent;
    //   // this.modal.open();
    //   this.modal.openForResult()
    //       .then((file: FileRecord) => {
    //         this.fileChange.next(file);
    //         this._bindPlayerEvent();
    //       })
    //       .catch((e) => {
    //         // Dialog was closed
    //         console.log(e);
    //       });
  }

  private _player(): HTMLAudioElement {
    return this.player.nativeElement as HTMLAudioElement;
  }

  private _bindPlayerEvent() {
    if (this._inicialized) {
      return;
    }

    this._inicialized = true;
    this._player().addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this._player().duration);
    });
    this._player().addEventListener('pause', () => {
      this.isPlaying = false;
    });
    this._player().addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this._player().currentTime);
    });
    this._player().addEventListener('volume', () => {
      this.volume = Math.floor(this._player().volume);
    });
    this._player().addEventListener('loadstart', () => {
      this.loaderDisplay = true;
    });
    this._player().addEventListener('loadeddata', () => {
      this.loaderDisplay = false;
      this.duration = Math.floor(this._player().duration);
    });
  }

  private _setVolume(volume: number) {
    this.volume = volume;
    this._player().volume = this.volume;
  }
}
