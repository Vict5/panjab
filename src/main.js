import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);
camera.position.set(5, 5, 5);
// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Pointer Lock Controls
const controls = new PointerLockControls(camera, renderer.domElement);
renderer.domElement.addEventListener("click", () => {
  controls.lock();
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 20, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add a grid helper
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// GLTF Loader
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);
const p = document.createElement("p");
function createpointOfInterest(name, X, Y, Z) {
  const ball = new THREE.SphereGeometry(0.05);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(ball, mat);
  sphere.position.set(X, Y, Z);
  sphere.name = name;
  return sphere;
}
const group = new THREE.Group();
const sphereMesh1 = createpointOfInterest("sphereMesh1", -1.31, 0.58, 5.514);
group.add(sphereMesh1);
const sphereMesh2 = createpointOfInterest("sphereMesh2", -1.966, 0.58, 4.788);
group.add(sphereMesh2);
const sphereMesh3 = createpointOfInterest("sphereMesh3", -3.39, 0.58, 5.07);
group.add(sphereMesh3);
const sphereMesh4 = createpointOfInterest(
  "sphereMesh4",
  -3.6965,
  0.58,
  1.38411
);
group.add(sphereMesh4);
scene.add(group);
const mousepos = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const cPointlabel = new CSS2DObject(p);
window.addEventListener("mousemove", (event) => {
  camera.updateMatrixWorld();
  mousepos.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousepos.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mousepos, camera);
  const rect = renderer.domElement.getBoundingClientRect();
  const intersects = raycaster.intersectObjects(group);
  if (intersects.length > 0) {
    switch (intersects[0].object.name) {
      case "sphereMesh1":
        console.log("Hovered over Point 1");
        break;
      default:
        break;
    }
  }
});
// Load your GLTF model
loader.load(
  // Model URL (replace with your model path)
  "src/model/Untitled.glb",

  // onLoad callback
  function (glb) {
    const model = glb.scene;

    // Scale if needed
    model.rotation.x = Math.PI / 2;
    model.scale.set(0.01, 0.01, 0.01);

    // Position the model
    model.position.set(0, 0, 0);

    // Enable shadows if needed
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    scene.add(model);
    console.log("Model loaded successfully");

    // Center the camera on the model
    const box = new THREE.Box3().setFromObject(model);
    const moveVector = new THREE.Vector3(0, 0, 0);
    camera.position.set(1.03, 0.58, -0.688);
    controls.update();
  },

  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // onError callback
  function (error) {
    console.error("Error loading model:", error);
  }
);

//starting camera position
camera.position.set(0.1533, 0.58, 1.733);
camera.lookAt(-1.31, 0.58, 5.514);
//strarting text
const header1 = document.getElementById("header1");
header1.textContent = "MASTER PLAN";
const header2 = document.getElementById("header2");
header2.textContent = "PANJAB UNIVERSITY";
const para1 = document.getElementById("content");
para1.textContent =
  "Architects: Pierre Jeanneret, Le Corbusier, Maxwell Fry and Jane Drew \r\nYear(s): 1951-1965\r\nLocation: Chandigarh, India\r\nThe Panjab University Campus in Chandigarh is a landmark project of post-Independence Indian modernism, designed by the renowned architect Pierre Jeanneret (cousin and collaborator of Le Corbusier) in the 1950s. As part of the larger Chandigarh Capital Project, the campus embodies the principles of the Modern Movement, specifically adapting them for the local climate and context.\r\nThe design features a strict gridiron plan organized around a central pedestrian mall. The architecture is characterized by features like exposed brick, reinforced concrete, deep verandahs, shaded public spaces and brise-soleil.\r\nThe campus includes a series of academic buildings, hostels, and faculty housing, all unified by a consistent material palette and a human-centric scale. The project is celebrated not just as an educational institution but as a holistic application of modernist urban planning and architectural design.\r\n";
// Animation loop
function clear() {
  const header1 = document.getElementById("header1");
  header1.textContent = "";
  const header2 = document.getElementById("header2");
  header2.textContent = "";
  const para1 = document.getElementById("content");
  para1.textContent = "";
  const cont1 = document.getElementById("content1");
  cont1.textContent = "";
  const cont2 = document.getElementById("content2");
  cont2.textContent = "";
  const cont3 = document.getElementById("content3");
  cont3.textContent = "";
  const cont4 = document.getElementById("content4");
  cont4.textContent = "";
  const cont5 = document.getElementById("content5");
  cont5.textContent = "";
  const img1 = document.getElementById("image1");
  img1.src = "";
  img1.style.width = "";
  img1.style.height = "";
  const img2 = document.getElementById("image2");
  img2.src = "";
  img2.style.width = "";
  img2.style.height = "";
  const img3 = document.getElementById("image3");
  img3.src = "";
  img3.style.width = "";
  img3.style.height = "";
  const img4 = document.getElementById("image4");
  img4.src = "";
  img4.style.width = "";
  img4.style.height = "";
  const img5 = document.getElementById("image5");
  img5.src = "";
  img5.style.width = "";
  img5.style.height = "";
}
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "W") {
      controls.moveForward(0.0001);
    }
    if (event.key === "s" || event.key === "S") {
      controls.moveForward(-0.0001);
    }
    if (event.key === "a" || event.key === "A") {
      controls.moveRight(-0.0001);
    }
    if (event.key === "d" || event.key === "D") {
      controls.moveRight(0.0001);
    }
    if (event.key === "l") {
      console.log("Camera position:", camera.position);
    }
  });
  //code for show / hiding overlay
  document.getElementById("show").onclick = function () {
    const overlay = document.getElementById("overlay");
    if (overlay.style.display === "none") {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  };
  //camera positions for building Inspection
  document.getElementById("l0").onclick = function () {
    clear();
    camera.position.set(0.1533, 0.58, 1.733);
    camera.lookAt(-1.31, 0.58, 5.514);
    const header1 = document.getElementById("header1");
    header1.textContent = "MASTER PLAN";
    const header2 = document.getElementById("header2");
    header2.textContent = "PANJAB UNIVERSITY";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architects: Pierre Jeanneret, Le Corbusier, Maxwell Fry and Jane Drew \r\nYear(s): 1951-1965\r\nLocation: Chandigarh, India\r\nThe Panjab University Campus in Chandigarh is a landmark project of post-Independence Indian modernism, designed by the renowned architect Pierre Jeanneret (cousin and collaborator of Le Corbusier) in the 1950s. As part of the larger Chandigarh Capital Project, the campus embodies the principles of the Modern Movement, specifically adapting them for the local climate and context.\r\nThe design features a strict gridiron plan organized around a central pedestrian mall. The architecture is characterized by features like exposed brick, reinforced concrete, deep verandahs, shaded public spaces and brise-soleil.\r\nThe campus includes a series of academic buildings, hostels, and faculty housing, all unified by a consistent material palette and a human-centric scale. The project is celebrated not just as an educational institution but as a holistic application of modernist urban planning and architectural design.\r\n";
  };
  document.getElementById("l1").onclick = function () {
    clear();
    camera.position.set(-0.688, 0.58, 4.9742);
    camera.lookAt(-1.31, 0, 5.514);
    const header1 = document.getElementById("header1");
    header1.textContent = "STUDENTS' CENTER";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architect: Bhanu P. Mathur (also referred to as Shri B.P. Manthur in some sources)\r\nYear Built: 1975 ";
    const image1 = document.getElementById("image1");
    image1.src = "src/images/sc1.png";
    image1.style.width = "300px";
    image1.style.height = "150px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "FIGURE 1: Students’ center model showcasing the ramp and brise soleil used in shading \r\nIntended Use: Hub for student activities, including recreation, dining (cafeterias, coffee house), social gatherings, student council offices, and cultural events. \r\nCurrent Use: Remains a vibrant student hub (known as Stu-C), popular for affordable eateries, hangouts, events, and as a social/cultural landmark; also attracts visitors and alumni. \r\n";
    const image2 = document.getElementById("image2");
    image2.src = "src/images/sc2.png";
    image2.style.width = "380px";
    image2.style.height = "150px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "FIGURE 2 & 3: Effect of brise soleil on the interior of the building, creates cooler shadows, mitigating direct sunlight\r\nClimatic Approaches (Past/Original Design):\r\n Modernist brutalist style with exposed concrete for thermal mass, a prominent external ramp serving as a shading device to reduce heat gain, and integration with surrounding greenery/lake for natural cooling in Chandigarh's hot-dry climate. ";
    const image3 = document.getElementById("image3");
    image3.src = "src/images/sc3.png";
    image3.style.width = "380px";
    image3.style.height = "200px";
    const content3 = document.getElementById("content3");
    content3.textContent =
      "Present Climatic Approaches:\r\n Primarily relies on original passive design elements (shading, ventilation, thermal mass); some campus-wide additions like air-conditioning in related facilities, but no major specific retrofits noted for the Student Centre itself. ";
    const content4 = document.getElementById("content4");
    content4.textContent =
      "Figure 4: Solar panels fitted on brise soleil\r\nThese align with regional sustainability trends but remain speculative for this specific building. ";
    const image4 = document.getElementById("image4");
    image4.src = "src/images/sc4.png";
    image4.style.width = "330px";
    image4.style.height = "200px";
    const content5 = document.getElementById("content5");
    content5.textContent =
      "Figure 5: Students’ center flat roof used as a green roof.";
    const image5 = document.getElementById("image5");
    image5.src = "src/images/sc5.png";
    image5.style.width = "330px";
    image5.style.height = "200px";
  };
  document.getElementById("l2").onclick = function () {
    camera.position.set(-1.0805, 0.58, 4.244);
    camera.lookAt(-1.966, 0, 4.788);
    clear();
    const header1 = document.getElementById("header1");
    header1.textContent = "A.C Joshi Library";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architects: Pierre Jeanneret, B.P. Mathur, B.S. Kesavan, and J.S. Sharma. Year Built: Foundation stone laid in 1958; inaugurated in 1963 by Jawaharlal Nehru. Intended Use: Central university library for academic research, reading, and housing extensive collections. Current Use: Main university library with over 800,000 documents, rare manuscripts, digital resources; centrally air-conditioned, 24/7 reading hall access; popular study spot. Climatic Approaches (Past/Original Design): Diagonal east-west orientation for optimal natural ";
    const image1 = document.getElementById("image1");
    image1.src = "src/images/lb1.png";
    image1.style.width = "300px";
    image1.style.height = "150px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "Figure 1: Model of the Northern Facade's RC sun breakers daylight in reading areas; brise-soleil (sun breakers) on northern façade to control glare and heat; projected balconies on south for shading in Chandigarh's hot-dry climate; panoramic views of Shivalik Hills for natural ventilation.";
    const image2 = document.getElementById("image2");
    image2.src = "src/images/lb2.png";
    image2.style.width = "380px";
    image2.style.height = "150px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "Figure 2: Sectional illustration of how the sun breakers facilitate ventilation and sun shading.Present Climatic Approaches: Relies on original passive features plus full central air-conditioning; ongoing conservation for issues like roof leakage.";
    const image3 = document.getElementById("image3");
    image3.src = "src/images/lb3.png";
    image3.style.width = "380px";
    image3.style.height = "200px";
    const content3 = document.getElementById("content3");
    content3.textContent =
      "Figure 3: Vertical green wall on parts of the facade Future Retrofit Strategies: potential includes green walls for insulation, reducing cooling loads and urban heat in hot summers, and solar panels on the flat roof to generate renewable energy, offsetting high AC usage while enhancing sustainability.";
  };
  document.getElementById("l3").onclick = function () {
    camera.position.set(-2.51464, 0.58, 4.5016);
    camera.lookAt(-3.39, 0, 5.07);
    clear();
    const header1 = document.getElementById("header1");
    header1.textContent = "GANDHI BHAWAN";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architect: Pierre Jeanneret with B.P. Mathur.Year Built: Completed and inaugurated in 1962.";
    const image1 = document.getElementById("image1");
    image1.src = "src/images/gb1.png";
    image1.style.width = "300px";
    image1.style.height = "150px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "Figure 1: Gandhi Bhawan model Intended Use: Centre dedicated to the study of Mahatma Gandhi's life, works, and philosophy; includes auditorium, library, and spaces for seminars/exhibitions.Current Use: Auditorium and hub for Gandhian studies, events, exhibitions; iconic landmark attracting visitors for its architecture and serene setting.";
    const image2 = document.getElementById("image2");
    image2.src = "src/images/gb2.png";
    image2.style.width = "380px";
    image2.style.height = "150px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "Climatic Approaches (Past/Original Design): Lotus-shaped structure placed in a reflecting pond to create evaporative cooling and dry microclimate in Chandigarh's hot- conditions; curved forms and elevated position enhance natural ventilation; reflective water reduces surrounding heat gain.";
    const image3 = document.getElementById("image3");
    image3.src = "src/images/gb3.png";
    image3.style.width = "380px";
    image3.style.height = "200px";
    const content3 = document.getElementById("content3");
    content3.textContent =
      "Figure 2 and 3: Gandhi Bhawan pool, evaporative cooling illustration Present Climatic Approaches: Relies on original passive cooling via pond and design; ongoing heritage conservation (e.g., pool refurbishment, roof repairs) maintains these features; limited mechanical interventions to preserve authenticity.";
    const content4 = document.getElementById("content4");
    content4.textContent =
      "Figure 4: Use of Solar aerators in the pool\r\nFuture Retrofit Strategies: Focus on conservation rather than major alterations due to heritage status; potential sensitive additions like Solar aerators to enhance evaporative cooling, or solar panels discreetly integrated to generate renewable energy while respecting the iconic form and pond setting. ";
    const image4 = document.getElementById("image4");
    image4.src = "src/images/gb4.png";
    image4.style.width = "330px";
    image4.style.height = "200px";
  };
  document.getElementById("l4").onclick = function () {
    camera.position.set(-2.3561, 0.58, 0.3952);
    camera.lookAt(-3.6965, 0, 1.38411);
    clear();
    const header1 = document.getElementById("header1");
    header1.textContent = "BOYS' HOSTEL";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architect: Pierre Jeanneret Year Built: Primarily late 1950s to 1960s (as part of the campus development post-1956 relocation).";
    const image1 = document.getElementById("image1");
    image1.src = "src/images/bh1.png";
    image1.style.width = "300px";
    image1.style.height = "150px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "Figure 1: Model of boy’s hostel Intended Use: Residential accommodation for male students, providing affordable living with shared rooms, mess facilities, and common areas.  Current Use: Active residence for male students (8 hostels accommodating thousands); vibrant community spaces with mess, canteens, and recreational facilities. ";
    const image2 = document.getElementById("image2");
    image2.src = "src/images/bh2.png";
    image2.style.width = "380px";
    image2.style.height = "150px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "Climatic Approaches (Past/Original Design): Modernist design with exposed brick/concrete for thermal mass, sun-filled balconies and light wells for natural ventilation and daylight, orientation to maximize cross-breeze in hot-dry climate.  ";
    const image3 = document.getElementById("image3");
    image3.src = "src/images/bh3.png";
    image3.style.width = "380px";
    image3.style.height = "200px";
    const content3 = document.getElementById("content3");
    content3.textContent =
      "Figure 2 and 3: Use of balconies in the design for sun shadingPresent Climatic Approaches: Largely original passive features; supplemented by fans, limited AC in newer sections, and ongoing maintenance. Future Retrofit Strategies: green roofs for insulation and reduced heat gain in summers, and solar panels on flat roofs to generate renewable energy, lowering electricity demands while respecting heritage modernist style.";
    const content4 = document.getElementById("content4");
    content4.textContent = "Figure 4: Flat roof used as green roof";
    const image4 = document.getElementById("image4");
    image4.src = "src/images/bh4.png";
    image4.style.width = "330px";
    image4.style.height = "200px";
  };
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
