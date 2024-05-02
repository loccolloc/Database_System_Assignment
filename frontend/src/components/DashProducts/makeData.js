// makeData.js
export const fakeData = Array.from({ length: 100 }, (_, index) => ({
  id: `id_${index}`,
  firstName: `FirstName_${index}`,
  lastName: `LastName_${index}`,
  state: `State_${index % 50}`,
  image: 'https://product.hstatic.net/1000075078/product/1686716537_dd-latte_785591205184481597a2a79b9331e03b.jpg',
  // assuming 50 states, this will cycle through 'State_0' to 'State_49'
}));

export const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];
