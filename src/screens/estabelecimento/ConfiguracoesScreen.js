import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Page from '../../components/Page';
import { ItemLista, DefaultText } from '../../components/StyledComponents';
import Colors from '../../constants/Colors';
import ImagemPreview from '../../components/ImagemPreview';

import AuthContext from '../../contexts/auth';

const ConfiguracoesScreen = ({ navigation }) => {

    const { signOut, user } = useContext(AuthContext);

    return (
        <Page title="Configurações">
            <View style={styles.userInfo}>
                <ImagemPreview imagem_url={user.avatar_path} />
                <DefaultText fontSize={18} color={Colors.purpleText} style={styles.userName}>{user.nome}</DefaultText>
            </View>
            <ItemLista
                onPress={() => { navigation.navigate('Cadastro', { estabelecimento: user }) }}
                flexRow={true}>
                <Feather name="user" style={styles.icon} />
                <DefaultText fontSize={16}>Editar Perfil</DefaultText>
            </ItemLista>
            <ItemLista
                onPress={signOut}
                flexRow={true}>
                <Feather name="log-out" style={styles.icon} />
                <DefaultText fontSize={16}>Sair</DefaultText>
            </ItemLista>
        </Page>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listSeparator
    },
    userName: {
        marginTop: 10,
    },
    icon: {
        marginRight: 10,
        color: Colors.defaultText,
        fontSize: 26
    }
});

export default ConfiguracoesScreen;