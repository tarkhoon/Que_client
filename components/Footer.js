import React, { memo } from "react";

import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Button from "./button";
export const Footer = memo(({ navigation, current, avatar }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Main")}
      >
        <Button
          icon="home"
          title={""}
          color={current[0] ? "#FF4401" : "black"}
          size={30}
          style={styles.icon}
          onPress={() => navigation.navigate("Main")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Rec")}
      >
        <Button
          icon="magnifying-glass"
          title={""}
          color={current[1] ? "#FF4401" : "black"}
          size={30}
          style={styles.icon}
          onPress={() => navigation.navigate("Rec")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Publish")}
      >
        <Button
          icon="camera"
          title={""}
          color={current[2] ? "#FF4401" : "black"}
          size={30}
          style={styles.icon}
          onPress={() => navigation.navigate("Publish")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={
            current[3]
              ? [
                  { borderColor: "#FF4401", borderWidth: 2, borderRadius: 15 },
                  styles.icon,
                ]
              : styles.icon
          }
          source={{ uri: avatar }}
        />
      </TouchableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  footer: {
    height: 84,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
