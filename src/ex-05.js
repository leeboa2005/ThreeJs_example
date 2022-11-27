import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면추가
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  //카메라추가
  const fov = 63; // 광각 기울기가 클수록 멀리있는것 처럼 표현됨
  // 1~28 망원 , 47 기본 , 63~100 먼거리
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 (가로, 세로 비율)
  const near = 0.1; // 투시 
  const far = 1000; //
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//이해한 상태라면 한줄로 표현해도 좋음 
  // camera.position.set(0,0,6);  아래 코드3줄과 동일
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 1;
  camera.lookAt(new THREE.Vector3(0,0,0));


  //랜더러추가
  const renderer = new THREE.WebGLRenderer({
     alpha :true,
     antialias :true
    });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //빛 
  const PointLight = new THREE.PointLight(0xffffbb, 1);
  PointLight.position.set(0,2,12);
  scene.add(PointLight);

  //도형 추가

  const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF7F00,
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y= 0.5;
  scene.add(cube);

//바닥 
const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
const planeMaterial = new THREE.MeshStandardMaterial({
  color:0xeeeeee
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
