import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Box, Button, Center, FormControl, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import ColorPicker, { HueSlider, OpacitySlider, Panel1, Preview, Swatches } from 'reanimated-color-picker';
import { useHabits } from 'src/context/habits.context';
import { RootStackParamList } from 'src/types';
import { THabit } from 'src/types/habit';

const customSwatches = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];

type ModalScreenProps = NativeStackScreenProps<RootStackParamList, 'Modal'>

export default function ModalScreen({ navigation, route }: ModalScreenProps) {
  const { habit: habitForEdit } = route.params

  navigation.setOptions({
    title: habitForEdit?._id ? 'Editar Hábito' : 'Novo Hábito'
  })

  const [formData, setData] = React.useState<THabit>({
    _id: habitForEdit?._id || '',
    name: habitForEdit?.name || '',
    color: habitForEdit?.color || customSwatches[0]
  });
  const [errors, setErrors] = React.useState({});
  const { addNewHabit } = useHabits()

  const validate = () => {
    if (formData.name === '') {
      setErrors({
        ...errors,
        name: 'Informe o nome do hábito'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'O nome do hábito deve conter ao menos 3 letras'
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validate()) {
      return
    }

    addNewHabit(formData)
    navigation.goBack()
  };

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    setData({ ...formData, color: hex })
  };

  return (
    <Center flex={1}>
      <VStack width='90%' marginX='3' maxW='300px' space={8}>
        <FormControl isRequired isInvalid={'name' in errors}>
          <FormControl.Label _text={{ bold: true }}>Qual o hábito?</FormControl.Label>
          <Input rounded='full' placeholder="Ler 1 capítulo do livro por dia" value={formData.name} onChangeText={value => setData({
            ...formData,
            name: value
          })} />
          {
            'name' in errors &&
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
          }
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ bold: true }}>Selecione uma cor pra representar o hábito</FormControl.Label>
          <Center flex={1} marginY={50}>
            <Box backgroundColor={formData.color} height={60} width={60} borderRadius={10} />
            <ColorPicker style={{ height: 45, marginTop: 10 }} value={formData.color} onComplete={onSelectColor}>
              <Swatches colors={customSwatches} />
            </ColorPicker>
          </Center>
        </FormControl>

        <Button onPress={onSubmit} rounded='full' marginTop="10" backgroundColor='base.primary'>
          {habitForEdit?._id ? 'Atualizar' : 'Criar'}
        </Button>
      </VStack>
    </Center >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
