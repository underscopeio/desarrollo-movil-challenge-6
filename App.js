import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import { getUserArtistsPromise } from './spotify-api-client'
import ArtistaFavorito from './ArtistaFavorito'
import { ScrollView } from './node_modules/react-native-gesture-handler'

const SPOTIFY_CLIENT_ID = 'bb223824c29844c7999ac5bc0ab7fdff'
const SECURE_STORE_ACCESS_TOKEN_KEY = 'spotifyAccessToken'

export default class App extends React.Component {
  state = {
    result: null,
    accessToken: null,
  }

  componentDidMount() {
    Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY).then(accessToken => {
      if (accessToken) {
        this.setState({ accessToken })
      }
    })
  }

  // NOTA: esta sería la versión de `componentDidMount` usando async/await
  //
  // async componentDidMount() {
  //   const accessToken = await Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY)
  //   if (accessToken) {
  //     this.setState({ accessToken })
  //   }
  // }

  _handleAuthButtonPress = () => {
    const redirectUrl = AuthSession.getRedirectUrl()

    AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?response_type=token` +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=user-follow-read`,
    }).then(result => this.handleAuthResult(result))
  }

  // NOTA: esta sería la versión de `_handleAuthButtonPress` usando async/await
  //
  // _handleAuthButtonPress = async () => {
  //   const redirectUrl = AuthSession.getRedirectUrl()

  //   const result = await AuthSession.startAsync({
  //     authUrl:
  //       `https://accounts.spotify.com/authorize?response_type=token` +
  //       `&client_id=${SPOTIFY_CLIENT_ID}` +
  //       `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  //       `&scope=user-follow-read`,
  //   })

  //   await this.handleAuthResult(result)
  // }

  handleAuthResult = ({ type, params }) => {
    if (type !== 'success') {
      console.warn('Algo salió mal', result)
      return
    }

    const accessToken = params.access_token

    Expo.SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, accessToken).then(accessToken => {
      this.setState({ accessToken })
    })
  }

  // NOTA: esta sería la versión de `handleAuthResult` usando async/await
  //
  // handleAuthResult = async ({ type, params }) => {
  //   if (type !== 'success') {
  //     console.warn('Algo salió mal', result)
  //     return
  //   }

  //   const accessToken = params.access_token

  //   await Expo.SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, accessToken)
  //   this.setState({ accessToken })
  // }

  _handleGetArtistsPress = () => {
    getUserArtistsPromise(this.state.accessToken).then(artistas => this.setState({ artistas }))
  }

  render() {
    const { accessToken, artistas } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas && artistas.map(artist => <ArtistaFavorito artista={artist} key={artist.nombre} />)}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button title="Login con Spotify" onPress={this._handleAuthButtonPress} />
          <Button disabled={!accessToken} title="Ver favoritos" onPress={this._handleGetArtistsPress} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})
