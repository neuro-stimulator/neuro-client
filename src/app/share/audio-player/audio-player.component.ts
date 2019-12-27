import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.sass']
})
export class AudioPlayerComponent implements OnInit {

  @ViewChild('audioPlayer', {static: true}) player: ElementRef;

  @Input() title: string;
  @Input() audioUrl: string;
  @Input() displayTitle = true;
  @Input() autoPlay = false;
  @Input() displayVolumeControls = true;

  loaderDisplay = false;
  isPlaying = false;
  currentTime = 0;
  volume = 0.1;
  duration = 0.01;

  constructor() { }

  private _bindPlayerEvent() {
    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.player.nativeElement.currentTime);
    });
    this.player.nativeElement.addEventListener('volume', () => {
      this.volume = Math.floor(this.player.nativeElement.volume);
    });
    this.player.nativeElement.addEventListener('loadstart', () => {
      this.loaderDisplay = true;
    });
    this.player.nativeElement.addEventListener('loadeddata', () => {
      this.loaderDisplay = false;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
  }

  private _setVolume(volume: number) {
    this.volume = volume;
    this.player.nativeElement.volume = this.volume;
  }

  ngOnInit() {
    this._bindPlayerEvent();
  }

  handlePlay() {
    if (this.loaderDisplay) {
      return;
    }
    if (this.player.nativeElement.paused) {
      this.player.nativeElement.play(this.currentTime);
    } else {
      this.currentTime = this.player.nativeElement.currentTime;
      this.player.nativeElement.pause();
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
}
