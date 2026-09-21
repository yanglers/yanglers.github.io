(() => {
  const places = {
    nj: { lat: 40.43, lon: -74.42, title: 'East Brunswick, New Jersey', anchor: 'new-jersey' },
    stanford: { lat: 37.43, lon: -122.17, title: 'Stanford, California', anchor: 'stanford' },
    boston: { lat: 42.36, lon: -71.06, title: 'Cambridge & Boston', anchor: 'boston' }
  };
  let focusGlobe = () => {};
  let selected = null;
  let explorer = null;
  let languageNotes = null;
  let exploring = false;
  let pointer = null;
  const dragSurface = document.getElementById('globe-control');
  const controls = document.querySelectorAll('[data-place]');
  // The location controls remain usable when WebGL or a CDN is unavailable.
  if (!window.THREE) return;
  const canvas = document.getElementById('globe-bg');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
  catch (_) { return; }
  document.body.classList.add('globe-ready');
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  let zoom = 1;
  const zoomOut = document.getElementById('zoom-out');
  const zoomIn = document.getElementById('zoom-in');
  document.getElementById('globe-zoom').hidden = false;
  function setZoom(value) {
    zoom = Math.max(0.6, Math.min(2.5, value));
    document.getElementById('zoom-level').value = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= 0.6;
    zoomIn.disabled = zoom >= 2.5;
    resize();
  }
  zoomOut.addEventListener('click', () => setZoom(zoom - 0.2));
  zoomIn.addEventListener('click', () => setZoom(zoom + 0.2));
  document.getElementById('zoom-reset').addEventListener('click', () => setZoom(1));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 2.8;
  const globe = new THREE.Group();
  scene.add(globe);
  const radius = 0.7;
  function point(lat, lon, r = radius) {
    const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180;
    return new THREE.Vector3(r * Math.cos(phi) * Math.cos(theta), r * Math.sin(phi), -r * Math.cos(phi) * Math.sin(theta));
  }
  globe.position.y = -0.2;
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x0076ff, transparent: true, opacity: 0.06 });
  globe.add(new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(radius, 32, 32)), gridMaterial
  ));
  function line(points, material) {
    globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
  }
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.007, 16, 12), new THREE.MeshBasicMaterial({ color: 0x0076ff }));
  globe.add(marker);
  const target = new THREE.Quaternion();
  marker.visible = false;
  const spin = new THREE.Quaternion();
  const northAxis = new THREE.Vector3(0, 1, 0);
  const greetings = ['你好', 'مرحبا', 'Привет', 'こんにちは', '안녕하세요', 'Bonjour', 'Hola', 'مرحبا', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'Olá', 'Γεια', 'שלום', 'สวัสดี', 'Xin chào', 'Merhaba', 'Hallå', 'Ciao', 'Hallo', 'नमस्ते', 'Sawubona', 'Bore da', 'Kaixo', 'Kia ora', 'Halló', 'Hello', 'Demat', 'Bos días', 'Bonġu', 'Bon dia', 'Dia duit', 'Habari'];
  const orbit = new THREE.Group();
  orbit.rotation.x = 0.3;
  orbit.position.y = -0.5;
  scene.add(orbit);
  const words = greetings.map((text, index) => {
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 256;
    textureCanvas.height = 64;
    const context = textureCanvas.getContext('2d');
    context.font = '28px IBM Plex Mono, monospace';
    context.fillStyle = 'rgba(0, 118, 255, 0.7)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 128, 32);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(textureCanvas), transparent: true
    }));
    sprite.scale.set(0.52, 0.13, 1);
    orbit.add(sprite);
    return { text, sprite, angle: index * Math.PI * 2 / greetings.length, height: (Math.random() - 0.5) * 1.2 + 0.4, radius: 1.05 + Math.random() * 0.3, speed: 0.018 + Math.random() * 0.024 };
  });
  function arrangeWords(delta) {
    words.forEach(word => {
      word.angle += delta * word.speed;
      word.sprite.position.set(Math.cos(word.angle) * word.radius, word.height, Math.sin(word.angle) * word.radius);
      word.sprite.material.opacity = 0.75 * (Math.sin(word.angle) + 1) / 2;
    });
  }
  arrangeWords(0);
  let previousPlace = null;
  let route = null;
  let routeAge = 0;
  function clearRoute() {
    if (!route) return;
    globe.remove(route);
    route.geometry.dispose();
    route.material.dispose();
    route = null;
  }
  function traceRoute(from, to) {
    clearRoute();
    if (window.siteMotion.paused) return;
    const start = point(from.lat, from.lon).normalize();
    const end = point(to.lat, to.lon).normalize();
    const angle = Math.acos(THREE.MathUtils.clamp(start.dot(end), -1, 1));
    if (angle < 0.00001) return;
    const points = Array.from({ length: 97 }, (_, i) => {
      const t = i / 96;
      return start.clone().multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle))
        .addScaledVector(end, Math.sin(t * angle) / Math.sin(angle))
        .multiplyScalar(radius + 0.004);
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setDrawRange(0, 0);
    route = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x0076ff, transparent: true, opacity: 0.55 }));
    globe.add(route);
    routeAge = 0;
  }
  focusGlobe = place => {
    exploring = false;
    if (previousPlace && previousPlace !== place) traceRoute(previousPlace, place);
    previousPlace = place;
    marker.visible = true;
    const position = point(place.lat, place.lon, radius * 1.018);
    marker.position.copy(position);
    // Center the chosen longitude and latitude, keeping local north upright.
    const north = new THREE.Vector3(0, 1, 0);
    const forward = position.clone().normalize();
    const right = new THREE.Vector3().crossVectors(north, forward).normalize();
    const up = new THREE.Vector3().crossVectors(forward, right).normalize();
    target.setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, forward)).invert();
    if (window.siteMotion.paused) globe.quaternion.copy(target);
    window.siteMotion.redraw();
  };
  function resize() {
    const width = window.innerWidth, height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = 2.8;
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
    // Match the drag surface to the globe's projected silhouette.
    const scale = zoom * height / (2 * Math.tan(camera.fov * Math.PI / 360));
    const size = 2 * radius * scale / camera.position.z;
    dragSurface.style.width = `${size}px`;
    dragSurface.style.height = `${size}px`;
    dragSurface.style.left = `${width / 2 - size / 2}px`;
    dragSurface.style.top = `${height / 2 - globe.position.y * scale / camera.position.z - size / 2}px`;
    if (explorer) explorer.layout();
    window.siteMotion.redraw();
  }
  const borderMaterials = [];
  const countryOutlines = new Map();
  const placeInfo = {
    nj:{name:'New Jersey',fact:'',caption:'',source:'https://dep.nj.gov/parksandforests/state-park/barnegat-lighthouse/',boundary:'https://www.geoboundaries.org/countryDownloads.html'},
    stanford:{name:'Stanford',fact:'',caption:'',source:'https://visit.stanford.edu/explore-campus',boundary:'https://tigerweb.geo.census.gov/'},
    boston:{name:'Boston & Cambridge',fact:'',caption:'',source:'https://www.mass.gov/locations/charles-river-reservation',boundary:'https://tigerweb.geo.census.gov/'}
  };
  function drawPlaceMap(features) {
    const svg=document.getElementById('place-map');svg.replaceChildren();
    const rings=features.flatMap(f=>f.geometry.type==='Polygon'?f.geometry.coordinates:f.geometry.coordinates.flat());
    if(!rings.length)return;
    const points=rings.flat(),cos=Math.cos((places[selected]?.lat||40)*Math.PI/180);
    const xs=points.map(p=>p[0]*cos),ys=points.map(p=>-p[1]);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    const scale=Math.min(240/(maxX-minX),105/(maxY-minY));
    for(const ring of rings) {
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',ring.map(([lon,lat],i)=>`${i?'L':'M'}${130+(lon*cos-(minX+maxX)/2)*scale},${62.5+(-lat-(minY+maxY)/2)*scale}`).join(' ')+'Z');
      path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.2');svg.append(path);
    }
  }
  const highlightPlace=window.createRegionalHighlights({globe,point:(lat,lon)=>point(lat,lon,radius*1.012),redraw:()=>window.siteMotion.redraw(),statusId:'place-map-status',onGeometry:drawPlaceMap});
  let highlightedCountries = [];
  let secondCountries = [];
  const nativeMaterial=new THREE.LineBasicMaterial({color:0x0076ff,transparent:true,opacity:.9});
  const secondMaterial=new THREE.LineBasicMaterial({color:0x0076ff,transparent:true,opacity:.9});
  function paintCountries() {
    countryOutlines.forEach((outline,id)=>{
      const native=highlightedCountries.includes(id),second=secondCountries.includes(id);
      outline.visible=native||second;
      outline.children.forEach(line=>{if(line.isLine)line.material=native?nativeMaterial:secondMaterial;});
    });
  }
  const highlightRegions = window.createRegionalHighlights({globe,point:(lat,lon)=>point(lat,lon,radius*1.01),redraw:()=>window.siteMotion.redraw()});
  function highlightCountries(note) {
    const ids = note ? (window.languageRegions[note.lang]?.countries ?? note.countries) : [];
    highlightRegions(note);
    highlightedCountries = ids;
    secondCountries=note?(window.languageRegions[note.lang]?.secondCountries||[]):[];
    paintCountries();
    window.siteMotion.redraw();
  }
  function theme() {
    const accent = 0x0076ff;
    gridMaterial.color.set(accent);
    marker.material.color.set(accent);
    borderMaterials.forEach(material => material.color.set(accent));
    window.siteMotion.redraw();
  }
  explorer = window.createAtlasExplorer({globe,camera,radius,surface:dragSurface,render:()=>window.siteMotion.redraw(),resize});
  languageNotes = window.createLanguageNotes({words,camera,visible:()=>!explorer.flat(),enabled:()=>true,highlight:highlightCountries,onSelect:()=>{
    if (!selected && history.state?.globeOnly) return;
    history.pushState({globeOnly:true}, '', window.location.pathname + window.location.search);
    showView();
  }});
  window.siteMotion.add(delta => {
    if (route) {
      if (window.siteMotion.paused) clearRoute();
      else {
        routeAge += delta;
        route.geometry.setDrawRange(0, Math.min(97, Math.floor(routeAge / 1.2 * 97)));
        route.material.opacity = 0.55 * Math.max(0, 1 - Math.max(0, routeAge - 2) / 2);
        if (routeAge >= 4) clearRoute();
      }
    }
    if (delta) {
      // Holding the globe pauses only its rotation; the greeting orbit is independent.
      if (!pointer && !explorer.flat() && !explorer.measuring) {
        if (selected && !exploring) {
          globe.quaternion.slerp(target, 1 - Math.exp(-delta * 3));
          if (globe.quaternion.angleTo(target) < 0.002) {
            globe.quaternion.copy(target);
            exploring = true;
          }
        } else {
          spin.setFromAxisAngle(northAxis, delta * 0.12);
          globe.quaternion.premultiply(spin);
        }
      }
      arrangeWords(delta);
    }
    scene.updateMatrixWorld(true);
    languageNotes.update();
    renderer.render(scene, camera);
    if (explorer) explorer.draw();
  });
  globe.rotation.x = 0.3;
  resize();
  theme();
  window.addEventListener('resize', resize);
  new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const horizontal = new THREE.Quaternion();
  const vertical = new THREE.Quaternion();
  const eastAxis = new THREE.Vector3(1, 0, 0);
  function rotateBy(dx, dy) {
    exploring = true;
    clearRoute();
    horizontal.setFromAxisAngle(northAxis, dx);
    vertical.setFromAxisAngle(eastAxis, dy);
    globe.quaternion.premultiply(horizontal).premultiply(vertical).normalize();
    window.siteMotion.redraw();
  }
  function stopDrag() {
    if (!pointer) return;
    const id = pointer.id;
    pointer = null;
    dragSurface.classList.remove('dragging');
    if (dragSurface.hasPointerCapture(id)) dragSurface.releasePointerCapture(id);
  }
  // Handle the globe and floating greetings, without capturing page or card scrolling.
  document.addEventListener('wheel', event => {
    if (explorer.flat() || event.ctrlKey || event.metaKey || !event.deltaY) return;
    if (!event.target.closest('#globe-control, .greeting-link')) return;
    const bounds = dragSurface.getBoundingClientRect();
    const nx = (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
    const ny = (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
    if (nx * nx + ny * ny > 1) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
    const delta = Math.max(-120, Math.min(120, event.deltaY * unit));
    setZoom(zoom * Math.exp(-delta * 0.0015));
  }, { passive: false });
  dragSurface.addEventListener('pointerdown', event => {
    if (pointer || !event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    dragSurface.focus({ preventScroll: true });
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    exploring = true;
    dragSurface.setPointerCapture(event.pointerId);
    dragSurface.classList.add('dragging');
  });
  dragSurface.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const sensitivity = Math.PI / Math.max(dragSurface.clientWidth, 180);
    if (!explorer.flat() && !explorer.measuring) rotateBy((event.clientX - pointer.x) * sensitivity, (event.clientY - pointer.y) * sensitivity);
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => dragSurface.addEventListener(type, stopDrag));
  window.addEventListener('blur', stopDrag);
  dragSurface.addEventListener('keydown', event => {
    if (!explorer.flat() && ['+', '=', '-', '0'].includes(event.key)) {
      event.preventDefault();
      setZoom(event.key === '0' ? 1 : zoom + (event.key === '-' ? -0.2 : 0.2));
      return;
    }
    const movement = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12] }[event.key];
    if (!movement || explorer.flat()) return;
    event.preventDefault();
    rotateBy(...movement);
  });
  document.getElementById('reset-globe').addEventListener('click', () => {
    if (!selected) return;
    explorer.toGlobe();
    stopDrag();
    clearRoute();
    focusGlobe(places[selected]);
  });
  function showView() {
    stopDrag();
    languageNotes.close();
    const key = window.location.hash.slice(1);
    selected = places[key] ? key : null;
    document.getElementById('place-card').hidden=!selected;
    document.getElementById('place-map').replaceChildren();
    if(selected) {
      const info=placeInfo[selected];
      document.getElementById('place-card-title').textContent=info.name;
      document.getElementById('place-card-fact').textContent=info.fact;
      document.getElementById('place-card-fact').hidden=!info.fact;
      document.getElementById('place-boundary-caption').textContent=info.caption;
      document.getElementById('place-boundary-caption').hidden=!info.caption;
      for(const [key,id] of Object.entries({stanford:'stanford-quad',nj:'nj-landmark',boston:'boston-landmark'}))document.getElementById(id).toggleAttribute('hidden',selected!==key);
    }
    highlightPlace(selected?{lang:'place-'+selected}:null);
    const globeOnly = Boolean(selected || history.state?.globeOnly);
    document.getElementById('introduction').hidden = globeOnly;
    document.getElementById('location-view').hidden = !globeOnly;
    document.querySelector('#location-view > div').hidden = !selected;
    document.getElementById('reset-globe').hidden = !selected;
    document.getElementById('location-view').setAttribute('aria-label', selected ? 'Selected location' : 'Globe exploration');
    document.body.classList.toggle('location-active', globeOnly);
    dragSurface.hidden = false;
    controls.forEach(link => {
      if (link.dataset.place === selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (selected) {
      const place = places[selected];
      document.getElementById('place-title').textContent = place.title;
      document.getElementById('place-coordinates').textContent = `${place.lat.toFixed(2)}° N / ${Math.abs(place.lon).toFixed(2)}° W`;
      focusGlobe(place);
    } else {
      marker.visible = false;
      clearRoute();
      previousPlace = null;
      explorer.reset();
      window.siteMotion.redraw();
    }
  }
  controls.forEach(link => {
    link.href = `#${link.dataset.place}`;
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      history.pushState(null, '', link.href);
      showView();
      window.scrollTo(0, 0);
    });
  });
  document.getElementById('back-introduction').addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState(null, '', window.location.pathname);
    showView();
    controls[0].focus();
    window.scrollTo(0, 0);
  });
  window.addEventListener('popstate', showView);
  window.addEventListener('hashchange', showView);
  showView();
  if (window.topojson) {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
      .then(response => { if (!response.ok) throw new Error('Map unavailable'); return response.json(); })
      .then(world => {
        const borders = topojson.mesh(world, world.objects.countries);
        // Keep the original wire globe; selected countries get brighter outlines.
        const countries = topojson.feature(world, world.objects.countries).features;
        countries.forEach(country => {
          const group = new THREE.Group();
          const polygons = country.geometry.type === 'Polygon' ? [country.geometry.coordinates] : country.geometry.coordinates;
          polygons.forEach(polygon => polygon.forEach(ring => {
            const geometry = new THREE.BufferGeometry().setFromPoints(ring.map(([lon,lat]) => point(lat,lon,radius*1.008)));
            const outline=new THREE.Line(geometry,nativeMaterial);
            outline.computeLineDistances();group.add(outline);
          }));
          group.visible = false;
          globe.add(group);
          countryOutlines.set(Number(country.id),group);
        });
        // Tuvalu is below this basemap's polygon resolution. Mark its location.
        if(!countryOutlines.has(798)) {
          const group=new THREE.Group();
          const dot=new THREE.Mesh(new THREE.SphereGeometry(.003,8,6),new THREE.MeshBasicMaterial({color:0x0076ff}));
          dot.position.copy(point(-8.52,179.2,radius*1.01));group.add(dot);group.visible=false;globe.add(group);countryOutlines.set(798,group);
        }
        paintCountries();
        explorer.setBorders(borders.coordinates);
        const material = new THREE.LineBasicMaterial({ color: 0x0076ff, transparent: true, opacity: 0.16 });
        borderMaterials.push(material);
        theme();
        borders.coordinates.forEach(coords => line(coords.map(([lon, lat]) => point(lat, lon, radius * 1.003)), material));
        window.siteMotion.redraw();
      }).catch(() => { /* Latitude/longitude grid is the offline fallback. */ });
  }
})();
