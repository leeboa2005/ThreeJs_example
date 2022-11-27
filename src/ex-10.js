import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitControls.js';
import { WEBGL } from './webgl'

console.log(OrbitControls);

if (WEBGL.isWebGLAvailable()) {

  const FogColor = 0x004fff
  const objColor = 0xffffff
  const FoorColor = 0x555555

  //장면추가
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FogColor);
  scene.fog = new THREE.Fog(FogColor, 1,16); // 안개를 원하는 위치에서 fadeout 느낌을 줄 수 있다. 
  scene.fog = new THREE.FogExp2(FogColor, 0.2) // 밀도 1에 가까울 수록 안보임

  //카메라추가
  const fov = 47; // 광각 기울기가 클수록 멀리있는것 처럼 표현됨
  // 1~28 망원 , 47 기본 , 63~100 먼거리
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 (가로, 세로 비율)
  const near = 0.1; // 투시 
  const far = 1000; //
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = 0;
  camera.position.y = 2;
  camera.position.z = 1.8;
  camera.lookAt(new THREE.Vector3(0, 0, 0));


  //랜더러추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  //Orbitcontrols 추가
  // 카메라 포지션 설정 이후에 추가해줘야함 
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 2;  //최소값 조절
  controls.mixDistance = 3;  //최소값 조절
  controls.maxPolarAngle = Math.PI / 2; // 원주율 / 2 를 해주면 바닥부분이 적당한 부분까지만 보이게된다.
  controls.update();

//빛
  const PointLight = new THREE.PointLight(0xffffff, 1);
  PointLight.position.set(0,2,12);
  scene.add(PointLight);


  //도형 추가
  const geometry = new THREE.TorusGeometry( 0.3, 0.15, 16, 40);
  const material = new THREE.MeshStandardMaterial({
    color: objColor,
    clearcoat : 1,
    clearcoatRoughness : 0.1
  });

  const obj = new THREE.Mesh(geometry, material);
  obj.position.x = 0;
  obj.position.y = 0;
  scene.add(obj);

//바닥 
const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
const planeMaterial = new THREE.MeshStandardMaterial({
  color:FoorColor
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5* Math.PI;
plane.position.y = -0.5;
scene.add(plane);

  function animate() {
    requestAnimationFrame(animate);
    obj.rotation.y  += 0.01;
    controls.update();
    renderer.render(scene, camera);

  }
  animate()

  //반응형 처리

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight // 종횡비 조절떄문에 꼭 필요함
    camera.updateProjectionMatrix(); // 파라미터가 변경 될때 꼭 필요함
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
