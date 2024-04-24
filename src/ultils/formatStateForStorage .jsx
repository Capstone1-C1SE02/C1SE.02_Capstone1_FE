const formatStateForStorage = (state) => {
  const formattedState = {};

  for (const key in state) {
    if (key === "_persist") {
      // Skip the _persist property
      continue;
    }

    // Try parsing the string as JSON (assuming nested objects)
    try {
      formattedState[key] = JSON.parse(state[key]);
    } catch (error) {
      // If parsing fails, treat it as a plain string
      formattedState[key] = state[key];
    }
  }

  return formattedState;
};

export default formatStateForStorage;
