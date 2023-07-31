import ImagePicker from 'react-native-image-crop-picker';

import { PermissionsAndroid } from 'react-native';

export const handleNewPicture = (setInformationNewUser, informationNewUser) => {
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
            requestPermissionsCameraImage()
        }
        else {
            console.log(error.message);
        }
    })
}

const requestPermissionsCameraImage = async () => {
    try {
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        const grantedStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
                title: 'Cool Photo App Storage Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
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