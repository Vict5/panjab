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
// Load your GLTF model
loader.load(
  // Model URL (replace with your model path)
  "https://media.githubusercontent.com/media/Vict5/panjab/master/public/model/Untitled.glb",
  // "/model/Untitled.glb",
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
header1.textContent = "PANJAB UNIVERSITY";
const image1 = document.getElementById("image6");
image1.src = "/images/pui.jpg";
image1.style.width = "380px";
image1.style.height = "269px";
const cont6 = document.getElementById("content6");
cont6.textContent =
  "Master plan for Panjab University, Chandigarh, India (1958)";
const image2 = document.getElementById("image7");
image2.src = "/images/mp2.png";
image2.style.width = "380px";
image2.style.height = "214px";
const cont7 = document.getElementById("content7");
cont7.textContent = " Panjab university axononometric map (2025)";
const para1 = document.getElementById("content");
para1.textContent =
  "Architects: Pierre Jeanneret, Le Corbusier, Maxwell Fry and Jane Drew \r\nYear(s): 1951-1965\r\nLocation: Chandigarh, India\r\n\r\nThe Panjab University Campus in Chandigarh is a landmark project of post-Independence Indian modernism, designed by the renowned architect Pierre Jeanneret (cousin and collaborator of Le Corbusier) in the 1950s. As part of the larger Chandigarh Capital Project, the campus embodies the principles of the Modern Movement, specifically adapting them for the local climate and context.\r\nThe design features a strict gridiron plan organized around a central pedestrian mall. The architecture is characterized by features like exposed brick, reinforced concrete, deep verandahs, shaded  spaces and brise-soleil.\r\nThe campus includes a series of academic buildings, hostels, and faculty housing, all unified by a consistent material palette and a human-centric scale. The project is celebrated not just as an educational institution but as a holistic application of modernist urban planning and architectural design.\r\n";
// Animation loop
function clear() {
  const header1 = document.getElementById("header1");
  header1.textContent = "";
  header1.style.margin = "none";
  const header2 = document.getElementById("header2");
  header2.textContent = "";
  header2.style.margin = "none";
  const para1 = document.getElementById("content");
  para1.textContent = "";
  para1.style.margin = "none";
  const cont1 = document.getElementById("content1");
  cont1.textContent = "";
  cont1.style.margin = "none";
  const cont2 = document.getElementById("content2");
  cont2.textContent = "";
  cont2.style.margin = "none";
  const cont3 = document.getElementById("content3");
  cont3.textContent = "";
  cont3.style.margin = "none";
  const cont4 = document.getElementById("content4");
  cont4.textContent = "";
  cont4.style.margin = "none";
  const cont5 = document.getElementById("content5");
  cont5.textContent = "";
  cont5.style.margin = "none";
  const cont6 = document.getElementById("content6");
  cont6.textContent = "";
  cont6.style.margin = "none";
  const cont7 = document.getElementById("content7");
  cont7.textContent = "";
  cont7.style.margin = "none";
  const cont8 = document.getElementById("content8");
  cont8.textContent = "";
  cont8.style.margin = "none";
  const img1 = document.getElementById("image1");
  img1.src = "";
  img1.style.width = "";
  img1.style.height = "";
  const img2 = document.getElementById("image2");
  img2.src = "";
  img2.style.width = "";
  img2.style.height = "";
  const img2add = document.getElementById("image2add");
  img2add.src = "";
  img2add.style.width = "";
  img2add.style.height = "";
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
  const img6 = document.getElementById("image6");
  img6.src = "";
  img6.style.width = "";
  img6.style.height = "";
  const img7 = document.getElementById("image7");
  img7.src = "";
  img7.style.width = "";
  img7.style.height = "";
  const img8 = document.getElementById("image8");
  img8.src = "";
  img8.style.width = "";
  img8.style.height = "";
}
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  console.log(camera.position);
  const elementToTrack = document.getElementById("overlay");
  // Add event listener for when the mouse enters the element x: 0.9678562723667705, y: 0, z: 6.933538546315479  x: 1.9287538764041967, y: 0.58, z: 7.179853690502065
  window.addEventListener("wheel", (event) => {
    if (!elementToTrack.matches(":hover")) {
      if (event.deltaY < 0) {
        controls.moveForward(0.0001);
      }
      if (event.deltaY > 0) {
        controls.moveForward(-0.0001);
      }
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
    camera.lookAt(-1.31, -1.5, 5.514);
    const header1 = document.getElementById("header1");
    header1.textContent = "PANJAB UNIVERSITY";
    const image1 = document.getElementById("image6");
    image1.src = "/images/pui.jpg";
    image1.style.width = "380px";
    image1.style.height = "269px";
    const cont6 = document.getElementById("content6");
    cont6.textContent =
      "Master plan for Panjab University, Chandigarh, India (1958)";
    const image2 = document.getElementById("image7");
    image2.src = "/images/mp2.png";
    image2.style.width = "380px";
    image2.style.height = "214px";
    const cont7 = document.getElementById("content7");
    cont7.textContent = " Panjab university axononometric map (2025)";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architects: Pierre Jeanneret, Le Corbusier, Maxwell Fry and Jane Drew \r\nYear(s): 1951-1965\r\nLocation: Chandigarh, India\r\n\r\nThe Panjab University Campus in Chandigarh is a landmark project of post-Independence Indian modernism, designed by the renowned architect Pierre Jeanneret (cousin and collaborator of Le Corbusier) in the 1950s. As part of the larger Chandigarh Capital Project, the campus embodies the principles of the Modern Movement, specifically adapting them for the local climate and context.\r\nThe design features a strict gridiron plan organized around a central pedestrian mall. The architecture is characterized by features like exposed brick, reinforced concrete, deep verandahs, shaded  spaces and brise-soleil.\r\nThe campus includes a series of academic buildings, hostels, and faculty housing, all unified by a consistent material palette and a human-centric scale. The project is celebrated not just as an educational institution but as a holistic application of modernist urban planning and architectural design.\r\n";
  };
  document.getElementById("l1").onclick = function () {
    clear();
    camera.position.set(-0.688, 0.58, 4.9742);
    camera.lookAt(-1.31, 0, 5.514);
    const header1 = document.getElementById("header1");
    header1.textContent = "STUDENTS' CENTER";
    const image6 = document.getElementById("image6");
    image6.src = "/images/sc6.png";
    image6.style.width = "380px";
    image6.style.height = "609px";
    const image7 = document.getElementById("image7");
    image7.src = "/images/sc7.png";
    image7.style.width = "380px";
    image7.style.height = "253px";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architect: Bhanu P. Mathur (also referred to as Shri B.P. Manthur in some sources)\r\nYear Built: 1975 ";
    const image1 = document.getElementById("image1");
    image1.src = "/images/sc1.png";
    image1.style.width = "391px";
    image1.style.height = "220px";
    const content1 = document.getElementById("content1");
    content1.style.margin = "none";
    content1.textContent =
      "FIGURE 1: Students’ center model showcasing the ramp and brise soleil used in shading\r\n\r\nIntended Use: Hub for student activities, including recreation, dining (cafeterias, coffee house), social gatherings, student council offices, and cultural events. \r\nCurrent Use: Remains a vibrant student hub (known as Stu-C), popular for affordable eateries, hangouts, events, and as a social/cultural landmark; also attracts visitors and alumni. \r\n";
    const image2 = document.getElementById("image2");
    image2.src = "/images/sc2.png";
    image2.style.width = "380px";
    image2.style.height = "178px";
    const image2add = document.getElementById("image2add");
    image2add.src = "/images/sc3.png";
    image2add.style.width = "380px";
    image2add.style.height = "214px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "FIGURE 2 & 3: Effect of brise soleil on the interior of the building, creates cooler shadows, mitigating direct sunlight\r\nClimatic Approaches (Past/Original Design):\r\n Modernist brutalist style with exposed concrete for thermal mass, a prominent external ramp serving as a shading device to reduce heat gain, and integration with surrounding greenery/lake for natural cooling in Chandigarh's hot-dry climate. \r\nPresent Climatic Approaches:\r\n Primarily relies on original passive design elements (shading, ventilation, thermal mass); some campus-wide additions like air-conditioning in related facilities, but no major specific retrofits noted for the Student Centre itself. ";
    const content4 = document.getElementById("content4");
    content4.textContent =
      "Figure 4: Solar panels fitted on brise soleil .These align with regional sustainability trends but remain speculative for this specific building. ";
    const image4 = document.getElementById("image4");
    image4.src = "/images/sc4.png";
    image4.style.width = "380px";
    image4.style.height = "213px";
    const content5 = document.getElementById("content5");
    content5.textContent =
      "Figure 5: Students’ center flat roof used as a green roof.";
    const image5 = document.getElementById("image5");
    image5.src = "/images/sc5.png";
    image5.style.width = "380px";
    image5.style.height = "225px";
  };
  document.getElementById("l2").onclick = function () {
    camera.position.set(-1.0805, 0.58, 4.244);
    camera.lookAt(-1.966, 0, 4.788);
    clear();
    const header1 = document.getElementById("header1");
    header1.textContent = "A.C Joshi Library";
    const image6 = document.getElementById("image6");
    image6.src = "/images/lb4.png";
    image6.style.width = "380px";
    image6.style.height = "268px";
    const image7 = document.getElementById("image7");
    image7.src = "/images/lb5.png";
    image7.style.width = "380px";
    image7.style.height = "381px";
    const image8 = document.getElementById("image8");
    image8.src = "/images/lb6.png";
    image8.style.width = "380px";
    image8.style.height = "268px";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architects: Pierre Jeanneret, B.P. Mathur, B.S. Kesavan, and J.S. Sharma. \r\nYear Built: Foundation stone laid in 1958; inaugurated in 1963 by Jawaharlal Nehru.\r\n\r\nIntended Use: Central university library for academic research, reading, and housing extensive collections. \r\nCurrent Use: Main university library with over 800,000 documents, rare manuscripts, digital resources; centrally air-conditioned, 24/7 reading hall access; popular study spot. \r\nClimatic Approaches (Past/Original Design): Diagonal east-west orientation for optimal natural ";
    const image1 = document.getElementById("image1");
    image1.src = "/images/lb1.png";
    image1.style.width = "380px";
    image1.style.height = "259px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "Figure 1: Model of the Northern Facade's RC sun breakers daylight in reading areas; brise-soleil (sun breakers) on northern façade to control glare and heat; projected balconies on south for shading in Chandigarh's hot-dry climate; panoramic views of Shivalik Hills for natural ventilation.";
    const image2 = document.getElementById("image2");
    image2.src = "/images/lb2.png";
    image2.style.width = "385px";
    image2.style.height = "379px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "Figure 2: Sectional illustration of how the sun breakers facilitate ventilation and sun shading.Present \r\nClimatic Approaches: Relies on original passive features plus full central air-conditioning; ongoing conservation for issues like roof leakage.";
    const image3 = document.getElementById("image3");
    image3.src = "/images/lb3.png";
    image3.style.width = "380px";
    image3.style.height = "214px";
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
    const image6 = document.getElementById("image6");
    image6.src = "/images/gb5.png";
    image6.style.width = "380px";
    image6.style.height = "247px";
    const image7 = document.getElementById("image7");
    image7.src = "/images/gb6.png";
    image7.style.width = "380px";
    image7.style.height = "308px";
    const image8 = document.getElementById("image8");
    image8.src = "/images/gb7.png";
    image8.style.width = "380px";
    image8.style.height = "351px";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architect: Pierre Jeanneret with B.P. Mathur.\r\nYear Built: Completed and inaugurated in 1962.";
    const image1 = document.getElementById("image1");
    image1.src = "/images/gb1.png";
    image1.style.width = "389px";
    image1.style.height = "246px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "Figure 1: Gandhi Bhawan model \r\n\r\nIntended Use: Centre dedicated to the study of Mahatma Gandhi's life, works, and philosophy; includes auditorium, library, and spaces for seminars/exhibitions.\r\nCurrent Use: Auditorium and hub for Gandhian studies, events, exhibitions; iconic landmark attracting visitors for its architecture and serene setting.";
    const image2 = document.getElementById("image2");
    image2.src = "/images/gb2.png";
    image2.style.width = "380px";
    image2.style.height = "162px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "Climatic Approaches (Past/Original Design): Lotus-shaped structure placed in a reflecting pond to create evaporative cooling and dry microclimate in Chandigarh's hot- conditions; curved forms and elevated position enhance natural ventilation; reflective water reduces surrounding heat gain.";
    const image3 = document.getElementById("image3");
    image3.src = "/images/gb3.png";
    image3.style.width = "380px";
    image3.style.height = "300px";
    const content3 = document.getElementById("content3");
    content3.textContent =
      "Figure 2 and 3: Gandhi Bhawan pool, evaporative cooling illustration Present Climatic Approaches: Relies on original passive cooling via pond and design; ongoing heritage conservation (e.g., pool refurbishment, roof repairs) maintains these features; limited mechanical interventions to preserve authenticity.";
    const content4 = document.getElementById("content4");
    content4.textContent =
      "Figure 4: Use of Solar aerators in the pool\r\nFuture Retrofit Strategies: Focus on conservation rather than major alterations due to heritage status; potential sensitive additions like Solar aerators to enhance evaporative cooling, or solar panels discreetly integrated to generate renewable energy while respecting the iconic form and pond setting. ";
    const image4 = document.getElementById("image4");
    image4.src = "/images/gb4.png";
    image4.style.width = "380px";
    image4.style.height = "146px";
  };
  document.getElementById("l4").onclick = function () {
    camera.position.set(1.928, 0.58, 7.179);
    camera.lookAt(0.967, 0, 6.933);
    clear();
    const header1 = document.getElementById("header1");
    header1.textContent = "BOYS' HOSTEL";
    const image6 = document.getElementById("image6");
    image6.src = "/images/bh5.png";
    image6.style.width = "380px";
    image6.style.height = "288px";
    const image7 = document.getElementById("image7");
    image7.src = "/images/bh6.png";
    image7.style.width = "380px";
    image7.style.height = "230px";
    const image8 = document.getElementById("image8");
    image8.src = "/images/bh7.png";
    image8.style.width = "380px";
    image8.style.height = "279px";
    const para1 = document.getElementById("content");
    para1.textContent =
      "Architect: Pierre Jeanneret\r\n Year Built: Primarily late 1950s to 1960s (as part of the campus development post-1956 relocation).";
    const image1 = document.getElementById("image1");
    image1.src = "/images/bh1.png";
    image1.style.width = "300px";
    image1.style.height = "146px";
    const content1 = document.getElementById("content1");
    content1.textContent =
      "Figure 1: Model of boy’s hostel \r\n\r\nIntended Use: Residential accommodation for male students, providing affordable living with shared rooms, mess facilities, and common areas.  \r\nCurrent Use: Active residence for male students (8 hostels accommodating thousands); vibrant community spaces with mess, canteens, and recreational facilities. ";
    const image2 = document.getElementById("image2");
    image2.src = "/images/bh2.png";
    image2.style.width = "380px";
    image2.style.height = "214px";
    const content2 = document.getElementById("content2");
    content2.textContent =
      "\r\nClimatic Approaches (Past/Original Design): Modernist design with exposed brick/concrete for thermal mass, sun-filled balconies and light wells for natural ventilation and daylight, orientation to maximize cross-breeze in hot-dry climate.  ";
    const image3 = document.getElementById("image3");
    image3.src = "/images/bh3.png";
    image3.style.width = "380px";
    image3.style.height = "268px";
    const content3 = document.getElementById("content3");
    content3.textContent =
      "Figure 2 and 3: Use of balconies in the design for sun shadingPresent\r\nClimatic Approaches: Largely original passive features; supplemented by fans, limited AC in newer sections, and ongoing maintenance.\r\nFuture Retrofit Strategies: green roofs for insulation and reduced heat gain in summers, and solar panels on flat roofs to generate renewable energy, lowering electricity demands while respecting heritage modernist style.";
    const content4 = document.getElementById("content4");
    content4.textContent = "Figure 4: Flat roof used as green roof";
    const image4 = document.getElementById("image4");
    image4.src = "/images/bh4.png";
    image4.style.width = "380px";
    image4.style.height = "246px";
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
/*let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        console.log('Scrolling Down');
    } else if (currentScrollY < lastScrollY) {
        console.log('Scrolling Up');
    }

    lastScrollY = currentScrollY; // Update the position for the next event
});
*/
