/* Broad coverage of established communities and widespread second-language use.
 * Administrative outlines are proxies; categories can overlap within an area.
 * A single solid outline style is used throughout.
 * Sources and scope: /language-map-sources.html.
 */
(() => {
  const coverage = {
    ar:{countries:[12,48,818,368,400,414,422,434,478,504,512,275,634,682,729,760,788,784,887,732],secondCountries:[148,262,232,706,174],label:'North Africa · the Levant · the Arabian Peninsula · parts of the Sahel and Horn of Africa'},
    en:{countries:[840,124,826,372,36,554,44,52,28,212,308,659,662,670,780,388,328,84],secondCountries:[356,586,566,288,404,800,834,710,716,894,454,72,426,748,516,694,430,270,120,646,728,608,458,702,470,480,690,598,242,90,548,296,520,584,583,585,882,776,798],label:'North America · Britain and Ireland · the Caribbean · Africa · South and Southeast Asia · Oceania'},
    es:{countries:[724,484,320,340,222,558,188,591,192,214,630,170,862,218,604,68,600,152,32,858],secondCountries:[226,84],areas:[['USA','California'],['USA','Texas'],['USA','New Mexico'],['USA','Arizona'],['USA','Nevada'],['USA','Florida'],['USA','New York'],['USA','New Jersey'],['USA','Colorado'],['USA','Illinois']],label:'Spain · Hispanic America · substantial US communities · Equatorial Guinea · Belize'},
    fr:{countries:[250,492],secondCountries:[204,854,108,120,140,148,174,178,180,384,262,266,324,450,466,478,480,562,646,686,690,768,332,548,12,504,788,422],areas:[['CAN','Quebec','Québec'],['CAN','New Brunswick'],['BEL','Wallonne Gewest','Walloon Region','Wallonia','Région wallonne'],['BEL','Brussels Hoofdstedelijk','Brussels-Capital Region','Brussels','Région de Bruxelles-Capitale'],['CHE','Genève','Geneva'],['CHE','Vaud'],['CHE','Neuchâtel'],['CHE','Jura'],['CHE','Fribourg'],['CHE','Valais']],label:'France · Québec and New Brunswick · French-speaking Belgium and Switzerland · Africa · the Caribbean · Indian and Pacific oceans'},
    pt:{countries:[620,76,24,678],secondCountries:[508,624,132,626],label:'Portugal · Brazil · Angola · Mozambique · Guinea-Bissau · Cabo Verde · São Tomé and Príncipe · Timor-Leste'},
    ru:{countries:[643,112],secondCountries:[398,417],label:'Russia · Belarus · Kazakhstan · Kyrgyzstan'},
    ko:{countries:[410,408],label:'Korean Peninsula'},
    zh:{countries:[158],secondCountries:[156,702],areas:[['CHN','Beijing'],['CHN','Tianjin'],['CHN','Hebei'],['CHN','Shandong'],['CHN','Henan'],['CHN','Shanxi'],['CHN','Shaanxi'],['CHN','Gansu'],['CHN','Heilongjiang'],['CHN','Jilin'],['CHN','Liaoning'],['CHN','Sichuan'],['CHN','Chongqing'],['CHN','Yunnan'],['CHN','Guizhou']],label:'Mandarin-speaking northern and southwestern China · Taiwan · wider China and Singapore'},
    hi:{countries:[],secondCountries:[356],areas:['Uttar Pradesh','Madhya Pradesh','Bihar','Rajasthan','Haryana','Himachal Pradesh','Uttarakhand','Jharkhand','Chhattisgarh','Delhi'].map(name=>['IND',name]),label:'Hindi-speaking northern and central India · wider India as a second language'},
    pa:{countries:[],areas:[['IND','Punjab'],['PAK','Punjab']],label:'Punjab in India and Pakistan'},
    de:{countries:[276,40,438],secondCountries:[442],areas:['Zürich','Bern','Luzern','Uri','Schwyz','Obwalden','Nidwalden','Glarus','Zug','Solothurn','Basel-Stadt','Basel-Landschaft','Schaffhausen','Appenzell Ausserrhoden','Appenzell Innerrhoden','St. Gallen','Aargau','Thurgau','Graubünden'].map(name=>['CHE',name]),label:'Germany · Austria · Liechtenstein · German-speaking Switzerland · Luxembourg'},
    it:{countries:[380,674,336],areas:[['CHE','Ticino'],['CHE','Graubünden']],label:'Italy · San Marino · Vatican City · Ticino and Italian-speaking Graubünden'},
    sv:{countries:[752],areas:[['FIN','Åland Islands','Åland'],['FIN','Ostrobothnia'],['FIN','Uusimaa'],['FIN','Finland Proper']],label:'Sweden · Åland · Swedish-speaking coastal Finland'},
    eu:{countries:[],areas:[['ESP','País Vasco/Euskadi'],['ESP','Comunidad Foral de Navarra'],['FR-BASQUE']],label:'Basque Country · Navarre · French Basque Country'},
    cy:{countries:[],areas:[['GBR','Wales']],label:'Wales'},
    zu:{countries:[],areas:[['ZAF','KwaZulu-Natal'],['ZAF','Gauteng'],['ZAF','Mpumalanga']],label:'KwaZulu-Natal · Gauteng · Mpumalanga'},
    ca:{countries:[20],areas:[['ESP','Cataluña/Catalunya'],['ESP','Comunitat Valenciana'],['ESP','Illes Balears']],label:'Catalonia · Valencia · Balearic Islands · Andorra'},
    ga:{countries:[372],label:'Ireland'},
    sw:{countries:[834,404,800,646,108,180],label:'Tanzania · Kenya · Uganda · Rwanda · Burundi · Democratic Republic of the Congo'},
    br:{countries:[],areas:[['FRA','Bretagne','Brittany']],label:'Brittany, France'},
    gl:{countries:[],areas:[['ESP','Galicia']],label:'Galicia, Spain'},
    mt:{countries:[470],label:'Malta'},
    ja:{countries:[392],label:'Japan'},
    el:{countries:[300],areas:[['CYP','Lefkosia','Nicosia'],['CYP','Lemesos','Limassol'],['CYP','Larnaka','Larnaca'],['CYP','Pafos','Paphos']],label:'Greece · Greek-speaking Cyprus'},
    he:{countries:[376],label:'Israel'},
    th:{countries:[],secondCountries:[764],areas:[['THA','Bangkok Metropolis','Bangkok'],['THA','Phra Nakhon Si Ayutthaya'],['THA','Pathum Thani'],['THA','Nonthaburi']],label:'Central Thailand · wider Thailand as a second language'},
    vi:{countries:[704],label:'Vietnam'},
    tr:{countries:[792],label:'Türkiye'},
    mi:{countries:[554],label:'Aotearoa New Zealand'},
    is:{countries:[352],label:'Iceland'}
  };
  for(const [lang,config] of Object.entries(coverage)) {
    window.languageRegions[lang]={areas:[],...config,countries:[...new Set([...(config.countries||[]),...(config.secondCountries||[])])],secondCountries:[]};
  }
})();
