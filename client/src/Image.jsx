export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://ems-2-v9qq.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }
