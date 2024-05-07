import React, { useState } from 'react';
import { Image } from 'react-native';

const Img = () => {
  return (
    <Image
      source={{
        uri: 'https://s.gravatar.com/avatar/fa0a10fa9a29fa8f8fb41350b985573f?s=480&r=pg&d=https%3A%2F%2Fstorage.googleapis.com%2Fexpo-website-default-avatars%2Fm-2x.png',
      }}
      style={{
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 100,
      }}
    />
  );
};

export default Img;
