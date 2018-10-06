import { AuthSession } from 'expo'

const SPOTIFY_CLIENT_ID = '1eec4b18983b40609a803fe6895ac7a6'
const SECURE_STORE_ACCESS_TOKEN_KEY = 'BQCu5F-stJEgWqe6C9eiqnpxE2lAYuDoeehZGLBgJBYLtcY3sqz3KvTzLYgv32nmiC3qAxUGWtalm2IjFkuuycE8WaFNkwG6tImC-1EwXxtB75ZQxWrDJdrbbg3Mf7Z-kaUvTZSP6q7f0Edd15HUVT2kb3fT237nf7l9_zM38YOp1j11ii_fRRAgEI59xCcRo_yv3I_Heu2U2lZXVKD2nSSFJXWKAfhXRVVD272SwiATxS7uIQPHcYftlSCqfmgJBpFDi8TYpGsCsG8n8Q'


let token

Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY).then(accessToken => {
  token = accessToken
})

export const authorize = () => {
  //console.warn('AUTH!')
  const redirectUrl = AuthSession.getRedirectUrl()

  return AuthSession.startAsync({
    authUrl:
      `https://accounts.spotify.com/authorize?response_type=token` +
      `&client_id=${SPOTIFY_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&scope=user-follow-read`,
  }).then(result => this.handleAuthResult(result))
}

handleAuthResult = ({ type, params }) => {
  if (type !== 'success') {
    console.warn('Algo salió mal', result)
    return false
  }

  const accessToken = params.access_token

  Expo.SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, accessToken).then(() => {
    token = accessToken
  })

  return true
}

export const getUserArtistsPromise = () => {
  return fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      // console.warn('resultado', result)
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
