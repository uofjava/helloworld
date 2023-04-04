import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
@Component({
  selector: 'app-three-gltf',
  templateUrl: './three-gltf.component.html',
  styleUrls: ['./three-gltf.component.scss']
})
export class ThreeGltfComponent implements OnInit{

  @ViewChild("canvasFrame",{static:true})canvasFrame!:ElementRef;

  private loader = new GLTFLoader();
   // 渲染器
   private renderer = new THREE.WebGLRenderer({
    antialias:true
  })
  // 场景
  private scane = new THREE.Scene();
  // 坐标辅助线
  private axesHelper = new THREE.AxesHelper(1000);
  // 摄像机
  private camer = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,3000)
  // 光源
  private pointLight = new THREE.PointLight(0xfffffff,1.0)
  // 环境光源
  private ambient = new THREE.AmbientLight(0xffffff,0.5)
  // 轨道控制器
  private orbitControls = new OrbitControls(this.camer,this.renderer.domElement)
  // GUI
  private theModel:any
  // private modelPath = "../../"
  ngOnInit(): void {
    this.initCamer()
    this.initLight()
    this.initOrbitControl()
    this.initRender()
    // this.loadGLTF()
    this.animate()
    fromEvent(window,"resize").subscribe((e) =>{
      this.renderer.setSize(window.innerWidth,window.innerHeight)
      this.camer.aspect = window.innerWidth/window.innerHeight
      this.camer.updateProjectionMatrix()
    })
  }
  animate():void{
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scane, this.camer)
  }
  initRender():void{
    // 设置渲染尺寸
    this.renderer.setSize(window.innerWidth,window.innerHeight)
    // 通过摄像机+场景渲染一张图
    this.renderer.render(this.scane,this.camer)
    // 将渲染后图片，加载到html 节点
    this.canvasFrame.nativeElement.append(this.renderer.domElement)
  }
  initCamer():void{
    this.camer.position.set(200,200,200)
    this.camer.lookAt(0,0,0)
    // 将相机加入场景
    this.scane.add(this.camer)
  }
  initLight():void{
    this.pointLight.position.set(400,400,300)
    this.scane.add(this.pointLight)
    this.scane.add(this.ambient)
  }
  initOrbitControl():void{
    this.orbitControls.enableDamping = true
    this.orbitControls.enableZoom = true
    this.orbitControls.enablePan = true
  }
  loadGLTF():void{
    this.loader =  new GLTFLoader();

    this.loader.load(
      "../../assets/gltf/car/scene.gltf",
       (gltf: GLTF) => {
        // start
        // KEEP
        console.log('SCNEE IS ', this.scane);
        this.theModel = gltf.scene;         // <--- error
        this.theModel.traverse((o:any) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        // Set the models initial scale
        // this.theModel.scale.set(0, 0, 0);
      

        console.log("traversing to model");
        this.theModel.traverse((o:any) => {

          if (o.type === "Mesh") {
            console.log("-> ", o);
            // o.material = this.INITIAL_MTL;

          }

        });
        console.log("traversing end");

        // Add the model to the scene
        // console.log('model is', this.theModel);

        this.scane.add(this.theModel);
 
      }
      ,
      undefined,
      function (error) {
        console.error(error);
      }
    )
  }
}
