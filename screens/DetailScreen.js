// screens/DetailScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, COLORS, SIZES } from '../styles';
import ImageCarousel from '../components/ImageCarousel';
import Checklist from '../components/Checklist';
import TimerModal from '../components/TimerModal';

export default function DetailScreen({ route }) {
  const { recipe } = route.params;
  const [timerOpen, setTimerOpen] = useState(false);

  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <Image
          source={typeof recipe.cover === 'string' ? { uri: recipe.cover } : recipe.cover}
          style={[globalStyles.cardImage, { borderRadius: SIZES.radius }]}
        />

        <Text style={[globalStyles.h1, { marginTop: 16 }]}>{recipe.name}</Text>
        <Text style={globalStyles.body}>
          ⏱ {recipe.time}  •  🔥 {recipe.kcal} kcal  •  {recipe.category}
        </Text>

        {/* ปุ่มเปิด Modal จับเวลา */}
        <TouchableOpacity style={styles.timerBtn} onPress={() => setTimerOpen(true)}>
          <Ionicons name="timer-outline" size={20} color="#fff" />
          <Text style={styles.timerText}>เปิดตัวจับเวลา</Text>
        </TouchableOpacity>

        {/* Component 1: Interactive Checklist - วัตถุดิบ */}
        <View style={styles.section}>
          <Text style={globalStyles.h2}>🧺 วัตถุดิบที่ต้องเตรียม</Text>
          <Checklist items={recipe.ingredients} />
        </View>

        {/* Component 2: Carousel - รูปขั้นตอน */}
        <View style={styles.section}>
          <Text style={globalStyles.h2}>📸 ภาพขั้นตอนการทำ</Text>
          <Text style={[globalStyles.body, { marginBottom: 10 }]}>เลื่อนซ้าย-ขวาเพื่อดูทีละขั้น</Text>
          <ImageCarousel images={recipe.steps_img} />
        </View>

        {/* Checklist อีกชุด - ขั้นตอนการทำ */}
        <View style={styles.section}>
          <Text style={globalStyles.h2}>👨‍🍳 วิธีทำ</Text>
          <Checklist items={recipe.steps} numbered />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Component 3: Modal Pop-up */}
      <TimerModal visible={timerOpen} onClose={() => setTimerOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    marginTop: 14,
  },
  timerText: { color: '#fff', fontWeight: 'bold', fontSize: SIZES.h2, marginLeft: 8 },
});