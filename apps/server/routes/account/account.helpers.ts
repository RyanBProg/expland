export const travelFullSelect = {
  id: true,
  description: true,
  dateTravel: true,
  duration: true,
  country: {
    select: {
      id: true,
      iso_2: true,
      name: true,
      continents: true,
      independent: true,
      latitude: true,
      longitude: true,
    },
  },
  cities: {
    select: {
      city: {
        select: {
          id: true,
          name: true,
          countryId: true,
          country_iso_2: true,
          latitude: true,
          longitude: true,
          state: true,
          county: true,
        },
      },
    },
  },
  createdAt: true,
  updatedAt: true,
};

export const travelPreviewSelect = {
  id: true,
  dateTravel: true,
  country: {
    select: {
      id: true,
      iso_2: true,
      name: true,
      continents: true,
      independent: true,
    },
  },
  createdAt: true,
};
