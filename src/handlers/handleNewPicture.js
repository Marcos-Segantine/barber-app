import { launchImageLibrary } from 'react-native-image-picker';

export const handleNewPicture = (setInformationNewUser, informationNewUser) => {
    const options = {
        mediaType: 'photo',
        includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
        if (response.assets && response.assets.length > 0) {
            const pathPic = response.assets[0]?.base64;

            if (pathPic) setInformationNewUser({ ...informationNewUser, profilePicture: pathPic });
        }
    });
}