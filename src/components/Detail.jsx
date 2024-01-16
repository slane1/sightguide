export default function Detail({ item }) {
  return (
    <div className="detail" key={item.fields.id}>
      <div className="c">
        <h3 className="text-3xl font-bold underline">{item.fields.name}</h3>
        <li>{item.fields.epoche}</li>
        <li>
          {item.fields.geolocation.lon + " " + item.fields.geolocation.lat}
        </li>
        <li>{item.fields.stadt}</li>
        <li>{item.fields.land}</li>
        <li>{item.fields.bauzeit}</li>
        <li>{item.fields.bauherr}</li>
        <li>{item.fields.beschreibung}</li>
      </div>
      <div className="c">
        {item.fields.images.map((img) => {
          return (
            <img src={img.fields.file.url} alt={img.fields.file.fileName} />
          );
        })}
      </div>
    </div>
  );
}
