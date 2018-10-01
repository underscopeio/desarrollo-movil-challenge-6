import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Ionicons } from './node_modules/@expo/vector-icons'

export default class ArtistaFavorito extends Component {
  render() {
    const {
      artista: { nombre, imagen, seguidores },
    } = this.props

    return (
      <View style={[styles.container, styles.withShadow]}>
        <Image source={{uri: imagen}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{nombre}</Text>
          <Text style={styles.follow}><Ionicons name="md-contact" size={22} /> {seguidores}</Text>
        </View>
      </View>
    )
  }
}

ArtistaFavorito.propTypes = {
  artista: PropTypes.shape({
    nombre: PropTypes.string,
    imagen: PropTypes.string,
    seguidores: PropTypes.number,
  }),
}

ArtistaFavorito.defaultProps = {
  artista: {},
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 'auto',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    height: 180,
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
  follow: {
    fontWeight: '400',
    marginLeft: 10,
    marginVertical: 5,
  }
})
