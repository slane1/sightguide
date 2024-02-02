import { log } from 'console';
import pool from '../db/data.js';
import fs from 'fs';

const fetchAllDatabase = async (req, res, next) => {
    try {
        const data = await pool.query('SELECT * FROM sights');
        // console.log(data.rows);
        res.send(data.rows);
        // res.send(JSON.parse(data.rows));
    } catch (error) {
        res.status(500).json({ message: 'something broke' });
    }
}

// const fetchSightImg = async (req, res, next) => {
//     try {
//         const data = await pool.query('SELECT * FROM sights LEFT JOIN images on sights.id = images.sightid');
//         res.send(data.rows);
//     } catch (error) {
//         res.status(500).json({ message: 'something broke' });
//     }
// }
// const fetchSightImg = async (req, res, next) => {
//     try {
//         const data = await pool.query(
//             'SELECT sights.*, images.id AS images_id, images.filename AS images_filename, images.title AS images_title, images.url AS images_url FROM sights LEFT JOIN images on sights.id = images.sightid');
//         res.send(data.rows);
//     } catch (error) {
//         res.status(500).json({ message: 'something broke' });
//     }
// }


const fetchSightImg = async (req, res, next) => {
    try { const query = `
    SELECT
        sights.id,
        sights.*,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', images.id,
            'filename', images.filename,
            'title', images.title,
            'url', images.url
        )
    ) AS images,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', location.id,
            'lon', location.lon,
            'lat', location.lat
        )
    ) AS geolocation
    FROM
        sights
    LEFT JOIN
        images ON sights.id = images.sightid
    LEFT JOIN
        location ON sights.id = location.sightid
    GROUP BY
        sights.id;`;
    const { rows } = await pool.query(query);
    res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something broke' });
    }
};




const dbQuery = async (el,time) => {
    const st = time;
    console.log("try: ", + el.fields.id,"QUARK", st);

    pool.query(`INSERT INTO
    sights (
        id,
        name,
        stadt,
        land,
        epoche,
        bauzeit,
        bauherr,
        beschreibung
    )
VALUES
    (
        ${el.fields.id},
        '${el.fields.name}',
        '${el.fields.stadt}',
        '${el.fields.land}',
        '${el.fields.epoche}',
        '${el.fields.bauzeit}',
        '${el.fields.bauherr}',
        '${el.fields.beschreibung}'
    );`);
}

let time = 0;

const pushData = async (req, res, next) => {

    theARRAYYY.map(el => {
        console.log(time);
        
        try {
            setTimeout(dbQuery, time, el, time);
            time += 500;

        } catch (error) {
            console.log('something broke');
        }
        // res.send("So much data");
    });
}


// Image pusher

const dbQueryImg = async (img, time, index, sightid) => {
    const startTime = time;
    console.log("try:",startTime,"sightid:",sightid, "index:",index, img.title);

    pool.query(`INSERT INTO
    images (
        id,
        sightid,
        filename,
        title,
        url
        )
VALUES
    (
        ${index},
        ${sightid},
        '${img.fileName}',
        '${img.title}',
        '${img.url}'
    );`);
}



const pushImage = async (req, res, next) => {
    
    let time = 0;
    let index = 0;

    theARRAYYY.map((el) => {
        console.log(time);
        time += 1000;

        try {
            el.fields.images.map((img,) => {
                 index++;
                setTimeout(dbQueryImg, time, img, time, index, el.fields.id);
              })

        } catch (error) {
            console.log('something broke');
        }
        // res.send("So much data");
    });
}

// long pusher

const dbQueryGeo = async (el, time, index) => {
    const st = time;
    console.log("try: ", + el.fields.id,"QUARK", st);

    pool.query(`INSERT INTO
    location (
        id,
        sightid,
        lat,
        lon
    )
VALUES
    (
        ${index},
        '${el.fields.id}',
        '${el.fields.geolocation.lat}',
        '${el.fields.geolocation.lon}'
    );`);
}


const pushGeo = async (req, res, next) => {

    theARRAYYY.map((el, index) => {
        console.log(time,index);
        
        try {
            setTimeout(dbQueryGeo, time, el, time, index);
            time += 500;

        } catch (error) {
            console.log('something broke');
        }
        // res.send("So much data");
    });
}

export {
    fetchAllDatabase,
    pushData,
    pushImage,
    pushGeo,
    fetchSightImg
}







// general array
const theARRAYYY = [
    {
        fields: {
            id: "3",
            name: "Pantheon",
            stadt: "Rom",
            land: "Italien",
            epoche: "Römischen Antike",
            bauzeit: "114 n. Chr. -128 n. Chr.",
            bauherr: "Kaiser Trajan/Kaiser Hadrian",
            beschreibung: "Das Pantheon ist ein zur Kirche umgeweihtes antikes Bauwerk in Rom. Das möglicherweise bereits unter Kaiser Trajan um 114 n. Chr. begonnene und unter Kaiser Hadrian zwischen 125 n. Chr. und 128 n. Chr. fertiggestellte Pantheon hatte mehr als 1700 Jahre lang, bezogen auf den Innendurchmesser, die größte Kuppel der Welt. Es gilt als eines der am besten erhaltenen Bauwerke der römischen Antike. Das Pantheon besteht aus zwei Hauptelementen: einem Pronaos mit rechteckigem Grundriss und Tempelfassade im Norden sowie einem kreisrunden, überkuppelten Zentralbau im Süden. Ein Übergangsbereich vermittelt zwischen beiden Gebäudeteilen, die sich ergebenden Zwickel der Schnittstellen wurden für Treppenhäuser genutzt.",
            images: [
                {
                    title: "Pantheon",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/6Ng64dZMXNV3x44XdgBcNE/d9dc401aaa6524996db6ce7ffcd79bdf/pantheon_d76d3947d9.jpg",
                    fileName: "pantheon_d76d3947d9.jpg"
                },
                {
                    title: "Pantheon",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/6rDkAcXvfWBM8t5UsvZEUW/ba6224cee533f1493ffc5cf9eb1c7729/Pantheon1-a9faad39f0014bdfa9fb418913bd8cc8.JPG",
                    fileName: "Pantheon1-a9faad39f0014bdfa9fb418913bd8cc8.JPG"
                },
                {
                    title: "Pantheon",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/5bswSz6PUlJs9O5O20B2Zo/d8927132c4277bd35cacea6b202c7da1/20230109-211417-3.jpg",
                    fileName: "20230109-211417-3.jpg"
                }
            ],
            geolocation: {
                lon: 12.476944,
                lat: 41.898611
            }
        }
    },
    {
        fields: {
            id: "18",
            name: "Mole Antonelliana",
            stadt: "Turin",
            land: "Italien",
            epoche: "Historismus/Eklektizismus",
            bauzeit: "1863 - 1889",
            bauherr: "Alessandro Antonelli",
            beschreibung: "Die Mole Antonelliana (ital. mole: „sehr großes Bauwerk“) ist ein Wahrzeichen der italienischen Stadt Turin. Der pavillonartige Bau mit seinem hohen, sichstark verjüngende Aufsatz entstand in den Jahren 1863 bis 1889 nachPlänen des TurinerArchitekten Alessandro Antonelli (1798–1888). Er war im Auftrag der jüdischen Gemeinde als Synagoge begonnen worden und ursprünglich mit 280.000 Lire veranschlagt. Der übersteigerte Ehrgeiz des Architekten, ein einzigartiges, meisterhaftes Bauwerk zu errichten, ließ die Kosten derart explodieren, dass 1876 schon 692.000 Lire ausgegeben waren, das Gebäude aber immer noch nicht fertiggestellt war. Trotz ambitionierter Versuche konnte die jüdische Gemeinde schließlich kein Geld mehr aufbringen und das Objekt wurde dank einer Bürgerinitiative im Jahr 1877 für 150.000 Lire in italienischen Renten von der Stadt übernommen, die 1895 ein Museum des Risorgimento darin einrichtete. Die Aufstellung einer knapp 4 Meter hohen Figur eines geflügelten Genius auf der Spitze markierte im April 1889 die Vollendung des Baus.",
            images: [
                {
                    title: "Mole Antonelliana",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2lKrFiBaRrvGoYmjAd5mZW/e3a83511f1369e0737901863ce57c35c/9b3215f5508381bd4e2b2d9397d78db5-original.jpg",
                    fileName: "9b3215f5508381bd4e2b2d9397d78db5-original.jpg"
                },
                {
                    title: "Mole Antonelliana",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2YAjke2o3bKofYRgsriSXi/815daddc297bc55c37e2910adcd4e1e9/mole_ascensore.jpg",
                    fileName: "mole_ascensore.jpg"
                },
                {
                    title: "Mole Antonelliana",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/1QjKw1NKKZ8X9iV2Wxft0s/6cddea92c1c5ea70483e89859c54a1f0/Mole_Antonelliana_di_sera-scaled.jpg",
                    fileName: "Mole_Antonelliana_di_sera-scaled.jpg"
                }
            ],
            geolocation: {
                lon: 7.692286,
                lat: 45.06856
            }
        }
    },
    {
        fields: {
            id: "17",
            name: "Kathedrale Von Genua",
            stadt: "Genua",
            land: "Italien",
            epoche: "Romanisch, Gotisch",
            bauzeit: "1098 - 1118",
            bauherr: "Papst Gelasius II",
            beschreibung: "Die Kathedrale San Lorenzo (Kathedrale Sankt Laurentius) ist die Kathedralkirche des Erzbistums Genua und befindet sich im historischen Teil der Stadt in der Nähe zum Porto Antico, dem Touristenhafen von Genua. Sie wurde 1118 von Papst Gelasius II. geweiht. Mit dem Bau der mittelalterlichen Kirche wurde um 1100 begonnen. Fertiggestellt wurde sie jedoch erst gegen Ende des 15. Jahrhunderts. Wegen dieser epochenübergreifenden Konstruktionsgeschichte weist die Kathedrale sowohl Merkmale der romanischen wie auch der gotischen Baukunst auf.",
            images: [
                {
                    title: "Kathedrale Von Genua",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/5hBjdRz41nBsXOd8ROLVFS/db3ace100429e4972d97d79fb0d57714/kathedrale-genua.jpg",
                    fileName: "kathedrale-genua.jpg"
                },
                {
                    title: "Kathedrale Von Genua",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/zmg8bzFbVONpmlq99XsNp/f7d9e2180b79d7d0f6a6f66c1c910ddc/254762-Cattedrale-Di-San-Lorenzo.jpg",
                    fileName: "254762-Cattedrale-Di-San-Lorenzo.jpg"
                },
                {
                    title: "Kathedrale Von Genua",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/7FLSo1L93bCsiK2T5f24qS/a12372da0140fe521af121487accbf03/san-lorenzo-kathedraal-genua_21900_xl.jpg",
                    fileName: "san-lorenzo-kathedraal-genua_21900_xl.jpg"
                }
            ],
            geolocation: {
                lon: 8.931077,
                lat: 44.40795
            }
        }
    },
    {
        fields: {
            id: "16",
            name: "Castel dell Ovo",
            stadt: "Neapel",
            land: "Italien",
            epoche: "Antike",
            bauzeit: "1. Jahrhundert v. Chr. - 1279",
            bauherr: "Lucius Licinius Lucullus",
            beschreibung: "Das Castel dell Ovo ist die älteste erhaltene Befestigung der Stadt Neapel. Sie befindet sich im Stadtteil San Ferdinando auf der kleinen Insel Megaride, die durch einen begehbaren Steg mit dem Festland verbunden ist. Ihr Name (Eierfestung) kommt von einer Legende, nach der der römische Dichter Vergil ein Ei in das Fundament des Bauwerks gelegt haben soll. Im Mittelalter stand Vergil im Ruf, ein mächtiger Zauberer gewesen zu sein. Die Festung wie auch die Stadt sollen nach dieser Legende das Schicksal des Eis teilen. Solange das Ei heil bliebe, sei auch die Stadt vor dem Untergang geschützt. Im Mittelalter musste ein Regent Neapels zumindest einmal während seiner Herrschaft hinaus zur Festung gehen und das Volk von der Unversehrtheit des Eis überzeugen.",
            images: [
                {
                    title: "Castel dell Ovo",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/5EvJgiHKCMUfto1Vb6n1Ud/f59ad2451394ad3fc39c0d955aa1e6c9/208063-Castle-Of-The-Egg-Castel-Dellovo.jpg",
                    fileName: "208063-Castle-Of-The-Egg-Castel-Dellovo.jpg"
                },
                {
                    title: "Castel dell Ovo",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/1wjF8EF0Itz8DokMsR7stL/f74cd5187189ec055c0972ff89291535/maxresdefault.jpg",
                    fileName: "maxresdefault.jpg"
                },
                {
                    title: "Castel dell Ovo",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/5P1wkKbmXJYsXwmw3q5FJS/7522f014f61a99f0a2c9965a52a14ee1/castel-dellovo-borgo-marinari.jpg",
                    fileName: "castel-dellovo-borgo-marinari.jpg"
                }
            ],
            geolocation: {
                lon: 14.24846,
                lat: 40.82791
            }
        }
    },
    {
        fields: {
            id: "15",
            name: "Dogenpalast",
            stadt: "Venedig",
            land: "Italien",
            epoche: "Gotik",
            bauzeit: "1358 -1424",
            bauherr: "Francesco Foscari",
            beschreibung: "Der Dogenpalast in Venedig war seit dem 9. Jahrhundert Sitz des Dogen und der Regierungs- und Justizorgane der Republik Venedig. Der Palast war Regierungs- und Verwaltungszentrum der Republik und zugleich Symbol der Größe und Macht der Seerepublik Venedig.",
            images: [
                {
                    title: "Dogenpalast",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3LlgVd2XIKOuX5KVoP6vEH/901069e4cc39b9ce1ba51d1031bc4add/10751020876_26fd7f5442_b.jpg",
                    fileName: "10751020876_26fd7f5442_b.jpg"
                },
                {
                    title: "Dogenpalast",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/4dWkC3IIktYNmzrzALVb6I/31fad99c5f94ad058543dd0d06800d2b/Dogenpalast_Venedig_09-1024x633.jpg",
                    fileName: "Dogenpalast_Venedig_09-1024x633.jpg"
                },
                {
                    title: "Dogenpalast",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/5dVMvFFf0AnVZOoetXZhfg/8ccf9211dd23bbd49fe04b314bb7a8ab/unnamed.jpg",
                    fileName: "unnamed.jpg"
                }
            ],
            geolocation: {
                lon: 12.341,
                lat: 45.4337
            }
        }
    },
    {
        fields: {
            id: "13",
            name: "Mailänder Dom",
            stadt: "Mailand",
            land: "Italien",
            epoche: "Renaissance",
            bauzeit: "1386 - 1950",
            bauherr: "Bischof Antonio Saluzzo/Gian Galeazzo Visconti",
            beschreibung: "Der Dom zu Mailand, offiziell die Metropolitankathedrale der Geburt der Seligen Jungfrau Maria ist eine römisch-katholische Kirche in Mailand und die Kathedrale des Erzbistums Mailand. Der Fläche nach ist er eine der größten Kirchen der Welt. 1386 in gotischen Formen begonnen, war der Dom bei der Schlussweihe 1572 noch nicht vollendet und bekam erst ab der napoleonischen Zeit seine heutige Fassade.",
            images: [
                {
                    title: "Mailänder Dom",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/ElmZe6BsQcD4fus6S5LK9/4b35dbef0d6165271cd641f96e935366/bdb51ad407801788a6c0afc19a8e7c6a-dc8707769987605b577877e7049c1b48-ouael-ben-salah-0xe2FGo7Vc0-unsplash_copy.jpg",
                    fileName: "bdb51ad407801788a6c0afc19a8e7c6a-dc8707769987605b577877e7049c1b48-ouael-ben-salah-0xe2FGo7Vc0-unsplash copy.jpg"
                },
                {
                    title: "Mailänder Dom",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/24B1UvlwbpIycx4aKWaPRx/a5fcf25e851b16bb87e73d53dfda4f8e/mailand-dom4.jpg",
                    fileName: "mailand-dom4.jpg"
                },
                {
                    title: "Mailänder Dom",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/78hhqZ1l86bmcWRu3d0S7Q/467a2351fd0b777cc021f9b73573930a/eur-6965-rep.jpg",
                    fileName: "eur-6965-rep.jpg"
                }
            ],
            geolocation: {
                lon: 9.190702,
                lat: 45.46371
            }
        }
    },
    {
        fields: {
            id: "14",
            name: "Arco della Pace",
            stadt: "Mailand",
            land: "Italien",
            epoche: "Romantik",
            bauzeit: "1807 - 1838",
            bauherr: "Luigi Cagnola",
            beschreibung: "Der Arco della Pace (Friedensbogen) ist ein Triumphbogen auf der Piazza Sempione im Bereich des Castello Sforzesco in Mailand. Bereits 1806 war zum Einzug von Eugène de Beauharnais, dem Vizekönig Napoleons, ein hölzerner Ehrenbogen aufgestellt worden. Ein Nachfolger aus Stein, in klassizistischem Stil nach dem Vorbild römischer Triumphbögen erbaut, wurde 1807 begonnen und 1838 fertiggestellt. Er sollte zunächst an den Ruhm Napoleons und dann an den Europäischen Frieden von 1815 erinnern.",
            images: [
                {
                    title: "Arco della Pace",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/75QCGf3msjYn4iJxmATi2C/edb43682ff5b537059ad61eef9b8f7a5/Arco_della_Pace_-_panoramio.jpg",
                    fileName: "Arco_della_Pace_-_panoramio.jpg"
                },
                {
                    title: "Arco della Pace",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3LE0lirkvkas0oyRA43aEV/71c1ad79b58923025dfaa0eb0c2f641f/italien-mailand-stadtbild-mit-arco-della-pace-am-abend-HAMF000014.jpg",
                    fileName: "italien-mailand-stadtbild-mit-arco-della-pace-am-abend-HAMF000014.jpg"
                },
                {
                    title: "Arco della Pace",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3JgqcLkFG0SQUJyYkgAUno/5759d47a0763b2a18d6cabcd65e5a255/Arco_Pace_Notte_Milano.jpg",
                    fileName: "Arco_Pace_Notte_Milano.jpg"
                }
            ],
            geolocation: {
                lon: 9.17168,
                lat: 45.47628
            }
        }
    },
    {
        fields: {
            id: "12",
            name: "Piazza dei Cavalieri",
            stadt: "Pisa",
            land: "Italien",
            epoche: "Antike",
            bauzeit: "1560 - 1598",
            bauherr: "Giorgio Vasari",
            beschreibung: "Die Piazza dei Cavalieri (zu deutsch Platz der Ritter) in Pisa ist entstanden im Auftrag der Medici und wurde von Giorgio Vasari, dem Hofmaler und Hofarchitekten der Medici, geplant. Die Piazza liegt in der Altstadt Pisas und gilt als historisches Zentrum der Kommune. Die Medici demonstrierten auf diesem Platz ihre Macht. Als Pisa 1406 seine Unabhängigkeit verlor, wurde mit der Schlüsselübergabe auf dem Platz an den Konkurrenten Florenz die historische Niederlage der Kommune symbolisiert. Später beheimatete er die zentralen Gebäude des Stephansordens, nach deren Rittern er bis heute benannt ist. Heute beherbergen die meisten Gebäude des Platzes Institute der Scuola Normale Superiore Pisa.",
            images: [
                {
                    title: "Piazza dei Cavalieri",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/6dfpguVkLDtdLpJfKKGBIJ/d9b8268bc9b1fa0dea9ac767de5ee01c/piazza-dei-cavalieri.jpg",
                    fileName: "piazza-dei-cavalieri.jpg"
                },
                {
                    title: "Piazza dei Cavalieri",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2AX1FMVNKf7pxHUTBP1sRc/00291b8626191e4d5c5bc57aca44af01/piazza-cavalieri-pisa.jpg",
                    fileName: "piazza-cavalieri-pisa.jpg"
                },
                {
                    title: "Piazza dei Cavalieri",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/25ThwCOfc7MIZLa4AOAtrW/4a44194d14cf132ec610d798b3f5c5d3/Pietro_francavilla__statua_di_cosimo_I_e_fontana_del_gobbo__1596__02.jpg",
                    fileName: "Pietro_francavilla,_statua_di_cosimo_I_e_fontana_del_gobbo,_1596,_02.jpg"
                }
            ],
            geolocation: {
                lon: 10.39992,
                lat: 43.71959
            }
        }
    },
    {
        fields: {
            id: "11",
            name: "Baptisterium",
            stadt: "Pisa",
            land: "Italien",
            epoche: "Mittelalter",
            bauzeit: "1152 - 1270",
            bauherr: "Diotisalvi",
            beschreibung: "Der frei auf der Piazza dei Miracoli stehende Bau wurde 1152 von Diotisalvi als Ergänzung zum Dom im romanischen Stil auf kreisförmigem Grundriss nach dem Vorbild der Anastasis Rotunde des Heiligen Grabes in Jerusalem begonnen. Es ist die mit insgesamt 54 Meter Höhe und einem Umfang von 107 Meter größte Taufkirche in der christlichen Geschichte.",
            images: [
                {
                    title: "Baptisterium",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/1lY3dBWkB2rshLuXEiL7KT/3e431fe943659d567ca147274a64d55e/Pisa_Baptistry.jpg",
                    fileName: "Pisa_Baptistry.jpg"
                },
                {
                    title: "Baptisterium",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/6BisQl64JUy7a0wfFM7F2B/86c793e4aabcededae2ad8804b7a0c94/MG_9993rw720.jpg",
                    fileName: "MG_9993rw720.jpg"
                },
                {
                    title: "Baptisterium",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/7tAWC2BjfeDmYVPRWJWi6r/6723e6d002295300851393b522de95ca/fit.jpg",
                    fileName: "fit.jpg"
                }
            ],
            geolocation: {
                lon: 10.39407,
                lat: 43.72331
            }
        }
    },
    {
        fields: {
            id: "10",
            name: "Camposanto Monumentale",
            stadt: "Pisa",
            land: "Italien",
            epoche: "Mittelalter",
            bauzeit: "1278 - 1358 ",
            bauherr: "Giovanni di Simone",
            beschreibung: "Der Camposanto Monumentale (deutsch: monumentaler Friedhof) ist eine Friedhofsanlage in Pisa. Der Camposanto ist der nördliche Abschluss der Piazza dei Miracoli mit dem Dom, dem Baptisterium und dem berühmten Schiefen Turm. Die gotische Fassade mit Marmorblendarkaden wirkt wie eine Kulisse.",
            images: [
                {
                    title: "Camposanto Monumentale",
                    url: " //images.ctfassets.net/k4qzcaarqjx8/7lJDwLcIsaWuP9DWunoFSi/2e18bae84b70552ba9d4814cdeea66c4/Camposanto_Pisa_100.JPG",
                    fileName: "Camposanto_Pisa_100.JPG"
                },
                {
                    title: "Camposanto Monumentale",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2y6uqA5Q3jjsNRbD8iYImB/958ea6658b91fb191696e8c8798c8baf/1200px-Camposanto_Monumentale_di_Pisa__16813099494_.jpg",
                    fileName: "1200px-Camposanto_Monumentale_di_Pisa_(16813099494).jpg"
                },
                {
                    title: "Camposanto Monumentale",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2iDKQ8OcuBHzVjgBcHGng8/b3b53a0630727ea0ab6b2aab17b6db0c/2721260.jpg",
                    fileName: "2721260.jpg"
                }
            ],
            geolocation: {
                lon: 10.3951,
                lat: 43.72385
            }
        }
    },
    {
        fields: {
            id: "9",
            name: "Santa Maria della Spina",
            stadt: "Pisa",
            land: "Italien",
            epoche: "Mittelalter",
            bauzeit: "1230 - 1323",
            bauherr: "Lupo di Francesco",
            beschreibung: "Die Kirche Santa Maria della Spina oder auch Dornenkirche ist eine kleine Kirche in Pisa. Die Bezeichnung stammt von einem Dorn der Dornenkrone, der lange Zeit in dieser Kirche aufbewahrt wurde. Dieser musste allerdings an die Kirche Santa Chiara abgegeben werden und liegt heute in deren Kapelle, die zum gleichnamigen Krankenhaus gehört.",
            images: [
                {
                    title: "Santa Maria della Spina",
                    url: " //images.ctfassets.net/k4qzcaarqjx8/9p5AlZXklFMcN0BJ3aNS9/1f5e2ec51dd52e59edeef0eb39abb54e/Esgl_sia_de_Santa_Maria_della_Spina_de_Pisa.JPG",
                    fileName: "Església_de_Santa_Maria_della_Spina_de_Pisa.JPG"
                },
                {
                    title: "Santa Maria della Spina",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3gbLgjSRzlWcs5yBU5tpHj/3624fe6700c8790a42e8b89bb280f6ea/20230220122158_chiesa-di-santa-maria-della-spina_3-2",
                    fileName: "20230220122158_chiesa-di-santa-maria-della-spina_3-2"
                },
                {
                    title: "Santa Maria della Spina",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3UTMyVsbOWZUTPpx6CGlrI/d74f1ff8ad14a06a596f4bf67e411f5a/pisa-chiesa-spina-lungarno.jpg",
                    fileName: "pisa-chiesa-spina-lungarno.jpg"
                }
            ],
            geolocation: {
                lon: 10.39856,
                lat: 43.71574
            }
        }
    },
    {
        fields: {
            id: "7",
            name: "Schiefer Turm von Pisa",
            stadt: "Pisa",
            land: "Italien",
            epoche: "Mittelalter",
            bauzeit: "1173 - 1250",
            bauherr: "Architekt Bonanno Pisano",
            beschreibung: "Der Schiefe Turm von Pisa ist das wohl bekannteste geneigte Gebäude der Welt und Wahrzeichen der Stadt Pisa in Italien.Der Turm war als freistehender Glockenturm für den Dom in Pisa geplant. 12 Jahre nach der Grundsteinlegung am 9. August 1173, im Jahr 1185, als der Bau bei der dritten Etage angelangt war, begann sich der Turmstumpf in Richtung Südosten zu neigen. Daraufhin ruhte der Bau rund 100 Jahre. Die nächsten vier Stockwerke wurden dann mit einem geringeren Neigungswinkel auf den bereits bestehenden Stockwerken gebaut, um die Schieflage auszugleichen. Danach musste der Bau nochmals unterbrochen werden, bis 1372 auch das Glockengeschoss vollendet war.",
            images: [
                {
                    title: "Schiefer Turm von Pisa",
                    url: " //images.ctfassets.net/k4qzcaarqjx8/6WO06tICucfeSshd6DauSY/60b336041c015ab995ea84ee9f587380/4d18aa644bfc14f6be9e39c0d22500e4_a6d9c5a6",
                    fileName: "4d18aa644bfc14f6be9e39c0d22500e4,a6d9c5a6"
                },
                {
                    title: "Schiefer Turm von Pisa",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/1CyWvPDwk9cLx1ctzRuZPk/293dd8ebc6aa9f7ba71b98f32901ab27/760px-Mapcarta.jpg",
                    fileName: "760px-Mapcarta.jpg"
                },
                {
                    title: "Schiefer Turm von Pisa",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3avEbIoviJV5KrFnTfTCfb/c5c5e09912cafaea9d454b911dd48e42/Schiefer-Turm-von-Pisa-innen-Ausblick-691x1024.jpg",
                    fileName: "Schiefer-Turm-von-Pisa-innen-Ausblick-691x1024.jpg"
                }
            ],
            geolocation: {
                lon: 10.39455,
                lat: 43.72264
            }
        }
    },
    {
        fields: {
            id: "8",
            name: "Dom Santa Maria Assunta",
            stadt: "Pisa",
            land: "Italien",
            epoche: "Mittelalter",
            bauzeit: "1063-1263",
            bauherr: "Buscheto di Giovanni Giudice",
            beschreibung: "Der Dom Santa Maria Assunta ist eine Kirche in Pisa, zu der der weltweit berühmte Schiefe Turm von Pisa gehört. Sie ist die Kathedrale des Erzbistums Pisa. Der Dom steht auf dem weitläufigen Rasenplatz der Piazza del Duomo, auf dem sich auch die drei dazugehörenden Bauwerke Baptisterium, Camposanto Monumentale und der Campanile („Der Schiefe Turm von Pisa“) befinden. Dieser Platz wurde vom Dichter D Annunzio als Piazza dei Miracoli (Platz der Wunder) bezeichnet und wird noch heute so genannt. Trotz einer Bauzeit von über 200 Jahren wurde durch den gleichbleibenden Baustoff Carrara-Marmor und die einheitliche Fassadengestaltung ein zusammenhängendes Bild geschaffen. Der Dom wurde zum Vorbild für spätere Dombauten wie z. B. in Florenz und Siena und galt jahrhundertelang als monumentalster Bau der christlichen Geschichte.",
            images: [
                {
                    title: "Dom Santa Maria Assunta",
                    url: " //images.ctfassets.net/k4qzcaarqjx8/6tHiS4ycsE9hq3IldaKSIM/6a1f87f4c1a394f9626bd3b2a77c7d0e/pisa5_1038.jpg",
                    fileName: "pisa5_1038.jpg"
                },
                {
                    title: "Dom Santa Maria Assunta",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/25eNztlUebt8wTtDjFT0I/7e38e954733d99a7b6ced6e511d4a8a3/der-dom-von-pisa-cd13d8a7-6065-4250-b00e-5e965968ca84.jpg",
                    fileName: "der-dom-von-pisa-cd13d8a7-6065-4250-b00e-5e965968ca84.jpg"
                },
                {
                    title: "Dom Santa Maria Assunta",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/7voYki8s0UDYAinILJxjXT/2e26dcda760b75340db0e8fc2b512e22/unnamed.jpg",
                    fileName: "unnamed.jpg"
                }
            ],
            geolocation: {
                lon: 10.39455,
                lat: 43.72264
            }
        }
    },
    {
        fields: {
            id: "6",
            name: "Petersdom",
            stadt: "Rom",
            land: "Italien",
            epoche: "Barock",
            bauzeit: "1506 bis 1626",
            bauherr: "Donato Bramante",
            beschreibung: "Die Basilika Sankt Peter im Vatikan in Rom, im deutschsprachigen Raum wegen ihrer Größe und Bedeutung gemeinhin meist Petersdom genannt, ist die Memorialkirche des Apostels Simon Petrus. Sie ist auf dem Territorium des unabhängigen Staates der Vatikanstadt gelegen und eine der sieben Pilgerkirchen von Rom. Mit einer überbauten Fläche von 20.139 m² und einem Fassungsvermögen von 20.000 Menschen ist der Petersdom die größte der päpstlichen Basiliken und eine der größten und bedeutendsten Kirchen der Welt.",
            images: [
                {
                    title: "Petersdom",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/251O06dOrOhJ3t5LKHb46E/227ac7160cdfb9eed3f391b486220fda/Petersdom_von_Engelsburg_gesehen.jpg",
                    fileName: "Petersdom_von_Engelsburg_gesehen.jpg"
                },
                {
                    title: "Petersdom",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/b7mXoDaL8HEU1fX0dgoFq/80b3b737977129f377288108aa9ff1c0/04-petersdom-in-rom-vatikan-jpg--79436-.jpg",
                    fileName: "04-petersdom-in-rom-vatikan-jpg--79436-.jpg"
                },
                {
                    title: "Petersdom",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/CKNw227KrekfxBtOnNOIb/29b29b0cbf837bfddb237dcc1080fb74/intropetersdomobengjpg100__v-HintergrundL.jpg",
                    fileName: "intropetersdomobengjpg100~_v-HintergrundL.jpg"
                }
            ],
            geolocation: {
                lon: 12.45672,
                lat: 41.90222
            }
        }
    },
    {
        fields: {
            id: "5",
            name: "Circus Maximus",
            stadt: "Rom",
            land: "Italien",
            epoche: "Römischen Antike",
            bauzeit: "6. Jahrhundert v. Chr.",
            bauherr: "König Lucius Tarquinius Priscus",
            beschreibung: "Der Circus Maximus war der größte Circus im antiken Rom. Er hatte eine Gesamtlänge von rund 600 Metern (die Arena und Stufen eingerechnet) sowie eine Breite von 140 Metern. Sein Fassungsvermögen soll laut Dionysios von Halikarnassos im Ausbaustand zur Zeit des Augustus 150.000 Plätze, zur Zeit des älteren Plinius 250.000 Plätze betragen haben. Er wurde bis ins 6. Jahrhundert für Wagenrennen genutzt.",
            images: [
                {
                    title: "Circus Maximus",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/1xdKdILLX0j20drAYL9KyU/0a1d753122e2b0c352e28149fa9d4458/aerial-view-circus-maximus-ancient-600nw-2155613419.jpg",
                    fileName: "aerial-view-circus-maximus-ancient-600nw-2155613419.jpg"
                },
                {
                    title: "Circus Maximus",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/35jG8bRnra8JFKRIWgeP05/9a695eb33525a93a9c666c2a39dab7a9/piekna-rekonstrukcja-circus-maximus.jpg",
                    fileName: "piekna-rekonstrukcja-circus-maximus.jpg"
                },
                {
                    title: "Circus Maximus",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3nS6MAsKfgJRZmvKy8L12a/c3258f77ddba58dc113a5c630f0ef7e8/GPewcS.jpeg",
                    fileName: "GPewcS.jpeg"
                }
            ],
            geolocation: {
                lon: 12.48507,
                lat: 41.88541
            }
        }
    },
    {
        fields: {
            id: "4",
            name: "Kolosseum",
            stadt: "Rom",
            land: "Italien",
            epoche: "Medevial",
            bauzeit: "69–79 AD",
            bauherr: "the emperor Vespasian",
            beschreibung: "The Colosseum (/ˌkɒlə si:əm/ KOL-ə-SEE-əm; Italian: Colosseo [kolos sɛ:o]) is an elliptical amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built, and is stil",
            images: [
                {
                    title: "colosseum",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2g6S3c8owxPdF9ngFlFSaK/955a577e8457fb6ecf3a5e19e6822c74/a.jpg",
                    fileName: "a.jpg"
                },
                {
                    title: "Colosseum",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3SxhXjCqPgCM05ABux4ARl/447483e34660b3fb8d2533bc973df241/b.jpg",
                    fileName: "b.jpg"
                },
                {
                    title: "Colloseum",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/68Roln9W8xPDYYzemg0AWs/78502e54db3cfd14073bf9bd9f88785f/c.png",
                    fileName: "c.png"
                }
            ],
            geolocation: {
                lon: 12.49636,
                lat: 41.90278
            }
        }
    },
    {
        fields: {
            id: "2",
            name: "Curia Julia",
            stadt: "Rom",
            land: "Italien",
            epoche: "Antike",
            bauzeit: "44–29 BC",
            bauherr: "Julius Caesar",
            beschreibung: "Die Curia Iulia am Forum Romanum im antiken Rom war das Sitzungsgebäude des Römischen Senats. Sie wurde in neuerer Zeit teilweise restauriert. Der von Caesar 44 v. Chr. in Auftrag gegebene Bau konnte erst unter Kaiser Augustus im Jahr 29 v. Chr. fertiggestellt werden. Die Curia Iulia erhob sich partiell auf den Resten der älteren Curia Cornelia, die wiederum auf den Trümmern der Curia Hostilia errichtet worden war. Die Curia Iulia gestattete einen direkten Zugang zum neuen, unmittelbar anschließenden Caesarforum, das von Caesar 46 v. Chr.",
            images: [
                {
                    title: "Curia Iulia",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/17xkIYsDsL26It1XFVjum9/e583b2409b5ca7cb711da9e50f81347e/Curia_Iulia_front.jpg",
                    fileName: "Curia_Iulia_front.jpg"
                },
                {
                    title: "Curia Iulia",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/20tAWSfyWYUOQfZu8XXUJE/9fd5a28da2ce1ed134311b9396b9b211/CuriaIulia.JPG",
                    fileName: "CuriaIulia.JPG"
                },
                {
                    title: "Curia Iulia",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/5UIaFO0i37jC47xpGzbUgV/9fd8ae52976295daf9ff9a2245791be0/Inside_Restored_Senate_House_Curia__FORUM_11Mar2006.JPG",
                    fileName: "Inside_Restored_Senate_House(Curia)_FORUM_11Mar2006.JPG"
                }
            ],
            geolocation: {
                lon: 12.485278,
                lat: 41.893056
            }
        }
    },
    {
        fields: {
            id: "1",
            name: "La Fontana di Trevi",
            stadt: "Rom",
            land: "Italien",
            epoche: "Barock",
            bauzeit: "1732–1762 ",
            bauherr: "Konsul Marcus Agrippa",
            beschreibung: "Der Trevibrunnen (italienisch Fontana di Trevi) ist ein Monumentalbrunnen auf der Piazza di Trevi vor dem Palazzo Poli in Rom. Er wurde in den Jahren 1732–1762 vom Architekten Nicola Salvi für Papst Clemens XII. geschaffen und gilt als Meisterwerk des Barock. Der Trevibrunnen ist der größte Brunnen Roms und einer der bekanntesten Brunnen der Welt. Er wird von der Acqua Vergine mit 80 Millionen Litern Wasser pro Tag versorgt.",
            images: [
                {
                    title: "Trevi-Brunnen",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/qTHp6xee1PMtMXdorej8t/cebd2434fbab4be04fb2cb80ae704600/Trevi_Fountain_-_Roma.jpg",
                    fileName: "Trevi_Fountain_-_Roma.jpg"
                },
                {
                    title: "Fountain Trevi detail Rome",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/2hFYwZvdlKkTada9gzzU9t/15b2a996e11ed0aa769b5edd5f698549/Fountain_Trevi_detail_Rome.jpg",
                    fileName: "Fountain_Trevi_detail_Rome.jpg"
                },
                {
                    title: "Fontaine de Trevis Côté",
                    url: "//images.ctfassets.net/k4qzcaarqjx8/3Zjc4XVueFfbgNq1lz7wWP/7469df455071138f30f8d31100ac5f1c/Fontaine_de_Trevis_C_t_.jpg",
                    fileName: "Fontaine_de_Trevis_Côté.jpg"
                }
            ],
            geolocation: {
                lon: 12.4832924490738,
                lat: 41.90097960091407
            }
        }
    }
]