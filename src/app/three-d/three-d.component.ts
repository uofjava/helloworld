import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { fromEvent } from 'rxjs';
import { OrbitControls } from 'three-orbitcontrols-ts';
import * as dat from 'dat.gui';
@Component({
  selector: 'app-three-d',
  templateUrl: './three-d.component.html',
  styleUrls: ['./three-d.component.scss']
})



export class ThreeDComponent implements OnInit{
@ViewChild("canvasFrame",{static:true})canvasFrame!:ElementRef;
   // 渲染器
  private renderer = new THREE.WebGLRenderer({
    antialias:true
  })
  // 场景
  private scane = new THREE.Scene();
  // 坐标辅助线
  private axesHelper = new THREE.AxesHelper(100);
  // 形状
  private geometry = new THREE.BoxGeometry(100,100,100)
  // 图层
  private material = new THREE.MeshLambertMaterial({
    color:0xff0000,
    transparent:true,//开启透明
    opacity:0.5,
  })
  // 虚拟物，形状+图层
  private mesh = new THREE.Mesh(this.geometry,this.material)
  // 摄像机
  private camer = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,3000)
  // 光源
  private pointLight = new THREE.PointLight(0xfffffff,1.0)
  // 环境光源
  private ambient = new THREE.AmbientLight(0xffffff,0.5)
  // 轨道控制器
  private orbitControls = new OrbitControls(this.camer,this.renderer.domElement)
  // GUI
  private gui = new dat.GUI();
  private obj = {
    x:30,
    y:100,
    z:100,
    power:10,
    intensity:0.5
    }
  ngOnInit(): void {
    this.orbitControls.enableDamping = true
    this.orbitControls.enableZoom = true
    this.orbitControls.enablePan = true



    this.gui.add(this.obj,'x',0,100);
    this.gui.add(this.obj, 'power',0,100)
    this.gui.add(this.obj,'intensity',0,2.0)
    this.scane.add(this.axesHelper)
    // 光源
    this.pointLight.position.set(400,400,300)
    this.scane.add(this.pointLight)
    this.scane.add(this.ambient)
    // 设置虚拟物品，在场景位置
    this.mesh.position.set(0,0,0)
    
    // 将虚拟物品放入场景 
    this.scane.add(this.mesh)
    this.camer.position.set(200,200,200)
    this.camer.lookAt(0,0,0)
    // 将相机加入场景
    this.scane.add(this.camer)
    // 设置渲染尺寸
    this.renderer.setSize(window.innerWidth,window.innerHeight)
    // 通过摄像机+场景渲染一张图
    this.renderer.render(this.scane,this.camer)
    // 将渲染后图片，加载到html 节点
    this.canvasFrame.nativeElement.append(this.renderer.domElement)
    // this.orbitControls.update()
    this.animate()
    fromEvent(window,"resize").subscribe((e) =>{
      this.renderer.setSize(window.innerWidth,window.innerHeight)
      this.camer.aspect = window.innerWidth/window.innerHeight
      this.camer.updateProjectionMatrix()
    })
  }
  
  
  animate():void{
    requestAnimationFrame(this.animate.bind(this));
    this.mesh.rotation.z += 0.01;
    this.mesh.rotation.y += 0.01;

    this.pointLight.power = this.obj.power
    this.mesh.position.setX(this.obj.x)
    this.ambient.intensity = this.obj.intensity

    this.renderer.render(this.scane, this.camer)
  }
  

}
