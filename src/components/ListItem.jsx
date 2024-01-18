export default function ListItem({ item }) {
  return (
    <div className="max-w-sm bg-grey border border-gray-200 rounded-t shadow-lg overflow-hidden  dark:bg-gray-100 dark:border-gray-400" 

key={item.fields.id}>
     
     <div className="">
                <img 
                className="  w-full h-56 object-cover object-center rounded-t  "
                  src={item.fields.images[0].fields.file.url}
                  alt={item.fields.images[0].fields.file.fileName}
                />
              </div>
        <div className="p-5">
   <h3 className="text-lg font-bold font-Poppins md:text-3xl">{item.fields.name}</h3>
        <ol className=" md:text-1xl">{item.fields.geolocation.lon + " " + item.fields.geolocation.lat}</ol>
        <ol className="  md:text-2xl">{item.fields.stadt}</ol>
        <ol className=" font-bold md:text-1xl">{item.fields.land}</ol>
        <ol className="sr-only ">{item.fields.bauzeit}</ol>
        <ol className="sr-only ">{item.fields.epoche}</ol>
        <ol className="sr-only ">{item.fields.bauherr}</ol>
        </div>

    </div>
  );
}
