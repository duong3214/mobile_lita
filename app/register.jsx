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

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.194.41:8080/api/auth/register",
        {
          // const response = await fetch(
          //   "http://192.168.1.3:8080/api/auth/register",
          //   {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, username, email, password }),
        }
      );

      const result = await response.text();

      if (response.ok) {
        Alert.alert("Đăng ký thành công", result);
        router.replace("/login");
      } else {
        Alert.alert("Lỗi", result);
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
        <Text style={styles.heading}>Đăng Ký</Text>

        <View style={styles.box_input}>
          <TextInput
            placeholder="Họ tên"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.text}>Đã có tài khoản?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6D4AFF",
    height: "100%",
  },
  container_img_text: {
    flexDirection: "column",
    alignItems: "center",
  },
  image_rabbit: {
    width: 150,
    height: 150,
  },
  text_title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
  },
  box_input: {
    justifyContent: "space-evenly",
    height: 290,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image_rabbit: {
    width: 150,
    height: 150,
  },
  login_box: {
    backgroundColor: "#fff",
    margin: 12,
    marginTop: 40,
    height: 500,
    borderRadius: 10,
  },
  text: {
    color: "#888",

    marginRight: 12,
    marginBottom: 4,
    textAlign: "right",
  },
  heading: {
    textAlign: "center",
    color: "#6D4AFF",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 20,
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
});
