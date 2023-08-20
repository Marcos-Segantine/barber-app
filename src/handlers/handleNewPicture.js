/**
 * Handles the selection of a new picture for the user's profile.
 * 
 * @param {function} setInformationNewUser - Function to set the new user information.
 * @param {object} informationNewUser - The current user information.
 */

import ImagePicker from 'react-native-image-crop-picker';

import { PermissionsAndroid } from 'react-native';

export const handleNewPicture = (setInformationNewUser, informationNewUser) => {
    // Open the image picker to select a photo
    ImagePicker.openPicker({
        mediaType: "photo",
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true

    }).then(image => {
        setInformationNewUser({ ...informationNewUser, profilePicture: image.data })
    }).catch((error) => {

        if (error.message === "Required permission missing") {

            // Request necessary camera permissions
            requestPermissionsCameraStorage()
        }
        else {
            console.log(error.message);
        }
    })
}

const requestPermissionsCameraStorage = async () => {
    try {

        // Request camera permission
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Permissão para acessar a câmera',
                message:
                    'O barberApp quer acessar sua camera',
                buttonNeutral: 'Agora não',
                buttonNegative: 'Cancelar',
                buttonPositive: 'OK',
            },
        );

        // Request storage permission
        const grantedStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
                title: 'Permissão para acessar seus arquivos',
                message:
                    'O barberApp quer acessar seus arquivos',
                buttonNeutral: 'Agora não',
                buttonNegative: 'Cancelar',
                buttonPositive: 'OK',
            },
        );

        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED && grantedStorage === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('ALL PERMISSIONS GRATED');
        } else {
            console.log('ALL PERMISSIONS DENIED');
        }
    } catch (err) {
        console.warn(err);
    }
};