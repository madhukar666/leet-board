import React from 'react'

interface AvatarImageProps {
  src?: string
  alt: string
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt }) => {
  const [imageError, setImageError] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  if (!src || imageError) {
    return null
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleImageError}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

interface AvatarFallbackProps {
  children: React.ReactNode
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e0e0e0',
      color: '#333',
      fontSize: 'inherit',
      fontWeight: 'bold'
    }}>
      {children}
    </div>
  )
}

interface AvatarProps {
  children: React.ReactNode
  size?: number
}

export const Avatar: React.FC<AvatarProps> = ({ children, size = 40 }) => {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      position: 'relative',
      fontSize: `${size / 2}px`,
    }}>
      {children}
    </div>
  )
}