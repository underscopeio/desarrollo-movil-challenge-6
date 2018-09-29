import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import { getUserArtists } from './spotify-api-client'

const SPOTIFY_CLIENT_ID = 'bb223824c29844c7999ac5bc0ab7fdff'
const SECURE_STORE_ACCESS_TOKEN_KEY = 'spotifyAccessToken'

export default class App extends React.Component {
  state = {
    result: null,
    accessToken: null,
  }

  async componentDidMount() {
    const accessToken = await Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY)
    if (accessToken) {
      this.setState({ accessToken })
    }
  }

  _handleAuthButtonPress = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?response_type=token` +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    })

    await this.handleAuthResult(result)
  }

  handleAuthResult = async ({ type, params }) => {
    if (type !== 'success') {
      console.warn('Algo salió mal', result)
      return
    }

    const accessToken = params.access_token

    await Expo.SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, accessToken)
    this.setState({ accessToken })
  }

  render() {
    const { accessToken } = this.state

    return (
      <View style={styles.container}>
        {!accessToken && <Button title="Open Spotify Auth" onPress={this._handleAuthButtonPress} />}
        {accessToken && <Button title="Get user artists" onPress={this._handleGetArtistsPress} />}
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
})
