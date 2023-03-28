import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { ProjectTestComponent } from './project-test/project-test.component';
import { ThreeCadComponent } from './three-cad/three-cad.component';
import { ThreeDComponent } from './three-d/three-d.component';
import { ThreeGltfComponent } from './three-gltf/three-gltf.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ProjectTestComponent,
    ThreeCadComponent,
    ThreeDComponent,
    ThreeGltfComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
