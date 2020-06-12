import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const AvatarImagem = ({ imagem_url }) => {

    const renderImagem = () => {
        if (imagem_url.includes('null')) {
            return <Feather name="image" size={26} color="#fff" />
        }
        else {
            return <Image source={{ uri: imagem_url }} style={{width: 56, height: 56}} />
        }
    }

    return (
        <View style={styles.imageContainer}>
            {renderImagem()}
        </View>
    )

}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        backgroundColor: Colors.grayBackground,
        borderRadius: 28,
        marginRight: 10,
    }
});

export default AvatarImagem;