// screens/CalorieScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, COLORS, SIZES } from '../styles';

const ACTIVITY = [
  { label: 'ไม่ออกกำลังกาย', value: 1.2 },
  { label: 'ออกเบา 1-3 วัน/สัปดาห์', value: 1.375 },
  { label: 'ออกปานกลาง 3-5 วัน', value: 1.55 },
  { label: 'ออกหนัก 6-7 วัน', value: 1.725 },
];

export default function CalorieScreen() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState(1.2);
  const [result, setResult] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    // ตรวจข้อมูลก่อนคำนวณ ถ้าผิดให้เด้ง Modal เตือน
    if (!w || !h || !a) {
      setAlertMsg('กรุณากรอกน้ำหนัก ส่วนสูง และอายุให้ครบทุกช่อง');
      return;
    }
    if (w < 20 || w > 300 || h < 100 || h > 250 || a < 10 || a > 100) {
      setAlertMsg('ค่าที่กรอกอยู่นอกช่วงที่คำนวณได้ ลองตรวจสอบอีกครั้ง');
      return;
    }

    // สูตร Mifflin-St Jeor
    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * activity;
    const bmi = w / Math.pow(h / 100, 2);

    let bmiText = 'น้ำหนักปกติ';
    if (bmi < 18.5) bmiText = 'ผอมเกินเกณฑ์';
    else if (bmi >= 25 && bmi < 30) bmiText = 'น้ำหนักเกิน';
    else if (bmi >= 30) bmiText = 'อ้วน';

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
      bmi: bmi.toFixed(1),
      bmiText,
    });
  };

  const reset = () => {
    setWeight(''); setHeight(''); setAge(''); setResult(null);
  };

  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.h1}>คำนวณแคลอรีที่ควรได้รับ</Text>
      <Text style={globalStyles.body}>คำนวณด้วยสูตร Mifflin-St Jeor</Text>

      <View style={styles.card}>
        <Text style={styles.label}>เพศ</Text>
        <View style={styles.row}>
          {[{ k: 'male', t: 'ชาย', i: 'male' }, { k: 'female', t: 'หญิง', i: 'female' }].map((g) => (
            <TouchableOpacity
              key={g.k}
              style={[styles.genderBtn, gender === g.k && styles.genderActive]}
              onPress={() => setGender(g.k)}>
              <Ionicons name={g.i} size={18} color={gender === g.k ? '#fff' : COLORS.subText} />
              <Text style={[styles.genderText, gender === g.k && { color: '#fff' }]}>{g.t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>น้ำหนัก (กก.)</Text>
        <TextInput
          style={globalStyles.input}
          keyboardType="numeric"
          placeholder="เช่น 60"
          placeholderTextColor={COLORS.border}
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>ส่วนสูง (ซม.)</Text>
        <TextInput
          style={globalStyles.input}
          keyboardType="numeric"
          placeholder="เช่น 165"
          placeholderTextColor={COLORS.border}
          value={height}
          onChangeText={setHeight}
        />

        <Text style={styles.label}>อายุ (ปี)</Text>
        <TextInput
          style={globalStyles.input}
          keyboardType="numeric"
          placeholder="เช่น 20"
          placeholderTextColor={COLORS.border}
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>ระดับกิจกรรม</Text>
        {ACTIVITY.map((a) => (
          <TouchableOpacity
            key={a.value}
            style={styles.radioRow}
            onPress={() => setActivity(a.value)}>
            <Ionicons
              name={activity === a.value ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={activity === a.value ? COLORS.primary : COLORS.subText}
            />
            <Text style={styles.radioText}>{a.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={[globalStyles.button, { marginTop: 16 }]} onPress={calculate}>
          <Text style={globalStyles.buttonText}>คำนวณ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={reset} style={{ alignItems: 'center', paddingVertical: 12 }}>
          <Text style={{ color: COLORS.subText, fontSize: SIZES.small }}>ล้างข้อมูล</Text>
        </TouchableOpacity>
      </View>

      {/* ผลลัพธ์ */}
      {result && (
        <View style={styles.card}>
          <Text style={globalStyles.h2}>ผลการคำนวณ</Text>

          <View style={styles.bigBox}>
            <Text style={styles.bigLabel}>พลังงานที่ควรได้รับต่อวัน</Text>
            <Text style={styles.bigNumber}>{result.tdee}</Text>
            <Text style={styles.bigUnit}>kcal / วัน</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultKey}>BMR (เผาผลาญขณะพัก)</Text>
            <Text style={styles.resultVal}>{result.bmr} kcal</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultKey}>ถ้าต้องการลดน้ำหนัก</Text>
            <Text style={styles.resultVal}>{result.lose} kcal</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultKey}>ถ้าต้องการเพิ่มน้ำหนัก</Text>
            <Text style={styles.resultVal}>{result.gain} kcal</Text>
          </View>
          <View style={[styles.resultRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.resultKey}>ค่า BMI</Text>
            <Text style={styles.resultVal}>{result.bmi} ({result.bmiText})</Text>
          </View>

          <Text style={styles.note}>
            * ค่าประมาณเบื้องต้นเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์
          </Text>
        </View>
      )}

      <View style={{ height: 30 }} />

      {/* Modal แจ้งเตือนเมื่อกรอกข้อมูลไม่ครบ */}
      <Modal visible={!!alertMsg} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.alertBox}>
            <Ionicons name="alert-circle" size={44} color={COLORS.primary} />
            <Text style={[globalStyles.h2, { marginTop: 10, textAlign: 'center' }]}>
              กรอกข้อมูลไม่ครบ
            </Text>
            <Text style={[globalStyles.body, { textAlign: 'center', marginVertical: 8 }]}>
              {alertMsg}
            </Text>
            <TouchableOpacity
              style={[globalStyles.button, { width: '100%' }]}
              onPress={() => setAlertMsg('')}>
              <Text style={globalStyles.buttonText}>เข้าใจแล้ว</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SIZES.padding,
    marginTop: SIZES.padding,
  },
  label: { fontSize: SIZES.small, fontWeight: '600', color: COLORS.text, marginBottom: 6, marginTop: 6 },
  row: { flexDirection: 'row', marginBottom: 8 },
  genderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  genderActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  genderText: { marginLeft: 6, color: COLORS.subText, fontWeight: '600' },
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9 },
  radioText: { marginLeft: 10, color: COLORS.text, fontSize: SIZES.body },
  bigBox: {
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    borderRadius: SIZES.radius,
    paddingVertical: 20,
    marginVertical: 12,
  },
  bigLabel: { fontSize: SIZES.small, color: COLORS.subText },
  bigNumber: { fontSize: 48, fontWeight: 'bold', color: COLORS.primary, lineHeight: 56 },
  bigUnit: { fontSize: SIZES.small, color: COLORS.subText },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultKey: { color: COLORS.subText, fontSize: SIZES.body, flex: 1 },
  resultVal: { color: COLORS.text, fontSize: SIZES.body, fontWeight: 'bold' },
  note: { fontSize: SIZES.small, color: COLORS.subText, marginTop: 12, fontStyle: 'italic' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  alertBox: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 24,
    alignItems: 'center',
  },
});