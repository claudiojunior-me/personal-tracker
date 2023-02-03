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
  const { habit } = route.params
  console.log(habit)

  const [formData, setData] = React.useState<THabit>({
    _id: habit?._id || '',
    name: habit?.name || '',
    color: habit?.color || customSwatches[0]
  });
  const [errors, setErrors] = React.useState({});
  const { addNewHabit } = useHabits()

  const validate = () => {
    if (formData.name === '') {
      setErrors({
        ...errors,
        name: 'Name is required'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short'
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validate()) {
      console.log('Validation Failed')
      return
    }
    console.log('send this: ', formData)
    addNewHabit(formData)
    navigation.goBack()
    // validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
    setData({ ...formData, color: hex })
  };

  return (
    <Center flex={1}>
      <VStack width='90%' marginX='3' maxW='300px'>
        <FormControl isRequired isInvalid={'name' in errors}>
          <FormControl.Label _text={{ bold: true }}>Qual o hábito?</FormControl.Label>
          <Input placeholder="Ler 1 capítulo por dia" value={formData.name} onChangeText={value => setData({
            ...formData,
            name: value
          })} />
          {
            'name' in errors ?
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> :
              <FormControl.HelperText>
                Name should contain at least 3 character.
              </FormControl.HelperText>
          }
        </FormControl>

        <Box>
          <ColorPicker style={{ height: 45 }} value={formData.color} onComplete={onSelectColor}>
            <Preview />
            <Swatches colors={customSwatches} />
          </ColorPicker>
        </Box>


        <Button onPress={onSubmit} marginTop="10" colorScheme="cyan">
          Submit
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
