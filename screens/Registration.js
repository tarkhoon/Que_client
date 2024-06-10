import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import {reg} from "../components/ResHandler"
const Reg = () => {
  const navigation = useNavigation();
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [isRestaurant, setIsRestaurant] = useState(false);
  registerUser = async (
    emailInput,
    passInput,
    nameInput,
    nicknameInput
  ) => {
    reg(nameInput,nicknameInput,emailInput,isRestaurant)
    console.log(nameInput)
    console.log(nicknameInput)
    await firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput, passInput)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://mobile-develop-97eb8.firebaseapp.com",
          })
          .then(() => {
            alert(
              "Письмо для подтверждения отправлено на почту"
            );
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                emailInput,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
          
      })
      .catch((error) => {
        alert(error.message);
      });
      
  };
  return (
    <View style={styles.main}>
      <View style={styles.userSwitch}>
        <Text
          style={{
            color: !isRestaurant ? "#FF4401" : "black",
          }}
        >
          Посетитель
        </Text>
        <Switch
          value={isRestaurant}
          onValueChange={() => {
            setIsRestaurant(
              (isRestaurant) => !isRestaurant
            );
            console.log(isRestaurant);
          }}
          trackColor={{ true: "#e1e1e1" }}
        />
        <Text
          style={{
            color: isRestaurant ? "#FF4401" : "black",
          }}
        >
          Заведение
        </Text>
      </View>
      {isRestaurant ? (
        <View style={{ marginTop: 30 }}>
          <View style={styles.inpadd}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Email"
              value={emailInput}
              onChangeText={(text) => setEmailInput(text)}
            />
          </View>
          <View style={styles.inpaddPass}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Пароль"
              value={passInput}
              onChangeText={(text) => setPassInput(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inpadd}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Название заведения"
              value={nameInput}
              onChangeText={(text) => setNameInput(text)}
            />
          </View>
          <View style={styles.inpadd}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Отображаемое имя"
              value={nicknameInput}
              onChangeText={(text) =>
                setNicknameInput(text)
              }
            />
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 30 }}>
          <View style={styles.inpadd}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Email"
              value={emailInput}
              onChangeText={(text) => setEmailInput(text)}
            />
          </View>
          <View style={styles.inpaddPass}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Пароль"
              value={passInput}
              onChangeText={(text) => setPassInput(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inpadd}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Ваше имя"
              value={nameInput}
              onChangeText={(text) => setNameInput(text)}
            />
          </View>
          <View style={styles.inpadd}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Отображаемое имя"
              value={nicknameInput}
              onChangeText={(text) =>
                setNicknameInput(text)
              }
            />
          </View>
        </View>
      )}

      <View style={styles.switchPage}>
        <TouchableOpacity
          onPress={() =>
            registerUser(emailInput, passInput, nameInput,nicknameInput)
          }
          style={styles.registration}
        >
          <Text
            style={{
              color: "#FF4401",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.login}
        >
          <Text
            style={{
              color: "#FF4401",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Авторизация
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Reg;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",

    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  inpadd: {
    marginTop: 20,
    left: 40,
    color: "#fff",
    width: 295,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
  },
  inpaddPass: {
    marginTop: 20,
    left: 40,
    color: "#fff",
    width: 295,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
  },
  inputContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#055c05",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    marginTop: 50,
    width: 200,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    paddingLeft: 47,
    borderRadius: 8,
  },
  registration: {
    width: 200,
    backgroundColor: "#F9E8E1",
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    paddingLeft: 18,
    borderRadius: 8,
  },
  switchPage: {
    left: 70,
    top: 380,
    position: "absolute",
    width: 295,
    paddingHorizontal: 20,
  },
  userSwitch: {
    top: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 60,
  },
});
