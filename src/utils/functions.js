const safeParseJson = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.log('safeParseJson', error);
    return false;
  }
};

export {safeParseJson};
