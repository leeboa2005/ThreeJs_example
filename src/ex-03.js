import * as THREE from 'three'
import { PointLight, TorusKnotGeometry } from 'three';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;


  //랜더러
  const renderer = new THREE.WebGLRenderer({
     alpha :true,
     antialias :true
    });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  //빛 
  const PointLight = new THREE.PointLight(0xffffff, 1);
  PointLight.position.set(0,2,12);
  scene.add(PointLight);


  //도형 추가

  //01
  const geometry = new THREE.TorusGeometry( 0.3, 0.15, 16, 40);
  const material01 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00,
    matalness: 0.6,
    roughness:0.4,
    // wireframe:true,
    // transparent: true,
    // opacity:0.5

  });

  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x=-2;
  scene.add(obj01);

  //02
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xFFBB00,
        // matalness: 0.6,
    // roughness:0.4,
  });

  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x=-1;
  scene.add(obj02);

  // 03
  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xFF7F00,
    clearcoat : 1,
    clearcoatRoughness : 0.1
  });


  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x=0;
  scene.add(obj03);

    // 04
    const material04 = new THREE.MeshLambertMaterial({
      color: 0xFF7F00,
      shininess:60,
      // specular:0x004fff
    });
  
    const obj04 = new THREE.Mesh(geometry, material04);
    obj04.position.x=1;
    scene.add(obj04);

      // 05
  const material05 = new THREE.MeshPhongMaterial({
    color: 0xFF7F00
  });

  const obj05 = new THREE.Mesh(geometry, material05);
  obj05.position.x=2;
  scene.add(obj05);

  function render(time) {
    time *= 0.0005;  // convert time to seconds

    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    obj05.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  //반응형 처리

  function onWindowResize(){
    camera.aspect = window.innerWidth /window.innerHeight // 종횡비 조절떄문에 꼭 필요함
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
