import { ScrollView, Text, View, TouchableOpacity } from "react-native";

import { ScreenContainer } from "@/components/screen-container";

export default function HomeScreen() {
  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8">
          {/* Hero Section */}
          <View className="items-center gap-2">
            <Text className="text-4xl font-bold text-foreground">NoteFlow</Text>
            <Text className="text-base text-muted text-center">
              Notlarınız, görevleriniz ve zihin haritalarınız tek bir yerde
            </Text>
          </View>

          {/* Example Card */}
          <View className="w-full max-w-sm self-center bg-surface rounded-2xl p-6 shadow-sm border border-border">
            <Text className="text-lg font-semibold text-foreground mb-2">Hoş Geldiniz</Text>
            <Text className="text-sm text-muted leading-relaxed">
              Uygulamayı kullanmaya başlamak için aşağıdaki sekmelerden birini seçin.
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="gap-4">
            <TouchableOpacity className="bg-primary px-6 py-4 rounded-xl active:opacity-80 flex-row items-center gap-3">
              <Text className="text-background font-semibold text-base">Yeni Not Oluştur</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface px-6 py-4 rounded-xl active:opacity-80 flex-row items-center gap-3 border border-border">
              <Text className="text-foreground font-semibold text-base">Yeni Görev Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
