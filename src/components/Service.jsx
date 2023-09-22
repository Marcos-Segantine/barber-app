/**
 * Renders a service component with selectable functionality.
 * @param {Object} service - The service object to render.
 * @param {Array} servicesSelected - The array of selected services.
 * @param {Function} setServicesSelected - The function to set the selected services.
 * @param {Function} removeServiceSelected - The function to remove a selected service.
 * @returns {JSX.Element} The rendered service component.
 */

import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { globalStyles } from "../assets/globalStyles";
import { formatServicePrice } from "../utils/formatServicePrice";

export const Service = ({
  service,
  servicesSelected,
  setServicesSelected,
  removeServiceSelected,
}) => {

  /**
 * Handles the selection or removal of a service.
 * @param {Object} service - The service object.
 */
  const handleSelectServices = (service) => {
    let isServiceSelected = null;

    for (const currentService of servicesSelected) {
      if (currentService.name === service.name) isServiceSelected = true;
    }

    if (servicesSelected.length >= 4 && isServiceSelected === null) return;

    if (isServiceSelected) {
      removeServiceSelected(service.name);

      return;
    }

    setServicesSelected([...servicesSelected, service]);
  };

  // Determine the style of the container based on whether the service is selected
  const style = servicesSelected.map(service => service.name).includes(service.name)
    ? [styles.container, { borderColor: globalStyles.orangeColor }]
    : styles.container;

  const servicePrice = formatServicePrice(service.price)

  return (
    <TouchableOpacity
      style={style}
      onPress={() => handleSelectServices(service)}
    >
      <Text style={styles.serviceName}>{service.name}</Text>

      <Text style={styles.price}>+ {servicePrice}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#00000010",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  serviceName: {
    fontSize: globalStyles.fontSizeSmall,
    color: "#000000",
    fontFamily: globalStyles.fontFamilyBold,
  },

  price: {
    color: globalStyles.orangeColor,
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeSmall,
  },
});
