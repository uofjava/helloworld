import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-three-cad',
  templateUrl: './three-cad.component.html',
  styleUrls: ['./three-cad.component.scss']
})
export class ThreeCadComponent implements OnInit{

@ViewChild("Three",{static:true}) three!: ElementRef;
private renderer:any = new THREE.WebGLRenderer();
private width = 0;
private height = 500;
private scene = new THREE.Scene();
private camera:any
private cube:any


ngOnInit(): void {
  this.width = this.three.nativeElement.offsetWidth;

  this.renderer.setSize(this.width,this.height);
  this.renderer.setClearColor(0xFFFFFF);
  this.renderer.shadowMap.enable = true;
  this.renderer.shadowMap.type = THREE.PCFShadowMap;

  this.three.nativeElement.append(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(45,this.width/this.height,0.1,1000);

  this.camera.position.x = 300;
  this.camera.position.y = 500;
  this.camera.position.z = 400;

  this.camera.lookAt(this.scene.position)

  var cubGeometry = new THREE.BoxGeometry(400,400,400);
  var cubMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
  this.cube = new THREE.Mesh(cubGeometry,cubMaterial);

  this.cube.position.x = 0;
  this.cube.position.y = 0;
  this.cube.position.z = 0;
  this.cube.castShadow = true;

  this.scene.add(this.cube);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(30,60,40);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  
  this.scene.add(spotLight);

  var planeGeometry =  new THREE.PlaneGeometry(60,60,1,1);
  var planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  var plan = new THREE.Mesh(planeGeometry,planeMaterial);
  plan.receiveShadow = true;
  plan.position.set(0,-4,-10);

  this.scene.add(plan);
  

  this.scene.add(new THREE.AxesHelper())

  this.renderer.render(this.scene,this.camera);
  // this.animate();

  this.setEvnetsMouse();
  this.setKeyEvents();






}
animate() {
  requestAnimationFrame(this.animate.bind(this));
  this.cube.rotation.z += 0.01;
  this.cube.rotation.y += 0.01;
  this.renderer.render(this.scene, this.camera)
}
setKeyEvents(){
  window.addEventListener('keydown',function(e){
    console.log("key :"+e.key)
  });
}
setEvnetsMouse(){
  window.addEventListener('click',function(e){
    console.log("click :"+e)

  });
  window.addEventListener('mousedown',function(e){
    console.log("click :"+e.type)

  });
  window.addEventListener('mouseup',function(e){
    console.log("click :"+e.type)

  });
  window.addEventListener('contextmenu',function(e){
    console.log("contextmenu :"+e.buttons)

  });
  window.addEventListener('mousemove',function(e){
    console.log("mousemove :"+e.x)

  })

}


onDocumentMouseDown($event: MouseEvent) {

  console.log(MouseEvent)
}

}
