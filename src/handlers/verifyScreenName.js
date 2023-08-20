/**
 * Retrieve the name of the current screen from the state navigation.
 * 
 * @param {object} stateNavigation - The state navigation object.
 * @param {function} setSomethingWrong - The function to set the 'somethingWrong' flag.
 * @returns {string} - The name of the current screen.
 */

export const verifyScreenName = (stateNavigation, setSomethingWrong) => {
  try {
    return stateNavigation?.routes[stateNavigation.index].name

  } catch (error) {
    console.log(error);
    setSomethingWrong(true)
  }
}