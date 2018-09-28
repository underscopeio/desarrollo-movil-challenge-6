import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'

const SPOTIFY_CLIENT_ID = 'bb223824c29844c7999ac5bc0ab7fdff'

export default class App extends React.Component {
  state = {
    result: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
        {this.state.result ? <Text>{JSON.stringify(this.state.result)}</Text> : null}
      </View>
    )
  }

  _handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?response_type=token` +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    })
    this.setState({ result })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
