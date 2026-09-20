import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center p-8">
      <View className="items-center gap-4">
        <View className="w-20 h-20 rounded-full bg-surface items-center justify-center border border-border">
          <Text className="text-4xl">✅</Text>
        </View>
        <Text className="text-xl font-semibold text-foreground">Henüz Görev Yok</Text>
        <Text className="text-base text-muted text-center">
          İlk görevinizi oluşturmak için aşağıdaki butona tıklayın
        </Text>
        <TouchableOpacity 
          className="bg-primary px-8 py-3 rounded-full mt-4 active:opacity-80"
          onPress={() => {/* TODO: Navigate to create task */}}
        >
          <Text className="text-background font-semibold">Görev Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity 
      onPress={() => toggleTask(item.id)}
      className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center gap-3"
    >
      <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${item.completed ? 'bg-success border-success' : 'border-border'}`}>
        {item.completed && <Text className="text-background">✓</Text>}
      </View>
      <View className="flex-1">
        <Text className={`text-base ${item.completed ? 'line-through text-muted' : 'text-foreground'}`}>{item.title}</Text>
        {item.dueDate && <Text className="text-xs text-muted mt-1">{item.dueDate}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-4">
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            <View className="mb-4">
              <Text className="text-2xl font-bold text-foreground">Görevlerim</Text>
              <Text className="text-sm text-muted">{tasks.filter(t => !t.completed).length} aktif görev</Text>
            </View>
          }
        />
      )}
      
      {tasks.length > 0 && (
        <TouchableOpacity 
          className="absolute bottom-20 right-4 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg active:opacity-80"
          onPress={() => {/* TODO: Navigate to create task */}}
        >
          <Text className="text-3xl text-background">+</Text>
        </TouchableOpacity>
      )}
    </ScreenContainer>
  );
}
