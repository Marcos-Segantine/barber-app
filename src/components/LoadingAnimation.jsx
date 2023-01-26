import {ActivityIndicator, View, Platform} from 'react-native';

export const LoadingAnimation = () => {
  const os = Platform.OS;

  return (
    <View style={{marginTop: '20%'}}>
      <ActivityIndicator
        size={os === 'android' ? 100 : 'large'}
        color="#E95401"
      />
    </View>
  );
};
