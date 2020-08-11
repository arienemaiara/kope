import React, { createContext, useState, useEffect, useContext } from "react";
import { AsyncStorage } from "react-native";

import AuthContext from "./auth";
import api from "../services/api";

const RecompensaContext = createContext({
  loading: false,
  recompensasLista: false,
  carregarRecompensas: () => {},
  adicionarRecompensa: () => {},
  alterarRecompensa: () => {},
  excluirRecompensa: () => {},
});

export const RecompensaProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [recompensasLista, setRecompensasLista] = useState([]);

  const { user } = useContext(AuthContext);

  const carregarRecompensas = async (page = 1) => {
    console.log("carregando recompensas");
    console.log(api.defaults.headers);
    const tkn = await AsyncStorage.getItem("token");
    console.log("token", tkn);
    setLoading(true);
    api
      .get("/recompensas", {
        params: {
          page,
          estabelecimento_id: user.id,
        },
      })
      .then((response) => {
        if ((page = 1)) {
          setRecompensasLista(response.data);
        } else {
          if (response.data.length > 0) {
            setRecompensasLista([...recompensasLista, ...response.data]);
          } else {
            setRecompensasLista([...recompensasLista]);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  const adicionarRecompensa = async (formData) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      api
        .post("/recompensas", formData)
        .then((response) => {
          setRecompensasLista([...recompensasLista, response.data]);
          setLoading(false);
          resolve(response.data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error.response);
        });
    });
  };

  const alterarRecompensa = (id, formData) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      api
        .put("/recompensas/" + id, formData)
        .then((response) => {
          carregarRecompensas();
          setLoading(false);
          resolve(response.data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error.response);
        });
    });
  };

  const excluirRecompensa = (id) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      api
        .delete("/recompensas/" + id)
        .then((response) => {
          carregarRecompensas();
          setLoading(false);
          resolve(response.data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error.response);
        });
    });
  };

  return (
    <RecompensaContext.Provider
      value={{
        loading,
        recompensasLista,
        carregarRecompensas,
        adicionarRecompensa,
        alterarRecompensa,
        excluirRecompensa,
      }}
    >
      {children}
    </RecompensaContext.Provider>
  );
};

export default RecompensaContext;
