export const getUserArtistsPromise = accessToken => {
  return fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.error && [401, 403].includes(result.error.status)) {
        throw new Error('Authorization error')
      }

      const artistas = result.artists.items.map(({ name: nombre, images, followers: { total: seguidores } }) => {
        return {
          nombre,
          seguidores,
          imagen: images[0].url,
        }
      })

      return artistas
    })
}

export const getUserArtistsAsync = async accessToken => {
  const response = await fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const result = await response.json()

  if (result.error && [401, 403].includes(result.error.status)) {
    throw new Error('Authorization error')
  }

  const artistas = result.artists.items.map(({ name, images, followers: { total } }) => ({
    nombre: name,
    seguidores: total,
    imagen: images[0].url,
  }))

  return artistas
}
