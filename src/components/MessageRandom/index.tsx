import React, { useState, useEffect } from 'react';
import randomResource from './resources';
import { PixelRatio, Text } from 'react-native';

import { Container, Image, NameHolder } from './styles';

const MessageRandom: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    setInterval(() => {
      const maxInterval = randomResource.length;
      const randomIndex = randomFromInterval(1, maxInterval);
      setImageIndex(randomIndex);
    }, 10000)
  }, []);

  const randomFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <Container>
      <Image source={randomResource[imageIndex - 1].img} resizeMode="cover" borderRadius={1000 / PixelRatio.get()}></Image>
      <NameHolder>
        <Text style={{
          fontFamily: 'RobotoSlab-Medium',
          color: '#fff',
          fontSize: 16
        }}>{randomResource[imageIndex - 1].name}</Text>
        <Text style={{
          fontFamily: 'RobotoSlab-Regular',
          color: '#fff',
          fontSize: 12
        }}>{randomResource[imageIndex - 1].message}</Text>
      </NameHolder>
    </Container>
  );
}

export default MessageRandom;