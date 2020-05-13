createLandscape({
  palleteImage:'img/pallete5.png'
})

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function createLandscape(params){

  var container = document.querySelector(".landscape")
  var windowContainer = document.querySelector('.hero__cover');
  var width = windowContainer.getBoundingClientRect().width;
  var height = windowContainer.getBoundingClientRect().height;

  var scene, renderer, camera;
  var terrain;

  var mouse = { x:0, y:0, xDamped:0, yDamped:0 };
  var isMobile = typeof window.orientation !== 'undefined'

  init();

  function init(){

    sceneSetup();
    sceneElements();
    sceneTextures();
    render();

    if(isMobile)
      window.addEventListener("touchmove", onInputMove, {passive:false})
    else
      window.addEventListener("mousemove", onInputMove)
    
    window.addEventListener("resize", resize)
    resize()
  }

  function sceneSetup(){
    scene = new THREE.Scene();
    var fogColor = new THREE.Color( 0x000000 )
    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 10, 400);

    
    sky()

    camera = new THREE.PerspectiveCamera(60, width / height, .1, 10000);
    camera.position.y = 8;
    camera.position.z = 4;
    
    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight)
    

    renderer = new THREE.WebGLRenderer( {
      canvas:container,
      antialias:true
    } );
    renderer.setPixelRatio = devicePixelRatio;
    renderer.setSize(width, height);
    

  }

  function sceneElements(){

    var geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 400);

    var uniforms = {
      time: { type: "f", value: 0.0 },
      distortCenter: { type: "f", value: 0.1 },
      roadWidth: { type: "f", value: 0.5 },
      pallete:{ type: "t", value: null},
      speed: { type: "f", value: 1 },
      maxHeight: { type: "f", value: 10.0 },
      color:new THREE.Color(1, 1, 1)
    }
    
    var material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([ THREE.ShaderLib.basic.uniforms, uniforms ]),
      vertexShader: document.getElementById( 'custom-vertex' ).textContent,
      fragmentShader: document.getElementById( 'custom-fragment' ).textContent,
      wireframe:false,
      fog:true
    });

    terrain = new THREE.Mesh(geometry, material);
    terrain.position.z = -180;
    terrain.rotation.x = -Math.PI / 2

    scene.add(terrain)

  }

  function sceneTextures(){
    // pallete
    new THREE.TextureLoader().load( params.palleteImage, function(texture){
      terrain.material.uniforms.pallete.value = texture;
      terrain.material.needsUpdate = true;
    });
  }

  function sky(){
    sky = new THREE.Sky();
    sky.scale.setScalar( 450000 );
    sky.material.uniforms.turbidity.value = 1;
    sky.material.uniforms.rayleigh.value = 0.01;
    sky.material.uniforms.luminance.value = 1;
    sky.material.uniforms.mieCoefficient.value = 0.0003;
    sky.material.uniforms.mieDirectionalG.value = 0.99995;
    
    scene.add( sky );

    sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry( 20000, 16, 8 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    sunSphere.visible = false;
    scene.add( sunSphere );
    
    var theta = Math.PI * ( -0.03 );
    var phi = 2 * Math.PI * ( -.25 );

    sunSphere.position.x = 400000 * Math.cos( phi );
    sunSphere.position.y = 400000 * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = 400000 * Math.sin( phi ) * Math.cos( theta );
    
    sky.material.uniforms.sunPosition.value.copy( sunSphere.position );
  }

  function resize(){
    width = windowContainer.getBoundingClientRect().width;
    height = windowContainer.getBoundingClientRect().height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
  }

  function onInputMove(e){
    if(mobileAndTabletCheck() === false) {
      e.preventDefault();

      var x, y
      if(e.type == "mousemove"){
        x = e.clientX;
        y = e.clientY;
      }else{
        x = e.changedTouches[0].clientX
        y = e.changedTouches[0].clientY
      }

      mouse.x = x;
      mouse.y = y;
    }
  }

  function render(){
    requestAnimationFrame(render)

    // damping mouse for smoother interaction
    mouse.xDamped = lerp(mouse.xDamped, mouse.x, 0.1);
    mouse.yDamped = lerp(mouse.yDamped, mouse.y, 0.1);

    var time = performance.now() * 0.001
    terrain.material.uniforms.time.value = time;
    terrain.material.uniforms.distortCenter.value = Math.sin(time) * 0.1;
    terrain.material.uniforms.maxHeight.value = map(mouse.yDamped, 0, height, 20, 5);

    renderer.render(scene, camera)
  }

  function map (value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  }

  function lerp (start, end, amt){
    return (1 - amt) * start + amt * end
  }
}