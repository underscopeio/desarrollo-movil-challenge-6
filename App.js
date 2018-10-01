import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import { getFavoriteArtistAsync, getFavouriteAlbumsAsync } from './cliente-api-spotify'
import ArtistaFavorito from './ArtistaFavorito'
import FavouriteAlbum from './FavouriteAlbum'
import { ScrollView } from './node_modules/react-native-gesture-handler'

const CLIENT_ID = 'f7eaccf9adea456c8929b07206b0d40d'
const SPOTIFY_CLIENT_ID = CLIENT_ID
const SECURE_STORE_ACCESS_TOKEN_KEY = 'spotifyAccessToken'

export default class App extends React.Component {
  state = {
    result: null,
    accessToken: null,
    artists: [],
    albums: [],
    itemData: []
  }

  async componentDidMount() {
    const accessToken = await Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY)
    if (accessToken) {
      this.setState({ accessToken })
    }
  }

  _handleAuthButtonPress = async () => {
    const scopes = ['user-follow-read', 'user-library-read']
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?response_type=token` +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}`,
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

  _handleGetArtistsPress = () => {
    getFavoriteArtistAsync(this.state.accessToken)
      .then(artists => this.setState({ itemData: artists }))
  }

  _handleGetAlbumsPress = () => {
    getFavouriteAlbumsAsync(this.state.accessToken)
      .then(albums => this.setState({ itemData: albums }))
  }

  render() {
    const { accessToken, artists, albums, itemData } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {
            itemData && itemData.map((item, index) =>
              item.tof ? <ArtistaFavorito itemProp={item} key={index} /> : <FavouriteAlbum itemProp={item} key={index}/>
            )
          }
        </ScrollView>
        <View style={styles.buttonsContainer}>
          {accessToken && <Button title="Open Spotify Auth" onPress={this._handleAuthButtonPress} />}
          {accessToken && <Button title="Get user artists" onPress={this._handleGetArtistsPress} />}
          {accessToken && <Button title="Get user albums" onPress={this._handleGetAlbumsPress} />}
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
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
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
  }
})
