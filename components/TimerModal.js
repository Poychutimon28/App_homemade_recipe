import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, globalStyles } from '../styles';

export default function TimerModal({ visible, onClose }) {
  const [seconds, setSeconds] = useState(300); // เริ่มที่ 5 นาที
  const [running, setRunning] = useState(false);

  // นับถอยหลังทุก 1 วินาทีเมื่อกดเริ่ม
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id); // เคลียร์ทิ้งกัน memory leak
  }, [running]);

  const format = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const preset = (min) => {
    setRunning(false);
    setSeconds(min * 60);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.subText} />
          </TouchableOpacity>

          <Text style={globalStyles.h2}>⏲ จับเวลาทำอาหาร</Text>
          <Text style={styles.clock}>{format(seconds)}</Text>

          {seconds === 0 && <Text style={styles.done}>หมดเวลาแล้ว! เช็กอาหารด่วน</Text>}

          <View style={styles.presetRow}>
            {[3, 5, 10, 20].map((m) => (
              <TouchableOpacity key={m} style={styles.preset} onPress={() => preset(m)}>
                <Text style={styles.presetText}>{m} น.</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[globalStyles.button, { width: '100%', marginTop: 8 }]}
            onPress={() => setRunning(!running)}>
            <Text style={globalStyles.buttonText}>
              {running ? 'หยุดชั่วคราว' : 'เริ่มจับเวลา'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  box: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 12, right: 12, zIndex: 2 },
  clock: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 12,
    fontVariant: ['tabular-nums'],
  },
  done: { color: COLORS.success, fontWeight: 'bold', marginBottom: 8 },
  presetRow: { flexDirection: 'row', marginBottom: 12 },
  preset: {
    backgroundColor: COLORS.bg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  presetText: { color: COLORS.text, fontSize: SIZES.small, fontWeight: '600' },
});