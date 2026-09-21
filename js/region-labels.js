/* ISO 3166 country codes used by the map; flag glyphs remain paired with names. */
window.languageRegionEntries = (() => {
  const codes=Object.fromEntries(`12:DZ 48:BH 818:EG 368:IQ 400:JO 414:KW 422:LB 434:LY 478:MR 504:MA 512:OM 275:PS 634:QA 682:SA 729:SD 760:SY 788:TN 784:AE 887:YE 732:EH 148:TD 262:DJ 232:ER 706:SO 174:KM 840:US 124:CA 826:GB 372:IE 36:AU 554:NZ 44:BS 52:BB 28:AG 212:DM 308:GD 659:KN 662:LC 670:VC 780:TT 388:JM 328:GY 84:BZ 356:IN 586:PK 566:NG 288:GH 404:KE 800:UG 834:TZ 710:ZA 716:ZW 894:ZM 454:MW 72:BW 426:LS 748:SZ 516:NA 694:SL 430:LR 270:GM 120:CM 646:RW 728:SS 608:PH 458:MY 702:SG 470:MT 480:MU 690:SC 598:PG 242:FJ 90:SB 548:VU 296:KI 520:NR 584:MH 583:FM 585:PW 882:WS 776:TO 798:TV 724:ES 484:MX 320:GT 340:HN 222:SV 558:NI 188:CR 591:PA 192:CU 214:DO 630:PR 170:CO 862:VE 218:EC 604:PE 68:BO 600:PY 152:CL 32:AR 858:UY 226:GQ 250:FR 492:MC 204:BJ 854:BF 108:BI 140:CF 178:CG 180:CD 384:CI 266:GA 324:GN 450:MG 466:ML 562:NE 686:SN 768:TG 332:HT 620:PT 76:BR 24:AO 678:ST 508:MZ 624:GW 132:CV 626:TL 643:RU 112:BY 398:KZ 417:KG 410:KR 408:KP 158:TW 156:CN 276:DE 40:AT 438:LI 442:LU 380:IT 674:SM 336:VA 752:SE 20:AD 300:GR 376:IL 764:TH 704:VN 792:TR 352:IS 392:JP`.split(' ').map(pair=>pair.split(':')));
  const parents={ESP:'ES',FRA:'FR','FR-BASQUE':'FR',GBR:'GB',IND:'IN',PAK:'PK',ZAF:'ZA',CAN:'CA',CHE:'CH',FIN:'FI',USA:'US',CHN:'CN',BEL:'BE',CYP:'CY',THA:'TH'};
  const names=new Intl.DisplayNames(['en'],{type:'region'});
  const flag=code=>code?Array.from(code,c=>String.fromCodePoint(0x1F1E6+c.charCodeAt(0)-65)).join(''):'';
  const labels={'País Vasco/Euskadi':'Basque Country','Comunidad Foral de Navarra':'Navarre','Cataluña/Catalunya':'Catalonia','Comunitat Valenciana':'Valencia','Illes Balears':'Balearic Islands','Bretagne':'Brittany','Brussels Hoofdstedelijk':'Brussels','Wallonne Gewest':'Wallonia'};
  return note=>{
    const config=window.languageRegions[note.lang];
    if(!config)return [{flag:'',label:note.region}];
    const entries=config.countries.map(id=>{
      const code=codes[id];
      return {flag:flag(code),label:code?names.of(code):String(id)};
    });
    for(const [parent,area] of config.areas||[]) {
      const code=parents[parent];
      const name=labels[area]||area||'French Basque Country';
      const welsh=parent==='GBR'&&area==='Wales';
      entries.push({flag:welsh?'🏴\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}':flag(code),label:welsh?name:`${name}, ${code?names.of(code):parent}`});
    }
    return entries;
  };
})();
