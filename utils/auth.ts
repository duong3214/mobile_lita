// utils/auth.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem("jwt_token");
        return token;
    } catch (error) {
        console.log("❌ Lỗi khi lấy token:", error);
        return null;
    }
};
