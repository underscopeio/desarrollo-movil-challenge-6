import React, {Component} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Ionicons } from './node_modules/@expo/vector-icons'
import PropTypes from 'prop-types'

export default class FavouriteAlbum extends Component {
  render () {
    const {
      itemProp: { nombre, imagen, artista, seguidores }
    } = this.props

    return (
      <View style={[styles.container, styles.withShadow]}>
        <Image source={{uri: imagen}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{nombre}</Text>
          <Text style={styles.artist}><Ionicons name="md-contact" size={22} /> {artista}</Text>
          <Text style={styles.follow}><Ionicons name="ios-heart" size={22} /> {seguidores}</Text>
        </View>
      </View>
    )
  }
}

FavouriteAlbum.propTypes = {
  itemProp: PropTypes.shape({
    nombre: PropTypes.string,
    imagen: PropTypes.string,
    artista: PropTypes.string,
    seguidores: PropTypes.number,
  }),
}

FavouriteAlbum.defaultProps = {
  itemProp: {},
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 'auto',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 10,
  },
  image: {
    height: 280,
    width: '100%',
    maxWidth: 250,
  },
  withShadow: {
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 1,
    },
    shadowRadius: 1.5,
    shadowOpacity: 0.4,
    elevation: 2,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  artist: {
    fontWeight: '400',
    marginLeft: 10,
    marginVertical: 5,
  },
  follow: {
    fontWeight: '400',
    marginLeft: 10,
    marginVertical: 5,
  },
})



