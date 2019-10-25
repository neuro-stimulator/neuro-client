import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ghost-item-list',
  templateUrl: './ghost-item-list.component.html',
  styleUrls: ['./ghost-item-list.component.sass']
})
export class GhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
