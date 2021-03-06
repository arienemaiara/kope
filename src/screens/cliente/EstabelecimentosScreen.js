import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Page from "../../components/Page";
import SemRegistros from "../../components/SemRegistros";
import AvatarImagem from "../../components/AvatarImagem";
import {
  InfoText,
  ListText,
  DefaultInput,
  ItemLista,
  Row,
  Column,
} from "../../components/StyledComponents";

import Colors from "../../constants/Colors";

import { converterDistanciaKM } from "../../utils/helpers";
import api from "../../services/api";

const EstabelecimentosScreen = ({ navigation }) => {
  const [carregando, setCarregando] = useState(false);
  const [enderecosLista, setEnderecosLista] = useState([]);
  const [page, setPage] = useState(0);
  const [userLocation, setUserLocation] = useState();

  let location;

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  useEffect(() => {
    (async () => {
      await getLocation();
      carregarEnderecos();
    })();
  }, []);

  const carregarEnderecos = () => {
    if (carregando) return;

    const latitude =
      userLocation?.coords?.latitude || location?.coords?.latitude;
    const longitude =
      userLocation?.coords?.longitude || location?.coords?.longitude;

    setCarregando(true);

    api
      .get("/estabelecimentos", {
        params: {
          latitude,
          longitude,
          page: page + 1,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setEnderecosLista([...enderecosLista, ...response.data]);
          setPage(page + 1);
        }
        setCarregando(false);
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro ao buscar os dados. Tente novamente.", [
          {
            text: "OK",
            onPress: () => setCarregando(false),
          },
        ]);
      });
  };

  const renderLista = () => {
    if (!enderecosLista || enderecosLista.length === 0) {
      return <SemRegistros message="Nenhum estabelecimento encontrado." />;
    } else {
      return (
        <FlatList
          data={enderecosLista}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderItem(item)}
          onEndReached={carregarEnderecos}
          onEndReachedThreshold={0.2}
        />
      );
    }
  };

  const renderItem = (item) => {
    const { estabelecimento } = item;
    return (
      <ItemLista
        onPress={() => {
          navigation.navigate("RecompensasEstabelecimento", {
            estabelecimento,
            endereco: item,
          });
        }}
      >
        <Row>
          <AvatarImagem imagem_url={estabelecimento.avatar_path} />
          <Column>
            <ListText>{estabelecimento.nome}</ListText>
            {item.distancia && (
              <InfoText>{converterDistanciaKM(item.distancia)}km</InfoText>
            )}
          </Column>
        </Row>
      </ItemLista>
    );
  };

  return (
    <Page title="Estabelecimentos Participantes">
      <Spinner visible={carregando} />
      {renderLista()}
    </Page>
  );
};

const styles = StyleSheet.create({
  buscar: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buscarText: {
    flex: 1,
    paddingLeft: 40,
  },
  buscarIcon: {
    position: "absolute",
    marginLeft: 10,
    marginTop: 10,
    fontSize: 22,
    color: Colors.lightGray,
  },
  listContainer: {},
});

export default EstabelecimentosScreen;
