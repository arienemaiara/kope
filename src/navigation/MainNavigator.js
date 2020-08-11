import React, { useContext } from "react";
import { AsyncStorage, View, Text, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import EstabelecimentoNavigator from "./EstabelecimentoNavigator";
import ClienteNavigator from "./ClienteNavigator";

import AuthContext from "../contexts/auth";
import { RecompensaProvider } from "../contexts/recompensa";

const MainNavigator = (props) => {
  const { signed, userType, loading } = useContext(AuthContext);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#777" />
  //     </View>
  //   );
  // }

  const renderNavigation = () => {
    if (userType === "estabelecimento") {
      return (
        <RecompensaProvider>
          <EstabelecimentoNavigator />
        </RecompensaProvider>
      );
    } else if (userType === "cliente") {
      return <ClienteNavigator />;
    }
    return null;
  };
  return (
    <NavigationContainer>
      {signed === true ? renderNavigation() : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
