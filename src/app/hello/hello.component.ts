import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit{
  name:string = '海川物联网'
  
  /**构造器 */
  constructor(){

  }
  /**
   * 初始化
   */
  ngOnInit(): void {
  }

}
