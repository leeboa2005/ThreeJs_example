import * as THREE from 'three'
import { PointLight, TorusKnotGeometry } from 'three';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면추가
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  //카메라추가
  const fov = 120; // 광각 기울기가 클수록 멀리있는것 처럼 표현됨
  // 1~28 망원 , 47 기본 , 63~100 먼거리
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 (가로, 세로 비율)
  const near = 0.1; // 투시 
  const far = 1000; //
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = 0;
  camera.position.y = 1;
  camera.position.z = 1.8;
  camera.lookAt(new THREE.Vector3(0,0,0));


  //랜더러추가
  const renderer = new THREE.WebGLRenderer({
     alpha :true,
     antialias :true
    });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

//빛
// 1. AmbientLight (전역에서 비추는 빛 그림자가 없음) 2. DirectionalLight (특정 방향으로 빛을 방출) 3.HemisphereLight 4.PointLight 5.RectAreaLight 6.SpotLight (명확한 위치에 빛을 쏘는 느낌)


// const ambientLight = new THREE.AmbientLight(0xFF7F00, 0.1);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-1,1,1); 
const dlHeper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x0000ff);
// scene.add(dlHeper);
// scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000 , 1);
// scene.add(hemisphereLight);

const PointLight = new THREE.PointLight(0xffffff,1);
// scene.add(PointLight);
PointLight.position.set(-2,0.5,0.5);
const plhelper = new THREE.PointLightHelper(PointLight, 0.1);
// scene.add(plhelper);

const PointLight2 = new THREE.PointLight(0xffffff,1);
// scene.add(PointLight2);
PointLight2.position.set(2, 2, 0.5);
const plhelper2 = new THREE.PointLightHelper(PointLight2, 0.1);
// scene.add(plhelper2);

const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5);
rectAreaLight.position.set(0.5, 0.5, 1);
rectAreaLight.lookAt(0,0,0);
// scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0xffffff, 0.5);
scene.add(spotLight);


  //도형 추가

  const geometry = new THREE.SphereGeometry( 0.5, 32, 16);
  const material = new THREE.MeshStandardMaterial({
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.2;
  scene.add(cube);

//바닥 
const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({
  color:0xffffff
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5* Math.PI;
plane.position.y = -0.5;
scene.add(plane);

  function render() {
    renderer.render(scene, camera);
  }

  requestAnimationFrame(render);

  //반응형 처리

  function onWindowResize(){
    camera.aspect = window.innerWidth /window.innerHeight // 종횡비 조절떄문에 꼭 필요함
    camera.updateProjectionMatrix(); // 파라미터가 변경 될때 꼭 필요함
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
