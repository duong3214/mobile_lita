import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Button, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwt_token");
      console.log("✅ JWT token đã bị xóa");
      router.replace("/login"); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng xuất.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Nội dung khác của trang chính */}
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}
