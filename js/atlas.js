(() => {
  const places = {
    nj: { lat: 40.43, lon: -74.42, title: 'East Brunswick, New Jersey', caption: 'Shrub-lined suburbia and library atlases. Where my curiosity began.', anchor: 'new-jersey', link: 'A little more about home →' },
    stanford: { lat: 37.43, lon: -122.17, title: 'Stanford, California', caption: 'My first time in California was move-in day. A new coast, and a new sense of what was possible.', anchor: 'stanford', link: 'A little more about Stanford →' },
    boston: { lat: 42.36, lon: -71.06, title: 'Cambridge & Boston', caption: 'A third home: Kendall Square, the Red Line, and a pistachio latte.', anchor: 'boston', link: 'A little more about Boston →' }
  };
  let focusGlobe = () => {};
  const controls = document.querySelectorAll('[data-place]');
  controls.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      controls.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      const place = places[button.dataset.place];
      document.getElementById('place-coordinates').textContent = `${place.lat.toFixed(2)}° N / ${Math.abs(place.lon).toFixed(2)}° W`;
      document.getElementById('place-title').textContent = place.title;
      document.getElementById('place-caption').textContent = place.caption;
      const link = document.getElementById('place-link');
      link.href = `/about/#${place.anchor}`;
      link.textContent = place.link;
      focusGlobe(place);
    });
  });

  // The place stories remain usable when WebGL or a CDN is unavailable.
  if (!window.THREE) return;
  const canvas = document.getElementById('globe-bg');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
  catch (_) { return; }
  canvas.parentElement.classList.add('globe-ready');
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
  camera.position.z = 3.4;
  const globe = new THREE.Group();
  scene.add(globe);
  const radius = 0.88;
  function point(lat, lon, r = radius) {
    const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180;
    return new THREE.Vector3(r * Math.cos(phi) * Math.cos(theta), r * Math.sin(phi), -r * Math.cos(phi) * Math.sin(theta));
  }
  // An opaque sphere hides far-side lines and markers.
  const surface = new THREE.MeshBasicMaterial();
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(radius * 0.996, 48, 32), surface));
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x0076ff, transparent: true, opacity: 0.16 });
  function line(points, material) {
    globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    line(Array.from({ length: 181 }, (_, i) => point(lat, i * 2 - 180)), gridMaterial);
  }
  for (let lon = -180; lon < 180; lon += 30) {
    line(Array.from({ length: 91 }, (_, i) => point(i * 2 - 90, lon)), gridMaterial);
  }
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 12), new THREE.MeshBasicMaterial({ color: 0x0076ff }));
  globe.add(marker);
  const target = new THREE.Quaternion();
  focusGlobe = place => {
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
    const size = canvas.parentElement.clientWidth;
    renderer.setSize(size, size, false);
    window.siteMotion.redraw();
  }
  const borderMaterials = [];
  function theme() {
    const accent = document.documentElement.dataset.theme === 'dark' ? 0x78b4ff : 0x0076ff;
    gridMaterial.color.set(accent);
    marker.material.color.set(accent);
    borderMaterials.forEach(material => material.color.set(accent));
    surface.color.set(document.documentElement.dataset.theme === 'dark' ? '#151515' : '#ffffff');
    window.siteMotion.redraw();
  }
  window.siteMotion.add(delta => {
    if (window.siteMotion.paused) globe.quaternion.copy(target);
    else if (delta) globe.quaternion.slerp(target, 1 - Math.exp(-delta * 5));
    renderer.render(scene, camera);
  });
  focusGlobe(places.nj);
  globe.quaternion.copy(target);
  resize();
  theme();
  new ResizeObserver(resize).observe(canvas.parentElement);
  new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (window.topojson) {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => { if (!response.ok) throw new Error('Map unavailable'); return response.json(); })
      .then(world => {
        const borders = topojson.mesh(world, world.objects.countries);
        const material = new THREE.LineBasicMaterial({ color: 0x0076ff, transparent: true, opacity: 0.65 });
        borderMaterials.push(material);
        theme();
        borders.coordinates.forEach(coords => line(coords.map(([lon, lat]) => point(lat, lon, radius * 1.003)), material));
        window.siteMotion.redraw();
      }).catch(() => { /* Latitude/longitude grid is the offline fallback. */ });
  }
})();
