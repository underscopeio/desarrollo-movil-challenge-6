export const getFavoriteArtistAsync = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })

  const result = await response.json()
  const artistas = result.artists.items.map(({ name: nombre, images, followers: { total: seguidores } }) => {
    return {
      nombre,
      seguidores,
      imagen: images[0].url,
      tof: true
    }
  })

  return artistas
}

export const getFavouriteAlbumsAsync = async accessToken => {
  const response = await fetch('https://api.spotify.com/v1/me/albums', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const result = await response.json()
  const { items } = result
  const albums = items.map(({
                              album: {
                                name: nombre,
                                popularity: seguidores,
                                artists,
                                images
                              }}) => {
    return {
      nombre,
      seguidores,
      artista: artists[0].name,
      imagen: images[0].url,
      tof: false
    }
  })
  return albums
}