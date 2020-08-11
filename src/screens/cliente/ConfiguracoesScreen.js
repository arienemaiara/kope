import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import Page from "../../components/Page";
import {
  Column,
  ItemLista,
  DefaultText,
  InfoText,
} from "../../components/StyledComponents";
import Colors from "../../constants/Colors";

import AuthContext from "../../contexts/auth";

const ConfiguracoesScreen = ({ navigation }) => {
  const { signOut, user } = useContext(AuthContext);

  return (
    <Page title="Configurações">
      {/* <Column padding={20} style={{ alignItems: "center" }}>
        <DefaultText fontSize={22} color={Colors.pinkText}>
          {user.nome}
        </DefaultText>
        <InfoText>{user.cpf}</InfoText>
      </Column> */}
      <ItemLista
        onPress={() => {
          navigation.navigate("Cadastro", { usuario: user });
        }}
        flexRow={true}
      >
        <Feather name="user" style={styles.icon} />
        <DefaultText fontSize={16}>Editar Perfil</DefaultText>
      </ItemLista>
      <ItemLista onPress={signOut} flexRow={true}>
        <Feather name="log-out" style={styles.icon} />
        <DefaultText fontSize={16}>Sair</DefaultText>
      </ItemLista>
    </Page>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    color: Colors.defaultText,
    fontSize: 26,
  },
});

export default ConfiguracoesScreen;
