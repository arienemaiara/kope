import React from "react";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";

import { TextInputMask } from "react-native-masked-text";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

//------------------- TEXTS ----------------------
export const DefaultText = styled.Text`
  font-family: "varela-round";
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "16px")};
  color: ${(props) => (props.color ? props.color : Colors.defaultText)};
  margin: 2px;
`;

export const Label = styled(DefaultText)`
  text-transform: uppercase;
  margin: 10px 0 5px 0;
`;

export const InfoText = styled(DefaultText)`
  font-size: 16px;
  color: ${Colors.grayText};
`;

export const Title = styled(DefaultText)`
  text-align: center;
  font-size: 24px;
  color: white;
  width: 80%;
`;

export const SubTitle = styled(DefaultText)`
  text-align: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "20px")};
  color: ${(props) => (props.color ? props.color : Colors.defaultText)};
  margin: 15px 0;
`;

export const ListText = styled(DefaultText)`
  font-size: 20px;
`;

//------------------- BUTTONS ----------------------
export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.27);
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-family: "varela-round";
  text-transform: uppercase;
  color: white;
  text-align: center;
`;

export const DefaultButton = (props) => (
  <ButtonContainer
    onPress={props.onPress}
    backgroundColor={props.backgroundColor}
    style={props.style}
  >
    <ButtonText>{props.title}</ButtonText>
  </ButtonContainer>
);

export const ButtonTransparentContainer = styled.TouchableOpacity`
  padding: 12px;
`;

export const ButtonTransparentText = styled.Text`
  font-family: "varela-round";
  color: ${(props) => (props.color ? props.color : Colors.defaultText)};
  text-align: center;
  font-size: ${(props) => (props.titleSize ? props.titleSize + "px" : "16px")};
`;

export const ButtonTransparent = (props) => (
  <ButtonTransparentContainer onPress={props.onPress} style={props.style}>
    <ButtonTransparentText color={props.color} titleSize={props.titleSize}>
      {props.title}
    </ButtonTransparentText>
  </ButtonTransparentContainer>
);

//------------------- INPUTS ----------------------
const DefaultInputCSS = css`
  font-size: 16px;
  color: ${Colors.inputText};
  padding: 12px 15px;
  border: 1px solid;
  border-color: ${Colors.inputBorder};
  border-radius: 8px;
`;

const FormInputCSS = css`
  border-bottom-color: ${Colors.inputBorderBottom};
  border-bottom-width: 4px;
  margin-bottom: 5px;
`;

export const DefaultInput = styled.TextInput`
  ${DefaultInputCSS}
`;

export const FormInput = styled(DefaultInput)`
  ${FormInputCSS}
`;

export const MaskedInput = styled(TextInputMask)`
  ${DefaultInputCSS}
  ${FormInputCSS}
`;

//------------------- VIEWS ----------------------
export const FullContainer = styled.View`
  flex: 1;
  height: ${Layout.window.height - 90 - 130 + "px"};
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  padding: 15px;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding",
})`
  flex: 1;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => (props.padding ? props.padding + "px" : "0px")};
`;

export const Column = styled.View`
  flex-direction: column;
  padding: ${(props) => (props.padding ? props.padding + "px" : "0px")};
`;

export const ItemLista = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.listSeparator};
  flex-direction: ${(props) => (props.flexRow ? "row" : "column")};
  align-items: flex-start;
`;

export const CPFManual = styled.View`
  border-radius: 5px;
  padding: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.27);
  background-color: #fff;
  padding: 20px;
  margin: 10px;
`;
