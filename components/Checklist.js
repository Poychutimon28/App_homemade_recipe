import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles';

export default function Checklist({ items, numbered = false }) {
  const list = Array.isArray(items) ? items : [];
  const [checked, setChecked] = useState({});

  const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  const doneCount = list.filter((_, i) => checked[i]).length;
  const percent = list.length ? (doneCount / list.length) * 100 : 0;

  if (list.length === 0) {
    return <Text style={styles.empty}>ยังไม่มีข้อมูลในหัวข้อนี้</Text>;
  }

  return (
    <View>
      <View style={styles.progressWrap}>
        <View style={[styles.progressBar, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.progressText}>ทำแล้ว {doneCount} / {list.length} รายการ</Text>

      {list.map((item, i) => (
        <TouchableOpacity key={i} style={styles.row} activeOpacity={0.7} onPress={() => toggle(i)}>
          <Ionicons
            name={checked[i] ? 'checkbox' : 'square-outline'}
            size={24}
            color={checked[i] ? COLORS.success : COLORS.subText}
          />
          <Text style={[styles.label, checked[i] && styles.labelDone]}>
            {numbered ? `${i + 1}. ` : ''}{item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { fontSize: SIZES.small, color: COLORS.subText, paddingVertical: 8 },
  progressWrap: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressBar: { height: 8, backgroundColor: COLORS.success },
  progressText: { fontSize: SIZES.small, color: COLORS.subText, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: { flex: 1, marginLeft: 12, fontSize: SIZES.body, color: COLORS.text, lineHeight: 22 },
  labelDone: { textDecorationLine: 'line-through', color: COLORS.subText },
});