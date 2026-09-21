/* Administrative examples, not a map of every speaker or of linguistic boundaries.
 * geoBoundaries gbOpen (CC BY; individual source licences linked in the note).
 * French Basque intermunicipal boundary: French government's API Découpage administratif.
 */
window.languageRegions = {
  'place-nj':{countries:[],areas:[['USA','New Jersey']]},
  'place-stanford':{countries:[],areas:[['US-STANFORD']]},
  'place-boston':{countries:[],areas:[['US-BOSTON']]},
  eu:{countries:[],areas:[['ESP','País Vasco/Euskadi','País Vasco','Basque Country','Euskadi'],['FR-BASQUE']],label:'Basque Autonomous Community · French Basque Country',source:'https://www.eke.eus/en/kultura/basque-country'},
  cy:{countries:[],areas:[['GBR','Wales']],label:'Wales'},
  pa:{countries:[],areas:[['IND','Punjab']],label:'Punjab, India'},
  zu:{countries:[],areas:[['ZAF','KwaZulu-Natal']],label:'KwaZulu-Natal, South Africa'},
  hi:{countries:[],areas:[['IND','Uttar Pradesh'],['IND','Madhya Pradesh'],['IND','Bihar']],label:'Uttar Pradesh · Madhya Pradesh · Bihar'},
  fr:{countries:[250],areas:[['CAN','Quebec','Québec']],label:'France · Québec'},
  it:{countries:[380],areas:[['CHE','Ticino']],label:'Italy · Ticino'},
  de:{countries:[276,40],areas:[['CHE','Zürich','Zurich']],label:'Germany · Austria · Zürich'},
  sv:{countries:[752],areas:[['FIN','Åland Islands','Åland','Aland','Ahvenanmaa']],label:'Sweden · Åland'}
};
window.createRegionalHighlights = ({globe,point,redraw,statusId='language-map-status',onGeometry=()=>{}}) => {
  const cache = new Map(), groups = new Map();
  let selected = null;
  const normal = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ (province|municipality)$/,'');
  async function load(iso) {
    if(!cache.has(iso)) {
      let url=iso==='FR-BASQUE'
        ? 'https://geo.api.gouv.fr/epcis/200067106?geometry=contour&format=geojson'
        : `https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/${iso}/ADM1/geoBoundaries-${iso}-ADM1_simplified.geojson`;
      if(iso.startsWith('US-')) {
        const layer=iso==='US-STANFORD'?5:4;
        const where=iso==='US-STANFORD'?"STATE='06' AND BASENAME='Stanford'":"STATE='25' AND BASENAME IN ('Boston','Cambridge')";
        url=`https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/${layer}/query?`+new URLSearchParams({where,outFields:'NAME',returnGeometry:'true',outSR:'4326',maxAllowableOffset:'0.0005',f:'geojson'});
      }
      cache.set(iso,fetch(url).then(r=>{if(!r.ok)throw Error('Regional map unavailable');return r.json();}).catch(error=>{cache.delete(iso);throw error;}));
    }
    return cache.get(iso);
  }
  async function makeArea(area) {
    const key=JSON.stringify(area);
    if(groups.has(key))return groups.get(key);
    const data=await load(area[0]);
    const features=data.type==='FeatureCollection'?data.features:[data];
    const wanted=area.slice(1).map(normal);
    const matches=features.filter(f=>(area[0]==='FR-BASQUE'||area[0].startsWith('US-'))||wanted.includes(normal(f.properties.shapeName||f.properties.nom||'')));
    if(!matches.length)throw Error('Regional boundary not found: '+area.join(' / '));
    // Concurrent requests for the same area share one render group.
    if(groups.has(key))return groups.get(key);
    const group=new THREE.Group();group.visible=false;
    for(const f of matches) {
      const polygons=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
      for(const polygon of polygons)for(const ring of polygon) {
        const geometry=new THREE.BufferGeometry().setFromPoints(ring.map(([lon,lat])=>point(lat,lon)));
        group.add(new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0x0076ff,transparent:true,opacity:.95})));
      }
    }
    group.userData.features=matches;globe.add(group);groups.set(key,group);return group;
  }
  return async note => {
    selected=note;
    groups.forEach(group=>{group.visible=false;});
    const config=note&&window.languageRegions[note.lang];
    const status=document.getElementById(statusId);
    if(!config){status.textContent='';redraw();return;}
    status.textContent='Loading regional outlines…';
    const results=await Promise.allSettled(config.areas.map(makeArea));
    if(selected!==note)return;
    results.forEach(result=>{if(result.status==='fulfilled')result.value.visible=true;else console.warn(result.reason.message);});
    onGeometry(results.flatMap(result=>result.status==='fulfilled'?result.value.userData.features:[]));
    status.textContent=results.some(result=>result.status==='rejected')?'Some regional outlines are unavailable.':'';
    redraw();
  };
};
