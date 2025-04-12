// app/index.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // Sử dụng useRouter thay vì router trực tiếp
import React from "react";
import {
  Alert,
  Button,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Image, // Sử dụng Image thay vì ImageBackground cho đơn giản nếu không cần overlay phức tạp trực tiếp trên ảnh
  ImageBackground, // Vẫn giữ ImageBackground cho PlayerCard
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListRenderItemInfo, // Cần cho FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon

// ----- Dữ liệu giả định nghĩa trực tiếp trong file -----
const categories = [
  { id: "1", name: "Game là phụ, lối nh...", icon: "game-controller-outline" },
  { id: "2", name: "Nhận Duo Xuyên Đêm ạ", icon: "moon-outline" },
  { id: "3", name: "Khác, Tâm Sự, GTA V, N...", icon: "chatbubbles-outline" },
  { id: "4", name: "PUBG PC + LOL + TFT...", icon: "logo-playstation" },
];

const players = [
  {
    id: "p1",
    name: "Kanhdababiez",
    imageUri: "https://via.placeholder.com/300/FFC0CB/000000?text=Player+1",
    price: "80.000 đ / giờ",
    description1: "Máy sấy thủ đô",
    description2: "Đấu Trường Chân Lý,...",
    isOnline: true,
  },
  {
    id: "p2",
    name: "Em Mit",
    imageUri: "https://via.placeholder.com/300/ADD8E6/000000?text=Player+2",
    price: "79.000 đ / giờ",
    description1: "Onl Cam+All game",
    description2: "PUBG PC, Liên Quân ...",
    isOnline: true,
  },
  {
    id: "p3",
    name: "✨Mèo✨",
    imageUri: "https://via.placeholder.com/300/90EE90/000000?text=Player+3",
    price: "50.000 đ / giờ",
    description1: "Tâm sự đêm khuya",
    description2: "LOL, Valorant...",
    isOnline: true,
  },
  {
    id: "p4",
    name: "Công Chúa Ngủ Tro...",
    imageUri: "https://via.placeholder.com/300/FFFFE0/000000?text=Player+4",
    price: "90.000 đ / giờ",
    description1: "Duo rank nhiệt tình",
    description2: "Tốc Chiến, Free Fire...",
    isOnline: false,
  },
  {
    id: "p5",
    name: "Player 5",
    imageUri: "https://via.placeholder.com/300/DDA0DD/000000?text=Player+5",
    price: "65.000 đ / giờ",
    description1: "Chill cùng âm nhạc",
    description2: "Nghe nhạc, tâm sự",
    isOnline: true,
  },
  {
    id: "p6",
    name: "Player 6",
    imageUri: "https://via.placeholder.com/300/F0E68C/000000?text=Player+6",
    price: "70.000 đ / giờ",
    description1: "Leo rank thần tốc",
    description2: "Liên Quân Mobile",
    isOnline: true,
  },
];
// ----- Kết thúc dữ liệu giả -----

export default function HomeScreen() {
  const router = useRouter(); // Khởi tạo router

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwt_token");
      console.log("✅ JWT token đã bị xóa");
      router.replace("/login"); // Chuyển về trang login
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng xuất.");
    }
  };

  // ----- Hàm Render cho Player Card (trong FlatList) -----
  const renderPlayerCard = ({ item }) => (
    <View style={styles.playerCardContainer}>
      <ImageBackground
        source={{ uri: item.imageUri }}
        style={styles.playerImage}
        imageStyle={styles.playerImageStyle}
      >
        <View style={styles.playButton}>
          <Ionicons name="play-circle" size={24} color="white" />
        </View>
        <View style={styles.priceOverlay}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </ImageBackground>
      <View style={styles.playerInfoContainer}>
        <View style={styles.playerNameStatusContainer}>
          <Text style={styles.playerName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.isOnline && <View style={styles.onlineDot} />}
        </View>
        <Text style={styles.playerDescriptionText} numberOfLines={1}>
          {item.description1}
        </Text>
        <Text style={styles.playerDescriptionText} numberOfLines={1}>
          {item.description2}
        </Text>
      </View>
    </View>
  );
  // ----- Kết thúc Hàm Render Player Card -----

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* ----- Header Section ----- */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>PD</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>PLAYERDUO</Text>
            <Text style={styles.headerSubtitle}>GAME COMMUNITY</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="filter-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* ----- End Header Section ----- */}

      {/* Sử dụng View bao ngoài và FlatList sẽ tự cuộn nội dung của nó */}
      <View style={styles.mainContentContainer}>
        {/* ----- Category Scroller Section ----- */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                {category.icon && (
                  <Ionicons
                    name={category.icon}
                    size={18}
                    color="red"
                    style={styles.categoryIcon}
                  />
                )}
                <Text style={styles.categoryText} numberOfLines={1}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* ----- End Category Scroller Section ----- */}

        {/* ----- Player Grid Section ----- */}
        <FlatList
          ListHeaderComponent={
            // Sử dụng ListHeaderComponent để đặt header của grid
            <View style={styles.gridHeaderContainer}>
              <View style={styles.gridHeaderLeft}>
                <Ionicons
                  name="flame"
                  size={22}
                  color="orange"
                  style={styles.gridHeaderIcon}
                />
                <Text style={styles.gridHeaderTitle}>HOT Player</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeMoreText}>Xem thêm >></Text>
              </TouchableOpacity>
            </View>
          }
          data={players}
          renderItem={renderPlayerCard} // Gọi hàm render đã định nghĩa ở trên
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContentContainer} // Padding cho nội dung grid
          columnWrapperStyle={styles.gridRow} // Style cho mỗi hàng nếu cần
          showsVerticalScrollIndicator={false}
        />
        {/* ----- End Player Grid Section ----- */}
      </View>

      {/* ----- Logout Button Section ----- */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Đăng xuất" onPress={handleLogout} color="red" />
      </View>
      {/* ----- End Logout Button Section ----- */}
    </SafeAreaView>
  );
}

// ----- StyleSheet -----
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContentContainer: {
    flex: 1, // Cho phép phần này (chứa category và grid) chiếm không gian còn lại
    backgroundColor: "#f8f8f8",
  },
  // Header Styles
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    height: 60,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  headerSubtitle: {
    fontSize: 10,
    color: "gray",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  // Category Scroller Styles
  categoryContainer: {
    paddingVertical: 10,
    backgroundColor: "#FFF", // Nền trắng cho khu vực category
    paddingLeft: 10,
    borderBottomWidth: 1, // Thêm đường kẻ nếu muốn tách biệt với grid
    borderBottomColor: "#EEE",
  },
  categoryScrollContent: {
    alignItems: "center",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryText: {
    fontSize: 12,
    maxWidth: 130,
  },
  // Player Grid Header Styles
  gridHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15, // Đồng bộ padding với các phần khác
    paddingTop: 15, // Khoảng cách trên
    marginBottom: 10, // Khoảng cách dưới trước khi bắt đầu grid
    backgroundColor: "#f8f8f8", // Cùng màu nền với main content
  },
  gridHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridHeaderIcon: {
    marginRight: 5,
  },
  gridHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeMoreText: {
    fontSize: 12,
    color: "orange",
  },
  // Player Grid (FlatList) Styles
  gridContentContainer: {
    paddingHorizontal: 10, // Padding ngang cho các card bên trong grid
    paddingBottom: 20, // Padding dưới cùng của grid
  },
  gridRow: {
    // Có thể dùng justifyContent: 'space-between' nếu cần căn chỉnh khoảng cách trong hàng
  },
  // Player Card Styles (trong renderPlayerCard)
  playerCardContainer: {
    flex: 1, // Quan trọng cho numColumns={2}
    margin: 5,
    backgroundColor: "#FFF",
    borderRadius: 8,
    overflow: "hidden",
    maxWidth: "48%", // Tạo khoảng cách giữa 2 cột
  },
  playerImage: {
    width: "100%",
    aspectRatio: 1, // Giữ ảnh vuông
    justifyContent: "space-between", // Đẩy overlay ra góc
  },
  playerImageStyle: {
    // Có thể bo góc nếu cần, nhưng overflow: hidden đã xử lý
  },
  playButton: {
    position: "absolute",
    bottom: 8,
    left: 8,
  },
  priceOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  priceText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  playerInfoContainer: {
    padding: 8,
  },
  playerNameStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  playerName: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
    marginRight: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "green",
  },
  playerDescriptionText: {
    fontSize: 11,
    color: "grey",
    marginBottom: 2,
  },
  // Logout Button Styles
  logoutButtonContainer: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
