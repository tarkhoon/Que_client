import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import {firebase} from '../config';

const Login = () => {
  const navigation = useNavigation();
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const loginUser = async(emailInput, passInput) => {
    try{
        await firebase.auth().signInWithEmailAndPassword(emailInput,passInput)
    }catch(error){
        alert(error.message)
    }
  }
  return (
    <View style={styles.main}>
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
        <TouchableOpacity onPress={() => loginUser(emailInput,passInput)} style={styles.login}>
            <Text style={{color: "#FF4401", fontSize: 16, fontWeight:"bold"}}>Авторизоваться</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Registration")}} style={styles.registration}>
            <Text style={{color: "#FF4401", fontSize: 16, fontWeight:"bold"}}>Регистрация</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Login
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  inpadd: {
    position: "absolute",
    top: 200,
    left: 40,
    color: "#fff",
    width: 295,
    paddingHorizontal: 20,
    paddingTop:10,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 25,
    borderWidth: 1,
    height: 50
  },
  inpaddPass: {
    position: "absolute",
    top: 270,
    left: 40,
    color: "#fff",
    width: 295,
    paddingHorizontal: 20,
    paddingTop:10,
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 25,
    borderWidth: 1,
    height: 50
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
  login:{
    left: 30,
    top:40,
    width: 200,
    backgroundColor: "#F9E8E1",
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    paddingLeft: 37,
    borderRadius:8
  },
  registration:{
    left: 60,
    top:90,
    width: 200,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    paddingLeft: 18,
    borderRadius:8
  }
});
