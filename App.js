import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { authorize, getUserArtistsPromise } from './spotify-api-client'
import ArtistaFavorito from './ArtistaFavorito'
import { ScrollView } from './node_modules/react-native-gesture-handler'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, NavigationEvents  } from 'react-navigation'

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';


class LoginScreen extends React.Component {
  state = {
    result: null,
    loggedIn: false,
  }



  _handleAuthButtonPress = () => {
    authorize().then(loggedIn => {
      // console.warn('esta logueado?', loggedIn)
      this.setState({ loggedIn })
      this.props.navigation.navigate('App');
      
    })
  }


  _handleGetArtistsPress = () => {
    getUserArtistsPromise().then(artistas => this.setState({ artistas }))
  }


  render() {
    const { loggedIn, artistas } = this.state

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LOGIN</Text>
        <Button title="Ingresar con Spotify" onPress={this._handleAuthButtonPress} />
      </View>
    )
  }
}


class ArtistasScreen extends React.Component {

  state = {
    result: null,
    loggedIn: false,
  }

  


  _handleAuthButtonPress = () => {
    authorize().then(loggedIn => {
      // console.warn('esta logueado?', loggedIn)
      this.setState({ loggedIn })
    })
  }


  _handleGetArtistsPress = () => {
    getUserArtistsPromise().then(artistas => this.setState({ artistas }))
  }


  render() {

    
    const { loggedIn, artistas } = this.state

    // console.warn('artistas', artistas)

    return (
      <View style={styles.container}>
       
       <NavigationEvents
      onDidFocus={payload => getUserArtistsPromise().then(artistas => this.setState({ artistas }))  }
      onWillBlur={payload => console.warn('will blur',payload)}
      onDidBlur={payload => console.warn('did blur',payload)}
    />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas && artistas.map(artist => <ArtistaFavorito artista={artist} key={artist.nombre} />)}
        </ScrollView>

      </View>
    )
  }
}

const AppStack = createStackNavigator({ Home: ArtistasScreen });
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

class AuthLoadingScreen extends React.Component {
  
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);







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

