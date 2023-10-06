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

import { PermissionsAndroid } from 'react-native';

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
        }).catch((error) => {

            if (error.message === "Required permission missing") {

                // Request necessary camera permissions
                requestPermissionsCameraStorage(setModalInfo, setModalInformative, setSomethingWrong)
            }
            else {
                console.log(error.message);
            }
        })
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleNewPicture", message)
    }
}

const requestPermissionsCameraStorage = async (setModalInfo, setModalInformative, setSomethingWrong) => {
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

        if (!(grantedCamera === PermissionsAndroid.RESULTS.GRANTED && grantedStorage === PermissionsAndroid.RESULTS.GRANTED)) {

            setModalInfo({
                image: <StopProcessError />,
                mainMessage: "Permissões negadas",
                message: "Parece que você não nos concedeu as devidas permissões para acessar a sua câmera e seus arquivos. Por favor va até as configurações do seu dispositivo e ative-as.",
                firstButtonText: "Ok",
                firstButtonAction: () => setModalInfo(null),
                secondButtonText: "Como fazer?",
                secondButtonAction: () => {
                    setModalInfo(null)
                    setModalInformative({
                        mainMessage: "Siga o passo a passo de como ativar as permissões",
                        content:
                            (<View>
                                <Text style={{ color: "#00000090", fontSize: globalStyles.fontSizeVerySmall }}>Estes passos podem ser um pouco diferente dependendo do seu dispositivo.</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>1 - Abra as configurações de seu dispositivo.</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>2 - Procure por "Aplicativos" ou "Apps" no campo de pesquisa (geralmente o campo de pesquisa fica no topo da tela).</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>3 - Clique em "Gerenciar apps"(ou algo semelhante a isso).</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>4 - Procure pelo aplicativo "Barber" e clique nele.</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>5 - Agora clique em "Permissões".</Text>
                                <Text style={{ color: "#000000", marginTop: 10 }}>6 - Ative as permissões de câmera e de armazenamento.</Text>
                            </View>)
                        ,
                        firstButtonText: "Ok",
                        firstButtonAction: () => setModalInformative(null),
                    })
                }
            })
        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("requestPermissionsCameraStorage", message)
    }
};