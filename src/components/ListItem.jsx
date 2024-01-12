export default function ListItem( entries ) {

    return (
        <div>
        <p>Hallo Welt</p>
        {entries.map((field) => {
          console.log(field.fields);
          // console.log(field.fields.geolocation);
          return (
            <div key={field.fields.id}>
              <li>{field.fields.id}</li>
              <li>{field.fields.id}</li>
              <li>{field.fields.name}</li>
              <li>
                {field.fields.geolocation.long +
                  " " +
                  field.fields.geolocation.lat}
              </li>
              <li>{field.fields.stadt.long + " " + field.fields.stadt.lat}</li>
              {/* <li>{field.fields.land}</li> */}
              <li>{field.fields.bauzeit}</li>
              <li>{field.fields.bauherr}</li>
              <li>{field.fields.epoche}</li>
              <div>
                {field.fields.images.map((img) => {
                  return (
                    <img
                      src={img.fields.file.url}
                      alt={img.fields.file.fileName}
                      width="50%"
                    />
                  );
                })}
              </div>
              <li>{field.fields.beschreibung}</li>
            </div>
          );
        })}
      </div>
    )
}