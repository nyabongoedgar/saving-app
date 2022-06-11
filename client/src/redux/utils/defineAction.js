// return an object containing key value pairs, keys are action options and
// values are concatenated strings comprising of the action and option
const defineAction = (constant, options) => {
  const methods = {};
  options.forEach((option) => {
    methods[option] = `${constant}_${option}`;
  });
  return methods;
};

export default defineAction;
