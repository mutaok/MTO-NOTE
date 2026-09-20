import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesScreen() {
  const colors = useColors();
  const [notes, setNotes] = useState<Note[]>([]);

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center p-8">
      <View className="items-center gap-4">
        <View className="w-20 h-20 rounded-full bg-surface items-center justify-center border border-border">
          <Text className="text-4xl">📝</Text>
        </View>
        <Text className="text-xl font-semibold text-foreground">Henüz Not Yok</Text>
        <Text className="text-base text-muted text-center">
          İlk notunuzu oluşturmak için aşağıdaki butona tıklayın
        </Text>
        <TouchableOpacity 
          className="bg-primary px-8 py-3 rounded-full mt-4 active:opacity-80"
          onPress={() => {/* TODO: Navigate to create note */}}
        >
          <Text className="text-background font-semibold">Not Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNote = ({ item }: { item: Note }) => (
    <View className="bg-surface rounded-xl p-4 mb-3 border border-border">
      <Text className="text-lg font-semibold text-foreground">{item.title}</Text>
      <Text className="text-sm text-muted mt-1" numberOfLines={2}>{item.content}</Text>
      <Text className="text-xs text-muted mt-2">{item.createdAt}</Text>
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            <View className="mb-4">
              <Text className="text-2xl font-bold text-foreground">Notlarım</Text>
              <Text className="text-sm text-muted">{notes.length} not</Text>
            </View>
          }
        />
      )}
      
      {notes.length > 0 && (
        <TouchableOpacity 
          className="absolute bottom-20 right-4 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg active:opacity-80"
          onPress={() => {/* TODO: Navigate to create note */}}
        >
          <Text className="text-3xl text-background">+</Text>
        </TouchableOpacity>
      )}
    </ScreenContainer>
  );
}
