import { Component, ElementRef, ViewChild } from '@angular/core';
import * as dat from 'dat.gui';
import { fromEvent } from 'rxjs';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-three-scane',
  templateUrl: './three-scane.component.html',
  styleUrls: ['./three-scane.component.scss']
})
export class ThreeScaneComponent {
  @ViewChild("canvasFrame",{static:true})canvasFrame!:ElementRef;
   // 渲染器
  private renderer = new THREE.WebGLRenderer({
    antialias:true
  })
  // 场景
  private scane = new THREE.Scene();
  // 坐标辅助线
  private axesHelper = new THREE.AxesHelper(4);
  // 环境光源
  private ambient = new THREE.AmbientLight(0xffffff,0.5)
  private camer = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,100)
  
  private loader = new GLTFLoader();
  // 轨道控制器
  private orbitControls = new OrbitControls(this.camer,this.renderer.domElement)
   // 光源
  private pointLight = new THREE.PointLight(0xfffffff,1.0)
  private gui = new dat.GUI();
  private obj = {
    intensity:0.5,
    power:2
    }
  ngOnInit(): void {
    this.orbitControls.enableDamping = true
    this.orbitControls.enableZoom = true
    this.orbitControls.enablePan = true
    this.gui.add(this.obj, 'power',0,100)
    this.gui.add(this.obj,'intensity',0,100.0)
    this.loadGLTF()
    this.scane.add(this.axesHelper)
    this.scane.add(this.ambient)
    // 光源
    this.pointLight.position.set(0,0,5)
    this.camer.position.set(5,5,5)
    this.camer.lookAt(0,0,0)
    // 设置渲染尺寸
    this.renderer.setSize(window.innerWidth,window.innerHeight)
    // 将渲染后图片，加载到html 节点
    this.canvasFrame.nativeElement.append(this.renderer.domElement)
    this.animate()
    fromEvent(window,"resize").subscribe((e) =>{
      this.renderer.setSize(window.innerWidth,window.innerHeight)
      this.camer.aspect = window.innerWidth/window.innerHeight
      this.camer.updateProjectionMatrix()
    })
  }
  
  animate():void{
    requestAnimationFrame(this.animate.bind(this));
    this.ambient.intensity = this.obj.intensity
    this.pointLight.power = this.obj.power
    this.renderer.render(this.scane, this.camer)
  }
  
  loadGLTF():void{
    this.loader =  new GLTFLoader();

    this.loader.load(
      "../../assets/gltf/car/scene.gltf",
       (gltf: GLTF) => {
        // start
        // KEEP
        console.log('camera length: ', gltf);
        console.log('gltf对象场景属性',gltf.scene)
        console.log('gltf对象相机属性',gltf.cameras)
        this.scane.add(gltf.scene);
        // this.renderer.render(this.scane,this.camer)
      }
      ,
      undefined,
      function (error) {
        console.error(error);
      }
    )
  }
}
