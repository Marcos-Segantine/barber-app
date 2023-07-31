export const verifyScreenName = (stateNavigation, setSomethingWrong) => {
  try {
    return stateNavigation?.routes[stateNavigation.index].name

  } catch (error) {
    console.log(error);
    setSomethingWrong(true)
  }
}