/* A small, source-linked selection; regional examples do not delimit a language. */
window.greetingNotes = [
  {word:'你好',language:'Mandarin Chinese',lang:'zh',script:'Chinese characters',reading:'nǐ hǎo · Pinyin',meaning:'Hello',note:'Literally “you” + “good”.',region:'🇨🇳 China · 🇹🇼 Taiwan',source:'https://en.wiktionary.org/wiki/你好#Chinese'},
  {word:'Bonjour',language:'French',lang:'fr',script:'Latin',reading:'/bɔ̃.ʒuʁ/ · IPA',meaning:'Hello; good day',note:'A daytime greeting.',region:'🇫🇷 France · 🇨🇦 Canada',source:'https://en.wiktionary.org/wiki/bonjour#French'},
  {word:'Hola',language:'Spanish',lang:'es',script:'Latin',reading:'/ˈola/ · IPA',meaning:'Hello',note:'The initial h is silent.',region:'🇪🇸 Spain · 🇲🇽 Mexico',source:'https://en.wiktionary.org/wiki/hola#Spanish'},
  {word:'こんにちは',language:'Japanese',lang:'ja',script:'Hiragana',reading:'konnichiwa · Romanization',meaning:'Hello; good afternoon',note:'The final は is pronounced wa in this greeting.',region:'🇯🇵 Japan',source:'https://en.wiktionary.org/wiki/こんにちは#Japanese'},
  {word:'Bore da',language:'Welsh',lang:'cy',script:'Latin',reading:'/ˌbɔrɛ ˈdaː/ · IPA, North Wales',meaning:'Good morning',note:'A morning greeting; pronunciation varies by region.',region:'🏴\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F} Wales, United Kingdom',source:'https://en.wiktionary.org/wiki/bore_da#Welsh'},
  {word:'Kaixo',language:'Basque',lang:'eu',script:'Latin',reading:'/kaj.ʃo/ · IPA',meaning:'Hello',note:'The x represents a sound similar to English sh.',region:'🇪🇸 Spain · 🇫🇷 France — Basque Country',source:'https://es.wiktionary.org/wiki/kaixo'},
  {word:'Kia ora',language:'Māori',lang:'mi',script:'Latin',reading:'/kiˈao.ra/ · IPA',meaning:'Hello; thank you; best wishes',note:'Literally “be well”; its meaning depends on context.',region:'🇳🇿 Aotearoa New Zealand',source:'https://en.wiktionary.org/wiki/kia_ora#Māori'},
  {word:'Halló',language:'Icelandic',lang:'is',script:'Latin',reading:'[ˈhal(ː)ou] · IPA',meaning:'Hello',note:'Used in person and when answering the telephone.',region:'🇮🇸 Iceland',source:'https://en.wiktionary.org/wiki/halló#Icelandic'},
  {"word": "مرحبا", "language": "Arabic", "lang": "ar", "script": "Arabic", "reading": "marḥaban · Romanization", "meaning": "Hello; welcome", "note": "A greeting used across Arabic-speaking communities.", "region": "🇲🇦 Morocco · 🇪🇬 Egypt · 🇸🇦 Saudi Arabia", "source": "https://en.wiktionary.org/wiki/مرحبا#Arabic", "countries": [400, 422]},
  {"word": "Привет", "language": "Russian", "lang": "ru", "script": "Cyrillic", "reading": "privet · Romanization", "meaning": "Hi; hello", "note": "An informal greeting.", "region": "🇷🇺 Russia", "source": "https://en.wiktionary.org/wiki/привет#Russian", "countries": [643]},
  {"word": "안녕하세요", "language": "Korean", "lang": "ko", "script": "Hangul", "reading": "annyeonghaseyo · Romanization", "meaning": "Hello", "note": "A polite greeting.", "region": "🇰🇷 South Korea", "source": "https://en.wiktionary.org/wiki/안녕하세요#Korean", "countries": [410]},
  {"word": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", "language": "Punjabi", "lang": "pa", "script": "Gurmukhi", "reading": "sat srī akāl · Romanization", "meaning": "A Sikh greeting", "note": "A salutation in the Sikh tradition.", "region": "🇮🇳 India — Punjab", "source": "https://library.gurmat.info/download/gurushabad-ratnaker-mahan-kosh-encyclopaedia-of-the-sikh-literature-volume-1.pdf", "countries": [356]},
  {"word": "Olá", "language": "Portuguese", "lang": "pt", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello", "note": "Used as a greeting.", "region": "🇵🇹 Portugal · 🇧🇷 Brazil", "source": "https://en.wiktionary.org/wiki/olá#Portuguese", "countries": [620, 76]},
  {"word": "Γεια", "language": "Greek", "lang": "el", "script": "Greek", "reading": "/ˈʝa/ · IPA", "meaning": "Hello; goodbye", "note": "Related to the word for health.", "region": "🇬🇷 Greece · 🇨🇾 Cyprus", "source": "https://en.wiktionary.org/wiki/γεια#Greek", "countries": [300, 196]},
  {"word": "שלום", "language": "Hebrew", "lang": "he", "script": "Hebrew", "reading": "shalom · Romanization", "meaning": "Peace; hello; goodbye", "note": "Used on meeting and parting.", "region": "🇮🇱 Israel", "source": "https://en.wiktionary.org/wiki/שלום#Hebrew", "countries": [376]},
  {"word": "สวัสดี", "language": "Thai", "lang": "th", "script": "Thai", "reading": "sawatdi · Romanization", "meaning": "Hello; goodbye", "note": "A greeting used on meeting or parting.", "region": "🇹🇭 Thailand", "source": "https://en.wiktionary.org/wiki/สวัสดี#Thai", "countries": [764]},
  {"word": "Xin chào", "language": "Vietnamese", "lang": "vi", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello", "note": "Vietnamese spelling marks tones with diacritics.", "region": "🇻🇳 Vietnam", "source": "https://en.wiktionary.org/wiki/xin_chào#Vietnamese", "countries": [704]},
  {"word": "Merhaba", "language": "Turkish", "lang": "tr", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello", "note": "Borrowed from Arabic.", "region": "🇹🇷 Türkiye", "source": "https://en.wiktionary.org/wiki/merhaba#Turkish", "countries": [792]},
  {"word": "Hallå", "language": "Swedish", "lang": "sv", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello", "note": "Also used to attract attention.", "region": "🇸🇪 Sweden · 🇫🇮 Finland", "source": "https://en.wiktionary.org/wiki/hallå#Swedish", "countries": [752, 246]},
  {"word": "Ciao", "language": "Italian", "lang": "it", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello; goodbye", "note": "An informal greeting on meeting or parting.", "region": "🇮🇹 Italy · 🇨🇭 Switzerland", "source": "https://en.wiktionary.org/wiki/ciao#Italian", "countries": [380, 756]},
  {"word": "Hallo", "language": "German", "lang": "de", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello", "note": "Used as a greeting.", "region": "🇩🇪 Germany · 🇦🇹 Austria · 🇨🇭 Switzerland", "source": "https://en.wiktionary.org/wiki/hallo#German", "countries": [276, 40, 756]},
  {"word": "नमस्ते", "language": "Hindi", "lang": "hi", "script": "Devanagari", "reading": "namaste · Romanization", "meaning": "Hello; greetings", "note": "From a Sanskrit salutation.", "region": "🇮🇳 India", "source": "https://en.wiktionary.org/wiki/नमस्ते#Hindi", "countries": [356]},
  {"word": "Sawubona", "language": "Zulu", "lang": "zu", "script": "Latin", "reading": "See linked language guide", "meaning": "Hello", "note": "A greeting to one person.", "region": "🇿🇦 South Africa", "source": "https://files.peacecorps.gov/multimedia/audio/languagelessons/southafrica/ZA_isiZulu_Language_Lessons.pdf", "countries": [710]},
  {"word": "Hello", "language": "English", "lang": "en", "script": "Latin", "reading": "/həˈləʊ/ · IPA, British English", "meaning": "Hello", "region": "🇬🇧 Britain · 🇺🇸 United States · worldwide", "source": "https://en.wiktionary.org/wiki/hello#English", "countries": []},
  {"word": "Demat", "language": "Breton", "lang": "br", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello; good day", "region": "🇫🇷 Brittany", "source": "https://en.wiktionary.org/wiki/demat#Breton", "countries": []},
  {"word": "Bos días", "language": "Galician", "lang": "gl", "script": "Latin", "reading": "See linked language guide", "meaning": "Good morning", "region": "🇪🇸 Galicia", "source": "https://emigracion.xunta.gal/files/nivel_inicial_i.pdf", "countries": []},
  {"word": "Bonġu", "language": "Maltese", "lang": "mt", "script": "Latin", "reading": "/ˈbɔn.d͡ʒu/ · IPA", "meaning": "Good morning", "region": "🇲🇹 Malta", "source": "https://en.wiktionary.org/wiki/bonġu#Maltese", "countries": []},
  {"word": "Bon dia", "language": "Catalan", "lang": "ca", "script": "Latin", "reading": "See linked dictionary", "meaning": "Good morning; good day", "region": "🇪🇸 Catalan-speaking regions · 🇦🇩 Andorra", "source": "https://en.wiktionary.org/wiki/bon_dia#Catalan", "countries": []},
  {"word": "Dia duit", "language": "Irish", "lang": "ga", "script": "Latin", "reading": "See linked dictionary", "meaning": "Hello", "region": "🇮🇪 Ireland", "source": "https://www.teanglann.ie/en/fgb/Dia_duit", "countries": []},
  {"word": "Habari", "language": "Swahili", "lang": "sw", "script": "Latin", "reading": "See linked dictionary", "meaning": "How are you?; news", "region": "🇹🇿 Tanzania · 🇰🇪 Kenya · East Africa", "source": "https://en.wiktionary.org/wiki/habari#Swahili", "countries": []}
];
const greetingCountries = {zh:[156,158],fr:[250,124],es:[724,484],ja:[392],cy:[826],eu:[724,250],mi:[554],is:[352]};
window.greetingNotes.forEach(note => {note.countries ||= greetingCountries[note.lang];});
window.createLanguageNotes = ({words,camera,visible,enabled,highlight=()=>{},onSelect=()=>{}}) => {
  const layer=document.getElementById('greeting-links');
  const panel=document.getElementById('language-note');
  const selector=document.getElementById('language-select');
  let lastFocus=null, selectedNote=null;
  window.greetingNotes.forEach((note,i)=>{const option=document.createElement('option');option.value=i;option.textContent=`${note.language} — ${note.word}`;selector.append(option);});
  function open(note,launcher) {
    onSelect(note);
    lastFocus=launcher; selectedNote=note; highlight(note);
    document.getElementById('language-word').textContent=note.word;
    document.getElementById('language-word').lang=note.lang;
    document.getElementById('language-word').dir='auto';
    for(const key of ['language','script','reading','meaning','region'])document.getElementById(`language-${key}`).textContent=note[key];
    document.getElementById('language-source').href=note.source;
    const region=window.languageRegions[note.lang];
    document.getElementById('language-map-areas').textContent=region?.label||note.region;
    const regionList=document.createElement('ul');regionList.className='region-list';
    for(const entry of window.languageRegionEntries(note)) {
      const item=document.createElement('li');
      const flag=document.createElement('span');flag.className='region-flag';flag.setAttribute('aria-hidden','true');flag.textContent=entry.flag;
      const name=document.createElement('span');name.textContent=entry.label;
      item.append(flag,name);regionList.append(item);
    }
    document.getElementById('language-region').replaceChildren(regionList);
    document.getElementById('language-map-caption').hidden=!region;
    document.getElementById('language-map-source').href='/language-map-sources.html';
    panel.hidden=false;
    layer.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.lang===note.lang)));
    document.getElementById('close-language').focus({preventScroll:true});
  }
  function close(restore=true) {panel.hidden=true;selectedNote=null;highlight(null);layer.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed','false'));if(restore&&lastFocus&&!lastFocus.hidden)lastFocus.focus({preventScroll:true});}
  document.getElementById('close-language').addEventListener('click',()=>close());
  document.getElementById('show-language').addEventListener('click',event=>open(window.greetingNotes[Number(selector.value)],event.currentTarget));
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();}});
  const links=words.flatMap(word=>{
    const note=window.greetingNotes.find(n=>n.word===word.text);
    if(!note)return [];
    const button=document.createElement('button');button.type='button';button.textContent=note.word;button.lang=note.lang;button.dir='auto';button.className='greeting-link';button.setAttribute('aria-label',`${note.word} — ${note.language}`);
    button.addEventListener('pointerenter',()=>{highlight(note);});button.addEventListener('pointerleave',()=>{highlight(selectedNote);});
    button.addEventListener('focus',()=>{highlight(note);});button.addEventListener('blur',()=>{highlight(selectedNote);});
    button.addEventListener('click',()=>open(note,button));layer.append(button);return [{word,button}];
  });
  function update() {
    const active=visible();layer.hidden=!active;
    if(!enabled()&&!panel.hidden)close(false);
    if(!active){words.forEach(({sprite})=>{sprite.visible=true;});return;}
    const obstacles=[...document.querySelectorAll('#introduction:not([hidden]), .site-header, body > nav, .location-navigation, #language-tools, #location-view > div, #location-view > details, #back-introduction, #reset-globe, .globe-help, #place-card, footer')].map(el=>el.getBoundingClientRect());
    links.forEach(({word,button})=>{
      word.sprite.visible=!active;
      if(!active)return;
      const v=word.sprite.getWorldPosition(new THREE.Vector3()).project(camera);
      const x=(v.x+1)*innerWidth/2,y=(1-v.y)*innerHeight/2;
      const width=Math.max(60,button.offsetWidth),height=Math.max(36,button.offsetHeight);
      // A broad spatial gradient eases in and out with zero slope at both ends.
      let clarity=1,overlap=false;
      for(const r of obstacles) {
        if(!r.width||!r.height)continue;
        const dx=Math.max(r.left-x-width/2,x-width/2-r.right,0);
        const dy=Math.max(r.top-y-height/2,y-height/2-r.bottom,0);
        const distance=Math.hypot(dx,dy),t=Math.min(1,distance/150);
        clarity=Math.min(clarity,.16+.84*t*t*t*(t*(t*6-15)+10));
        if(distance===0)overlap=true;
      }
      button.hidden=v.z>1||v.z< -1||x< -width/2||x>innerWidth+width/2||y< -height/2||y>innerHeight+height/2;
      button.style.left=`${x}px`;button.style.top=`${y}px`;button.style.opacity=(.18+.72*word.sprite.material.opacity)*clarity;
      button.style.setProperty('--greeting-highlight-opacity',String(clarity));
      // Faint greetings must not intercept links or text selection beneath them.
      button.style.pointerEvents=overlap?'none':'auto';
    });
  }
  return {update,close:()=>close(false)};
};
