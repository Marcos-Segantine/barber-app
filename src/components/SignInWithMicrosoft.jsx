import {Path, Svg} from 'react-native-svg';

import {Pressable, StyleSheet} from 'react-native';

export const SignInWithMicrosoft = () => {
  return (
    <Pressable style={style.button}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="80px"
        height="80px">
        <Path fill="#ff5722" d="M22 22H6V6h16z" />
        <Path fill="#4caf50" d="M42 22H26V6h16z" />
        <Path fill="#ffc107" d="M42 42H26V26h16z" />
        <Path fill="#03a9f4" d="M22 42H6V26h16z" />
      </Svg>
    </Pressable>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
});
