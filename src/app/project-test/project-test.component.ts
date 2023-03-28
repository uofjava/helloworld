import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-test',
  templateUrl: './project-test.component.html',
  styleUrls: ['./project-test.component.scss']
})
export class ProjectTestComponent implements OnInit{
  
@ViewChild("canvas",{static:true}) canvas:any;
ngOnInit(): void {
  this.draw();
}

draw():void{
  console.log("draw")
  var c = this.canvas.nativeElement;
  const radius = 20, radius_x = 50, radius_y = 50;
  // const width = c.width, height = c.height; // canvas的宽高
  var ctx = c.getContext("2d");
  // this.clearDraw(ctx,width,height);
  // ctx.clearRect(0,0,width,height)
  var number = 0;
  var list:Array<any> = [
    13,17,21
  ];

  for(let i = 0; i < 195; i++){
    for (let index = 0; index < 326; index++) {
      
      if(i % 2 == 0 ){
        console.log(i)
        if(i == 0 &&  (index > (326-number)/2) && (index < (326-number)/2+number/2)){
          this.drawArc(ctx,8.865+i*21.557, 18.865+ 24.892*index ,8.865);
        }
      }else{
        console.log(i)
        if(i == 1 && (index > 149) && (index < 177)){
          console.log("i="+i+"index="+index);
          this.drawArc(ctx,8.865+i*21.557, 8.865+ 24.892*index ,8.865);
        }
      }
  }
  }
}
drawArc(ctx:any,radius_x:any,radius_y:any,radius:any):void{
  ctx.beginPath();
  ctx.arc(radius_x,radius_y,radius,0*Math.PI,2*Math.PI); // x,y,r,起始角度,终点角度
  ctx.strokeStyle= '#488E87';
  ctx.stroke();
  // 内层小圆
  ctx.beginPath();
  ctx.arc(radius_x,radius_y,radius - 3,0*Math.PI,2*Math.PI);
  ctx.strokeStyle = '#70D4CA';
  ctx.stroke();
}


}
