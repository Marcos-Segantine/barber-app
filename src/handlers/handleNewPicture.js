/**
 * Handles the selection of a new picture for the user's profile.
 * 
 * @param {function} setInformationNewUser - Function to set the new user information.
 * @param {object} informationNewUser - The current user information.
 * @param {function} setModalInfo - Function to set the modal info.
 * @param {function} setModalInformative - Function to set the modal informative.
 */

import { View, Text } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import { Platform } from 'react-native';

import { request, PERMISSIONS } from 'react-native-permissions';

import { StopProcessError } from '../assets/imgs/StopProcessError';
import { globalStyles } from '../assets/globalStyles';

import { handleError } from './handleError';

export const handleNewPicture = (
    setInformationNewUser,
    informationNewUser,
    setModalInfo,
    setModalInformative,
    setSomethingWrong

) => {
    try {

        // Open the image picker to select a photo
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true

        }).then(image => {
            setInformationNewUser({ ...informationNewUser, profilePicture: image.data })
        }).catch(({ message }) => {

            if (message === "Required permission missing") {

                // Request necessary camera permissions
                requestPermissionsCameraStorage(setModalInfo, setModalInformative, setSomethingWrong)
            }
            else if (Platform.OS === "ios" && message === "User did not grant library permission.") {
                requestPermissionsCameraStorage(setModalInfo, setModalInformative, setSomethingWrong)
            }
            else if (Platform.OS === "ios" && message === "User cancelled image selection") {
                return
            }
            else {
                console.log("COME HERE");
                console.log(message);
                setSomethingWrong(true)
                handleError("handleNewPicture", message)
            }
        })
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleNewPicture", message)
    }
}

const requestPermissionsCameraStorage = async (setModalInfo, setModalInformative, setSomethingWrong) => {
    try {
        const cameraPermission = Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
        });

        const storagePermission = Platform.select({
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        });

        // Request camera permission
        const grantedCamera = await request(cameraPermission);

        // Request storage permission
        const grantedStorage = await request(storagePermission);

        if (!(grantedCamera === 'granted' && grantedStorage === 'granted')) {
            setModalInfo({
                image: <StopProcessError />,
                mainMessage: "Permissões negadas",
                message: "Parece que você não nos concedeu as devidas permissões para acessar a sua câmera e seus arquivos. Por favor, vá até as configurações do seu dispositivo e ative-as.",
                firstButtonText: "Ok",
                firstButtonAction: () => setModalInfo(null),
                secondButtonText: "Como fazer?",
                secondButtonAction: () => {
                    setModalInfo(null)
                    setModalInformative({
                        mainMessage: "Siga o passo a passo de como ativar as permissões",
                        content: (
                            <View>
                                <Text style={{ color: "#00000090", fontSize: globalStyles.fontSizeVerySmall }}>Estes passos podem ser um pouco diferentes dependendo do seu dispositivo.</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>1 - Abra as configurações de seu dispositivo.</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>2 - {Platform.OS === 'ios' ? 'Procure por "Privacidade" e clique nele.' : 'Procure por "Aplicativos" ou "Apps" no campo de pesquisa (geralmente o campo de pesquisa fica no topo da tela).'} </Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>3 - {Platform.OS === 'ios' ? 'Clique em "Câmera" e ative a permissão para o aplicativo Barber.' : 'Clique em "Gerenciar apps" (ou algo semelhante a isso).'} </Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>4 - {Platform.OS === 'ios' ? 'Volte para "Privacidade" e clique em "Fotos".' : 'Procure pelo aplicativo "Barber" e clique nele.'}</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>5 - {Platform.OS === 'ios' ? 'Selecione "Todos as Fotos" e ative a permissão para o aplicativo Barber.' : 'Agora clique em "Permissões".'}</Text>
                            </View>
                        ),
                        firstButtonText: "Ok",
                        firstButtonAction: () => setModalInformative(null),
                    })
                }
            });
        }

    } catch ({ message }) {
        setSomethingWrong(true);
        handleError("requestPermissionsCameraStorage", message);
    }
};
