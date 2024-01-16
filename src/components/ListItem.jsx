import Map from "./Map";

export default function ListItem({ item }) {
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
      </div>
      <div className="">
        <img
          src={item.fields.images[0].fields.file.url}
          alt={item.fields.images[0].fields.file.fileName}
        />
      </div>
      <Map geolocation={item.fields.geolocation} />
    </div>
  );
}
