import { AntDesign, Feather } from "@expo/vector-icons"; // Example icons - choose based on your preference
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  // State for the toggle switches
  const [receiveMessages, setReceiveMessages] = useState(true);
  const [receiveDuoRequests, setReceiveDuoRequests] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Profile Image/Icon */}
          <Image
            source={require("../assets/img/rabbit.png")} // Replace with your image asset
            style={styles.profileImage}
          />
          {/* Camera Icon (for changing image) */}
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Feather name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>

          {/* Số dư trong ví */}
          <View style={styles.listItem}>
            <AntDesign name="wallet" size={24} color="grey" />
            <Text style={styles.listItemText}>Số dư trong ví</Text>
            <Text style={styles.balanceText}>0đ</Text>
          </View>

          {/* Biến động số dư */}
          <TouchableOpacity style={styles.listItem}>
            <Feather name="activity" size={24} color="grey" />
            <Text style={styles.listItemText}>Biến động số dư</Text>
            {/* You might add an arrow icon here */}
          </TouchableOpacity>

          {/* ID */}
          <View style={styles.listItem}>
            <Feather name="info" size={24} color="grey" />
            <View>
              <Text style={styles.listItemText}>ID: son0570</Text>
              <Text style={styles.linkText}>
                https://playerduo.net/67c6ab9901e43d2c4bdc4bc60
              </Text>
            </View>
          </View>

          {/* Chia sẻ link */}
          <TouchableOpacity style={styles.listItem}>
            <Feather name="share-2" size={24} color="grey" />
            <Text style={styles.listItemText}>Chia sẻ link</Text>
          </TouchableOpacity>
        </View>

        {/* Cài đặt Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>

          {/* Nhận tin nhắn từ người lạ */}
          <View style={styles.listItem}>
            <Feather name="message-circle" size={24} color="grey" />
            <Text style={styles.listItemText}>Nhận tin nhắn từ người lạ</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }} // Customize track colors
              thumbColor={receiveMessages ? "#f5dd4b" : "#f4f3f4"} // Customize thumb colors
              ios_backgroundColor="#3e3e3e"
              onValueChange={setReceiveMessages}
              value={receiveMessages}
            />
          </View>

          {/* Nhận yêu cầu thuê Duo */}
          <View style={styles.listItem}>
            <AntDesign name="bells" size={24} color="grey" />
            <Text style={styles.listItemText}>Nhận yêu cầu thuê Duo</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={receiveDuoRequests ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setReceiveDuoRequests}
              value={receiveDuoRequests}
            />
          </View>

          {/* Cài đặt avatar, tên, url, giá thuê */}
          <TouchableOpacity style={styles.listItem}>
            <Feather name="settings" size={24} color="grey" />
            <Text style={styles.listItemText}>
              Cài đặt avatar, tên, url, giá thuê
            </Text>
            {/* You might add an arrow icon here */}
          </TouchableOpacity>

          {/* Add other settings items similarly */}
          {/* Example: Đổi mật khẩu */}
          {/* Example: Lịch sử giao dịch */}
          {/* Example: Điều khoản sử dụng */}
          {/* Example: Đăng xuất */}
        </View>

        {/* Add other sections if necessary */}
      </ScrollView>

      {/* Bottom Navigation Bar (Fixed) */}
      <View style={styles.bottomNav}>
        {/* Replace with your actual navigation icons and logic */}
        <TouchableOpacity>
          <AntDesign name="home" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="users" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="message-square" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bell" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="video" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="red" />
        </TouchableOpacity>{" "}
        {/* Active icon */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light grey background
  },
  scrollViewContent: {
    paddingBottom: 60, // Add padding at the bottom to make space for the fixed bottom nav
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff", // White background for header
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image round
    backgroundColor: "#e0e0e0", // Placeholder background
    marginBottom: 10,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 15,
    right: "40%", // Adjust this to position the camera icon correctly
    backgroundColor: "red", // Or the color in the image
    borderRadius: 15, // Makes the background round
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Light grey border between items
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1, // Allows the text to take up available space
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green", // Adjust color as per the image
  },
  linkText: {
    fontSize: 14,
    color: "red", // Adjust color as per the image
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff", // White background for bottom nav
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0", // Light grey border at the top
    height: 60, // Fixed height for the bottom nav
  },
});

export default ProfileScreen;
