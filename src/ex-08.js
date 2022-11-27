import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitControls.js';
import { WEBGL } from './webgl'

console.log(OrbitControls);

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
  // 1. AmbientLight (전역에서 비추는 빛 그림자가 없음) 2. DirectionalLight (특정 방향으로 빛을 방출) 3.HemisphereLight 4.PointLight 5.RectAreaLight 6.SpotLight (명확한 위치에 빛을 쏘는 느낌)
  const ambientLight = new THREE.AmbientLight(0xFF7F00, 0.1);
  scene.add(ambientLight);
  // ambientLight.castShadow = true;  그림자 X

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1.5, 1.5, 1);
  const dlHeper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x0000ff);
  scene.add(dlHeper);
  scene.add(directionalLight);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 8; // 그림자가 좀 더 자연스럽게 부드럽게 보여지게함

  const PointLight = new THREE.PointLight(0xffffff, 1);
  PointLight.position.set(1, 1, 0.5);
  const plhelper = new THREE.PointLightHelper(PointLight, 0.1);
  // scene.add(PointLight);
  // scene.add(plhelper);
  // PointLight.castShadow = true;  그림자 O

  const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
  rectAreaLight.position.set(1, 0.5, 0.5);
  rectAreaLight.lookAt(0, 0, 0);
  // scene.add(rectAreaLight);
  // rectAreaLight.castShadow = true; 그림자 X

  const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  spotLight.position.set(1, 2, 1);
  scene.add(spotLight);
  // spotLight.castShadow = true; 그림자 O



  //도형 추가
  // const geometry = new THREE.ConeGeometry( 0.4, 0.7, 6);
  const geometry = new THREE.IcosahedronGeometry(0.3, 0);
  // const geometry = new THREE.SphereGeometry( 0.5, 32, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0xCC066
  });

  const obj = new THREE.Mesh(geometry, material);
  obj.rotation.y = 0.5;
  obj.position.y = 0.7;
  scene.add(obj);
  obj.castShadow = true;
  obj.receiveShadow = true;


  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0);
  const material2 = new THREE.MeshStandardMaterial({
    color: 0x004fff
  });

  const obj2 = new THREE.Mesh(geometry2, material2);
  obj.position.set(-1, 1.2, 0.5)
  scene.add(obj2);
  obj2.castShadow = true;


  //바닥 
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);
  plane.receiveShadow = true;


  function animate() {
    requestAnimationFrame(animate);
    obj.rotation.x  += 0.01;
    obj2.rotation.y -= 0.02;
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
