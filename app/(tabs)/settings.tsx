import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function SettingsScreen() {
  const colors = useColors();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const SettingItem = ({ 
    title, 
    subtitle, 
    rightElement,
    onPress 
  }: { 
    title: string; 
    subtitle?: string; 
    rightElement?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-surface rounded-xl p-4 mb-2 border border-border flex-row items-center justify-between"
      disabled={!onPress}
    >
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{title}</Text>
        {subtitle && <Text className="text-sm text-muted mt-0.5">{subtitle}</Text>}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text className="text-sm font-semibold text-muted uppercase mt-6 mb-2 ml-1">{title}</Text>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mb-4">
          <Text className="text-2xl font-bold text-foreground">Ayarlar</Text>
        </View>

        {/* Profil */}
        <SectionHeader title="Hesap" />
        <SettingItem 
          title="Profil Bilgileri" 
          subtitle="Hesap bilgilerinizi düzenleyin"
          rightElement={<Text className="text-muted">›</Text>}
          onPress={() => {}}
        />

        {/* Görünüm */}
        <SectionHeader title="Görünüm" />
        <SettingItem 
          title="Karanlık Mod" 
          subtitle="Uygulamayı karanlık temada kullan"
          rightElement={
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: colors.tint }}
              thumbColor="#f4f3f4"
            />
          }
        />

        {/* Bildirimler */}
        <SectionHeader title="Bildirimler" />
        <SettingItem 
          title="Bildirimler" 
          subtitle="Görev ve hatırlatma bildirimleri"
          rightElement={
            <Switch 
              value={notifications} 
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: colors.tint }}
              thumbColor="#f4f3f4"
            />
          }
        />

        {/* Genel */}
        <SectionHeader title="Genel" />
        <SettingItem 
          title="Dil" 
          subtitle="Türkçe"
          rightElement={<Text className="text-muted">›</Text>}
          onPress={() => {}}
        />
        <SettingItem 
          title="Veri Yedekleme" 
          subtitle="Verilerinizi yedekleyin veya geri yükleyin"
          rightElement={<Text className="text-muted">›</Text>}
          onPress={() => {}}
        />

        {/* Hakkında */}
        <SectionHeader title="Hakkında" />
        <SettingItem 
          title="Gizlilik Politikası" 
          rightElement={<Text className="text-muted">›</Text>}
          onPress={() => {}}
        />
        <SettingItem 
          title="Kullanım Şartları" 
          rightElement={<Text className="text-muted">›</Text>}
          onPress={() => {}}
        />
        <SettingItem 
          title="Uygulama Sürümü" 
          subtitle="1.0.0"
        />

        {/* Çıkış */}
        <TouchableOpacity 
          className="bg-error/10 rounded-xl p-4 mt-6 border border-error/20 items-center"
          onPress={() => {}}
        >
          <Text className="text-error font-semibold">Çıkış Yap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="mt-3 items-center pb-8"
          onPress={() => {}}
        >
          <Text className="text-muted text-sm">Hesabı Sil</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}
