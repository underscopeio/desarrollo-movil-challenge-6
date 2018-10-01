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
      imagen: images[0].url
    }
  })

  return artistas
}