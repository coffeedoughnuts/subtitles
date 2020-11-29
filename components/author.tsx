import { CSSProperties, FC } from "react";

interface Props {
  name: string;
  image: string;
  style?: CSSProperties;
  size?: number | string;
  minSize?: number | string;
  onClick?: () => void;
  hideName?: boolean;
}

export const Author: FC<Props> = (props) => {
  const { name, image, style, minSize, onClick, hideName, size = 75 } = props
  if (!image) {
    return null
  }
  return (
    <div onClick={onClick} style={{ textAlign: 'center', width: size, minWidth: minSize,  margin: 10, cursor: onClick ? 'pointer' : 'default', ...style }}>
      <div style={{
        backgroundImage: `url(${image})`,
        width: size,
        minWidth: minSize,
        height: size,
        minHeight: minSize,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        borderRadius: '50%',
        border: '2px solid #023047',
        marginBottom: 10,
      }} />
      {!hideName && (
        <span>{name}</span>
      )}
    </div>
  )
}