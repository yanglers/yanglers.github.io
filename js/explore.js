/* Geographic tools, kept separate from the introductory page. */
window.createAtlasExplorer = ({ globe, camera, radius, surface, render, resize }) => {
  const panel = document.getElementById('atlas-explore');
  const selector = document.getElementById('projection');
  const measure = document.getElementById('measure-mode');
  const flatCanvas = document.getElementById('flat-map');
  const ctx = flatCanvas.getContext('2d');
  const readout = document.getElementById('coordinate-readout');
  const result = document.getElementById('measurement-result');
  const group = new THREE.Group(); globe.add(group);
  let borders = [], points = [], arc = [], box = null;
  let start = null;
  const raycaster = new THREE.Raycaster();
  const vector = p => {
    const lat = p.lat * Math.PI / 180, lon = p.lon * Math.PI / 180;
    return new THREE.Vector3(Math.cos(lat)*Math.cos(lon), Math.sin(lat), -Math.cos(lat)*Math.sin(lon));
  };
  const coordinates = v => ({ lat: Math.asin(THREE.MathUtils.clamp(v.y,-1,1))*180/Math.PI, lon: Math.atan2(-v.z,v.x)*180/Math.PI });
  const label = p => `${Math.abs(p.lat).toFixed(2)}° ${p.lat < 0 ? 'S' : 'N'}, ${Math.abs(p.lon).toFixed(2)}° ${p.lon < 0 ? 'W' : 'E'}`;
  const flat = () => selector.value === 'flat';
  function layout() {
    const w = innerWidth, h = innerHeight;
    const width = Math.min(w - 32, 1000, h * 1.15);
    box = { x: (w-width)/2, y: panel.getBoundingClientRect().bottom + scrollY + 28, w: width, h: width/2 };
    flatCanvas.width = w * Math.min(devicePixelRatio,2);
    flatCanvas.height = Math.max(h,box.y+box.h+80)*Math.min(devicePixelRatio,2);
    flatCanvas.style.height = `${Math.max(h,box.y+box.h+80)}px`;
    ctx.setTransform(Math.min(devicePixelRatio,2),0,0,Math.min(devicePixelRatio,2),0,0);
    if (flat()) {
      Object.assign(surface.style, {left:`${box.x}px`, top:`${box.y-scrollY}px`, width:`${box.w}px`, height:`${box.h}px`});
      document.getElementById('location-view').style.minHeight = `${box.y+box.h-(document.getElementById('location-view').getBoundingClientRect().top+scrollY)+24}px`;
      flatCanvas.style.top = `${-scrollY}px`;
    } else document.getElementById('location-view').style.minHeight = '';
    draw();
  }
  function position(p) { return [box.x+(p.lon+180)/360*box.w, box.y+(90-p.lat)/180*box.h]; }
  function path(coords) {
    ctx.beginPath(); let last = null;
    coords.forEach(p => { const [x,y] = position(p); if (!last || Math.abs(p.lon-last.lon)>180) ctx.moveTo(x,y); else ctx.lineTo(x,y); last=p; }); ctx.stroke();
  }
  function draw() {
    if (!box || !flat()) return;
    ctx.clearRect(0,0,flatCanvas.width,flatCanvas.height);
    const dark = document.documentElement.dataset.theme==='dark';
    ctx.strokeStyle = dark ? 'rgba(120,180,255,.22)' : 'rgba(0,103,217,.2)'; ctx.lineWidth=1;
    for(let lat=-90;lat<=90;lat+=30) path([{lat,lon:-180},{lat,lon:0},{lat,lon:180}]);
    for(let lon=-180;lon<=180;lon+=30) path([{lat:-90,lon},{lat:90,lon}]);
    ctx.strokeStyle=dark?'#78b4ff':'#0067d9'; ctx.globalAlpha=.6;
    borders.forEach(coords=>path(coords.map(([lon,lat])=>({lat,lon})))); ctx.globalAlpha=1;
    ctx.lineWidth=1.5; path(arc);
    points.forEach((p,i)=>{const [x,y]=position(p);ctx.fillStyle=dark?'#78b4ff':'#0067d9';ctx.beginPath();ctx.arc(x,y,4,0,2*Math.PI);ctx.fill();ctx.font='12px monospace';ctx.fillText(i?'B':'A',x+8,y-6);});
  }
  function hit(event) {
    if(flat()) {
      const x=event.clientX, y=event.clientY+scrollY;
      if(x<box.x||x>box.x+box.w||y<box.y||y>box.y+box.h)return null;
      return {lon:(x-box.x)/box.w*360-180,lat:90-(y-box.y)/box.h*180};
    }
    camera.updateMatrixWorld(); globe.updateWorldMatrix(true,false);
    raycaster.setFromCamera(new THREE.Vector2(event.clientX/innerWidth*2-1,1-event.clientY/innerHeight*2),camera);
    const intersection=raycaster.ray.intersectSphere(new THREE.Sphere(globe.position,radius),new THREE.Vector3());
    return intersection ? coordinates(globe.worldToLocal(intersection).normalize()) : null;
  }
  function clearGeometry() {
    while(group.children.length) {const child=group.children[0];group.remove(child);child.geometry.dispose();child.material.dispose();}
  }
  function update() {
    clearGeometry(); arc=[];
    points.forEach(p=>{const dot=new THREE.Mesh(new THREE.SphereGeometry(.009,12,8),new THREE.MeshBasicMaterial({color:0x0076ff}));dot.position.copy(vector(p).multiplyScalar(radius+.006));group.add(dot);});
    if(points.length===2) {
      const a=vector(points[0]),b=vector(points[1]);const angle=Math.acos(THREE.MathUtils.clamp(a.dot(b),-1,1));
      // Choose a stable great circle when antipodal endpoints have no unique route.
      let normal=new THREE.Vector3().crossVectors(a,b);
      if(normal.length()<1e-8)normal.crossVectors(a,Math.abs(a.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0));
      normal.normalize();
      const samples=Array.from({length:181},(_,i)=>a.clone().applyAxisAngle(normal,angle*i/180));
      arc=samples.map(coordinates);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(samples.map(v=>v.multiplyScalar(radius+.004))),new THREE.LineBasicMaterial({color:0x0076ff,transparent:true,opacity:.8})));
      result.textContent=`A: ${label(points[0])} · B: ${label(points[1])}. ${(angle*180/Math.PI).toFixed(2)}° · ${Math.round(angle*6371).toLocaleString()} km. Spherical Earth approximation (R = 6,371 km).${Math.PI-angle<1e-8?' Antipodal points: one of many shortest routes is shown.':''}`;
    } else result.textContent=points.length?`A: ${label(points[0])}. Select point B.`:'Select two points to measure their shortest route on the sphere.';
    draw(); render();
  }
  function add(p) { if(points.length===2)points=[];points.push(p);update(); }
  surface.addEventListener('pointermove',e=>{if(!panel.open)return;const p=hit(e);readout.textContent=p?label(p):'Move over the globe or map to inspect coordinates.';});
  surface.addEventListener('pointerdown',e=>{if(e.isPrimary&&e.button===0)start={x:e.clientX,y:e.clientY};});
  surface.addEventListener('pointerup',e=>{if(panel.open&&measure.checked&&start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)<6){const p=hit(e);if(p)add(p);}start=null;});
  surface.addEventListener('pointercancel',()=>{start=null;});
  document.getElementById('add-point').addEventListener('click',()=>{
    const lat=document.getElementById('point-lat'),lon=document.getElementById('point-lon');
    if(!lat.reportValidity()||!lon.reportValidity())return;
    add({lat:Number(lat.value),lon:Number(lon.value)});
  });
  document.getElementById('clear-measurement').addEventListener('click',()=>{points=[];update();});
  selector.addEventListener('change',()=>{
    document.body.classList.toggle('flat-projection',flat());flatCanvas.hidden=!flat();
    document.getElementById('projection-note').textContent=flat()?'Equirectangular: equal spacing of latitude and longitude; shapes and areas stretch toward the poles. The measured distance still follows the sphere.':'Globe: perspective view of a sphere. Drag to rotate; measurements follow its surface.';
    resize();
  });
  window.addEventListener('scroll',()=>{if(flat()&&box){flatCanvas.style.top=`${-scrollY}px`;surface.style.top=`${box.y-scrollY}px`;}});
  new ResizeObserver(resize).observe(panel);
  panel.addEventListener('toggle',()=>{group.visible=panel.open;resize();});
  update();
  return {layout,draw,flat,toGlobe(){selector.value='globe';selector.dispatchEvent(new Event('change'));}, get measuring(){return panel.open&&measure.checked;}, setBorders(value){borders=value;draw();},reset(){selector.value='globe';document.body.classList.remove('flat-projection');flatCanvas.hidden=true;panel.open=false;points=[];document.getElementById('projection-note').textContent='Globe: perspective view of a sphere. Drag to rotate; measurements follow its surface.';update();resize();}};
};
