const offerTypes = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`,
];


const generateOffer = () => {
  return {
    "type": `taxi`,
    "offers": [
      {
        title: `Upgrade to a buiseness class`,
        price: 123,
      },
      {
        title: `Choose the radio station`,
        price: 322,
      },
    ]
  };
};
