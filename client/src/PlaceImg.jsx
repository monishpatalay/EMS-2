export default function PlaceImg({ place, index = 0, className = "rounded-2xl object-cover aspect-square" }) {
  if (!place?.photos?.length) return null;

  return (
    <img
      className={className}
      src={`https://ems-2-v9qq.onrender.com/uploads/${place.photos[index]}`}
      alt={place.title}
    />
  );
}
