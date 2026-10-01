import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles';

export default function ImageCarousel({ images = [] }) {
  const [active, setActive] = useState(0);
  const [boxW, setBoxW] = useState(0); // ความกว้างจริงของกล่อง
  const scrollRef = useRef(null);

  if (images.length === 0) return null;

  const goTo = (index) => {
    const i = Math.max(0, Math.min(index, images.length - 1));
    setActive(i);
    scrollRef.current?.scrollTo({ x: i * boxW, animated: true });
  };

  const onScrollEnd = (e) => {
    if (!boxW) return;
    setActive(Math.round(e.nativeEvent.contentOffset.x / boxW));
  };

  return (
    <View onLayout={(e) => setBoxW(e.nativeEvent.layout.width)}>
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          scrollEventThrottle={16}>
          {images.map((img, i) => (
            <View key={i} style={{ width: boxW }}>
              <Image
                source={typeof img === 'string' ? { uri: img } : img}
                style={[styles.image, { width: boxW }]}
                resizeMode="cover"
              />
              <View style={styles.counter}>
                <Text style={styles.counterText}>ขั้นที่ {i + 1}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ปุ่มลูกศร ใช้ได้ทั้งเว็บและมือถือ */}
        {active > 0 && (
          <TouchableOpacity style={[styles.arrow, { left: 8 }]} onPress={() => goTo(active - 1)}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
        )}
        {active < images.length - 1 && (
          <TouchableOpacity style={[styles.arrow, { right: 8 }]} onPress={() => goTo(active + 1)}>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.dotRow}>
        {images.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => goTo(i)}>
            <View style={[styles.dot, active === i && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { height: 200, borderRadius: SIZES.radius },
  counter: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  counterText: { color: '#fff', fontSize: SIZES.small, fontWeight: '600' },
  arrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border, marginHorizontal: 4 },
  dotActive: { backgroundColor: COLORS.primary, width: 20 },
});