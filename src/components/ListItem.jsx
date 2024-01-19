import { Link } from "react-router-dom";

export default function ListItem({ item }) {
  let route = item.fields.name.toLowerCase().replaceAll(" ", "-");
  // const navigate = useNavigate();

  return (
    <div
      className="max-w-sm bg-grey border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:bg-gray-200 dark:bg-gray-100 dark:border-gray-400"
      key={item.fields.id}
      // onClick={() => {
      //   console.log(route);
      //   navigate(`/${route}`);
      // }}
    >
      <div className="">
        <img
          className="  w-full h-56 object-cover object-center rounded-lg  "
          src={item.fields.images[0].fields.file.url}
          alt={item.fields.images[0].fields.file.fileName}
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold font-Poppins md:text-3xl">
          {item.fields.name}
        </h3>
        <ol className="text-sm">{item.fields.epoche}</ol>
        <ol className="md:text-2xl">{item.fields.stadt}</ol>
        <ol className="font-bold md:text-3xl">{item.fields.land}</ol>
      </div>
      <Link to={`/${route}`} state={{ item: item }}>
        Show Detail
      </Link>
    </div>
  );
}
