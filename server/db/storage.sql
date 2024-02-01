INSERT INTO
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
        $ { el.fields.id },
        "${el.fields.name}",
        "${el.fields.stadt}",
        "${el.fields.land}",
        "${el.fields.epoche}",
        "${el.fields.bauzeit}",
        "${el.fields.bauherr}",
        "${el.fields.beschreibung}"
    );

CREATE TABLE sights (
    id INTEGER PRIMARY KEY,
    name VARCHAR(256),
    stadt VARCHAR(256),
    land VARCHAR(256),
    epoche VARCHAR(256),
    bauzeit VARCHAR(256),
    bauherr VARCHAR(256),
    beschreibung VARCHAR(2500)
);

CREATE TABLE images (
    id INTEGER PRIMARY KEY,
    sightid INTEGER REFERENCES sights(id),
    filename VARCHAR(256),
    title VARCHAR(256),
    url VARCHAR(256)
);

CREATE TABLE location (
    id INTEGER PRIMARY KEY,
    sightid INTEGER REFERENCES sights(id),
    lat DECIMAL(8, 6),
    lon DECIMAL(9, 6)
);