import React, { useState } from 'react';
import { View, Text, Modal, Pressable, Image } from 'react-native';
import Overlay from '../dashboard/overlay';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (option: string) => {
    setIsVisible(false);
    onSelect(option);
  };

  return (
    <View className='flex w-full '>
      <Pressable className="bg-[#F2F9FF]  rounded p-2 pr-3 mt-[12px] h-[36px] w-full flex flex-row items-center justify-between" onPress={() => setIsVisible(true)}>
        <Text className='text-[18px] text-[#1F375D]'>Select</Text>
        <Image className="" source={require('../../../assets/arrow-up.png')} style={{ width: 16, height: 16 }} />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <Overlay/>
        <View  className="flex items-center justify-center h-full">
          <View className="bg-white w-3/4 rounded-lg flex">
            {options.map((option, index) => (
              <Pressable className="border-b-[.3px] border-b-[#cbdbe9] rounded py-4 px-3 mt-[0px] w-full flex flex-row items-center justify-between" key={index} onPress={() => handleSelect(option)}>
                <Text  className='text-[18px] text-[#1F375D]'>{option}</Text>
              </Pressable>
            ))}
            <Pressable  className="bg-[#D5E0F1] border-b-[.9px] border-b-[#cbdbe9] rounded py-4 px-3 mt-[0px] w-full flex flex-row items-center justify-between"  onPress={() => setIsVisible(false)}>
              <Text  className='text-[18px] text-[#1F375D]'>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;