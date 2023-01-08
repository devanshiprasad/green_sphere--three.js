import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { gsap } from "https://cdn.skypack.dev/gsap";
function main(){
    
    
    //scene
    const scene= new THREE.Scene();

    const geometry = new THREE.SphereGeometry(3,64,64)
    const material= new THREE.MeshStandardMaterial({
        color: "#00ff83",
    })

    //mesh
    const mesh= new THREE.Mesh(geometry,material)
    scene.add(mesh)

    //sizes
    const sizes= {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    //light 
    const light= new THREE.DirectionalLight(0xffffff,1,100)
    light.position.set(0,10,10)
    scene.add(light)


    const camera= new THREE.PerspectiveCamera(45,sizes.width/ sizes.height,0.1,100)
    camera.position.z= 20
    scene.add(camera)

    //render
    const canvas= document.querySelector('.c');
    const renderer= new THREE.WebGLRenderer({canvas});
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(2)
    renderer.render(scene, camera)

    //controls
    const controls= new OrbitControls(camera,canvas)
    controls.enableDamping=true
    controls.enablePan=false
    controls.enableZoom= false
    controls.autoRotate= true
    controls.autoRotateSpeed= 5

    //resize 
    window.addEventListener('resize',()=>{
        console.log(window.innerWidth)
        sizes.width=window.innerWidth
        sizes.height=window.innerHeight
    
    //update camera
    camera.aspect= sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    })
    const loop=()=>{
        renderer.render(scene,camera)
        controls.update()
        window.requestAnimationFrame(loop)
    }
    loop()

    //timeline
    const tl= gsap.timeline({defaults:{duration:1}})
    tl.fromTo(mesh.scale,{z:0,x:0,y:0}, {z:1,x:1,y:1})
    tl.fromTo("nav",{y:"-100%"},{y:"0%"})
    tl.fromTo("h1",{opacity:0},{opacity:1})

    //mouse animation
    let mouseDown=false
    let rgb=[];
    window.addEventListener('mousedown',()=> (mouseDown=true))
    window.addEventListener('mouseup',()=> (mouseDown=false))



}
main();

