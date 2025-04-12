import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.76.41:8080/api/auth/login", {
        // const response = await fetch("http://192.168.1.3:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("jwt_token", result.token);
        Alert.alert("Đăng nhập thành công");
        router.replace("/"); // Về index
      } else {
        Alert.alert("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      Alert.alert("Lỗi kết nối", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_img_text}>
        <Image
          style={styles.image_rabbit}
          source={require("../assets/img/rabbit.png")}
        />
        <Text style={styles.text_title}>Play Duo</Text>
      </View>
      <View style={styles.login_box}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input_email}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.text} onPress={() => router.push("/register")}>
          Đăng ký?
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container_icon}>
        <Image
          style={styles.img_icon}
          source={require("../assets/img/facebook.png")}
        />

        <Image
          style={styles.img_icon}
          source={require("../assets/img/google.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", backgroundColor: "#6D4AFF" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  container_img_text: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  text_title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
  },
  image_rabbit: {
    width: 150,
    height: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    margin: 12,
  },
  input_email: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    margin: 12,
    marginTop: 40,
  },
  login_box: {
    backgroundColor: "#fff",
    margin: 12,
    marginTop: 40,
    height: 300,
    borderRadius: 10,
  },
  text: {
    color: "#888",
    marginTop: 35,
    marginRight: 12,
    marginBottom: 4,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#6D4AFF",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    width: "60%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  img_icon: {
    width: 50,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  container_icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    gap: 20,
  },
});
