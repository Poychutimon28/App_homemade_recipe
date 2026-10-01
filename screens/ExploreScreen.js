import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { globalStyles, COLORS } from '../styles';
import { RECIPES } from '../data/recipes';

export default function ExploreScreen({ navigation }) {
  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={globalStyles.card}
      onPress={() => navigation.navigate('Detail', { recipe: item })}>
      <Image
        source={typeof item.cover === 'string' ? { uri: item.cover } : item.cover}
        style={globalStyles.cardImage}
      />
      
      <View style={globalStyles.cardBody}>
        <Text style={globalStyles.h2}>{item.name}</Text>
        <Text style={globalStyles.body}>
          ⏱ {item.time}  •  🔥 {item.kcal} kcal
        </Text>
        <View style={globalStyles.badge}>
          <Text style={globalStyles.badgeText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.screen}>
      <FlatList
        data={RECIPES}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={globalStyles.container}
        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <Text style={globalStyles.h1}>วันนี้อยากทำอะไรดี?</Text>
            <Text style={globalStyles.body}>เมนูทำง่ายที่บ้าน ใช้อุปกรณ์น้อยชิ้น</Text>
          </View>
        }
      />
    </View>
  );
}