// screens/RandomScreen.js
import React, { useState, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Animated, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, COLORS, SIZES } from '../styles';
import { RECIPES } from '../data/recipes';

const FILTERS = ['ทั้งหมด', 'Air Fryer', 'Drink'];

export default function RandomScreen() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('ทั้งหมด');
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;

  const pool = filter === 'ทั้งหมด' ? RECIPES : RECIPES.filter((r) => r.category === filter);

  const roll = () => {
    if (pool.length === 0) return;
    setRolling(true);
    fade.setValue(0);

    // สลับเมนูไปมาให้ดูเหมือนกำลังสุ่ม แล้วค่อยหยุด
    let count = 0;
    const spin = setInterval(() => {
      setResult(pool[Math.floor(Math.random() * pool.length)]);
      count += 1;
      if (count > 8) {
        clearInterval(spin);
        setRolling(false);
        Animated.timing(fade, { toValue: 1, duration: 350, useNativeDriver: true }).start();
      }
    }, 90);
  };

  const goDetail = () => {
    // ข้ามไป Tab แรก แล้วเปิดหน้า Detail ใน Stack ของ Tab นั้น
    navigation.navigate('Explore', { screen: 'Detail', params: { recipe: result } });
  };

  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.h1}>วันนี้กินอะไรดี?</Text>
      <Text style={globalStyles.body}>เลือกหมวดแล้วกดปุ่มให้เราช่วยตัดสินใจ</Text>

      {/* ตัวกรองหมวด */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.chipActive]}
            onPress={() => { setFilter(f); setResult(null); }}>
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* กล่องผลลัพธ์ */}
      <View style={styles.resultBox}>
        {!result ? (
          <View style={styles.placeholder}>
            <Ionicons name="dice-outline" size={64} color={COLORS.border} />
            <Text style={[globalStyles.body, { marginTop: 8 }]}>ยังไม่ได้สุ่ม</Text>
          </View>
        ) : (
          <Animated.View style={{ opacity: rolling ? 0.5 : fade }}>
            <Image
              source={typeof result.cover === 'string' ? { uri: result.cover } : result.cover}
              style={styles.resultImage}
            />
            <Text style={[globalStyles.h2, { marginTop: 12 }]}>{result.name}</Text>
            <Text style={globalStyles.body}>
              ⏱ {result.time}  •  🔥 {result.kcal} kcal  •  {result.category}
            </Text>

            {!rolling && (
              <TouchableOpacity style={styles.detailBtn} onPress={goDetail}>
                <Text style={styles.detailText}>ดูวิธีทำเมนูนี้</Text>
                <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </Animated.View>
        )}
      </View>

      <TouchableOpacity
        style={[globalStyles.button, rolling && { opacity: 0.6 }]}
        onPress={roll}
        disabled={rolling}>
        <Text style={globalStyles.buttonText}>
          {rolling ? 'กำลังสุ่ม...' : result ? 'สุ่มใหม่อีกครั้ง' : 'สุ่มเมนูเลย!'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.hint}>มีเมนูในหมวดนี้ {pool.length} รายการ</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', marginVertical: 16, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.subText, fontWeight: '600', fontSize: SIZES.small },
  chipTextActive: { color: '#fff' },
  resultBox: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    minHeight: 260,
    justifyContent: 'center',
  },
  placeholder: { alignItems: 'center', paddingVertical: 40 },
  resultImage: { width: '100%', height: 180, borderRadius: SIZES.radius },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  detailText: { color: COLORS.primary, fontWeight: 'bold', marginRight: 6, fontSize: SIZES.body },
  hint: { textAlign: 'center', fontSize: SIZES.small, color: COLORS.subText, marginTop: 10 },
});