import { COLORS } from '@/constants/colors'
import { useClerk } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Alert, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc là muốn đăng xuất?",
      [
        { text: "Từ Chối", style: "cancel" },
        { text: "Đồng Ý", style: "destructive", onPress: async () => { await signOut(); } },
      ]
    );
  };


  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Ionicons name='log-out-outline' size={22} color={COLORS.text} />
    </TouchableOpacity>
  );
};