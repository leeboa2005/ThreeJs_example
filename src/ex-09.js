import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitControls.js';
import { WEBGL } from './webgl'


if (WEBGL.isWebGLAvailable()) {

  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const axesHelper = new THREE.AxesHelper(2)
  scene.add(axesHelper)

  //카메라
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
  camera.position.z = 2;


  //랜더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Orbitcontrols 추가
  // 카메라 포지션 설정 이후에 추가해줘야함 
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true
  controls.minDistance = 20;  //최소값 조절
  controls.mixDistance = 800;  //최소값 조절
  controls.update();

  const SkyMaterialArray = []
  const texture_ft = new THREE.TextureLoader().load('../static/img/sky-bg2/cocoa_ft.jpg')
  const texture_bk = new THREE.TextureLoader().load('../static/img/sky-bg2/cocoa_bk.jpg')
  const texture_up = new THREE.TextureLoader().load('../static/img/sky-bg2/cocoa_up.jpg')
  const texture_dn = new THREE.TextureLoader().load('../static/img/sky-bg2/cocoa_dn.jpg')
  const texture_rt = new THREE.TextureLoader().load('../static/img/sky-bg2/cocoa_rt.jpg')
  const texture_lf = new THREE.TextureLoader().load('../static/img/sky-bg2/cocoa_lf.jpg')

  SkyMaterialArray.push(
    new THREE.MeshBasicMaterial({
      map: texture_ft
    })
  )
  SkyMaterialArray.push(
    new THREE.MeshBasicMaterial({
      map: texture_bk
    })
  )
  SkyMaterialArray.push(
    new THREE.MeshBasicMaterial({
      map: texture_up
    })
  )
  SkyMaterialArray.push(
    new THREE.MeshBasicMaterial({
      map: texture_dn
    })
  )
  SkyMaterialArray.push(
    new THREE.MeshBasicMaterial({
      map: texture_rt
    })
  )
  SkyMaterialArray.push(
    new THREE.MeshBasicMaterial({
    map: texture_lf
  })
  )

  //반복문

for ( let i = 0; i < 6; i++){
  SkyMaterialArray[i].side = THREE.BackSide
}

  //메쉬 추가
  const skyGeometry = new THREE.BoxGeometry(2000, 2000, 2000)
  // SkyMaterial.side = THREE.BackSide
  const sky = new THREE.Mesh(skyGeometry, SkyMaterialArray )
  scene.add(sky)


  //빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  function animate() {
    requestAnimationFrame(animate);
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
