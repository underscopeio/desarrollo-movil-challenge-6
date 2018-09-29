import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

export default class ArtistaFavorito extends React.Component {
  render() {
    const {
      artista: { nombre, imagen, seguidores },
    } = this.props

    return (
      <View style={styles.container}>
        <Text>{nombre}</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
