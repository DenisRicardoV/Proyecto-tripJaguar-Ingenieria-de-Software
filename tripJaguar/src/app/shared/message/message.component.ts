import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input('mensaje') mensaje: string;
  @Input('color') color: string;


  URL_PUBLIC: string = environment.PUBLIC_FILE;

  constructor() { }

  ngOnInit() {
  }

}
