export interface Weather {
  location: {
    name: string;
    country: string;
  },
  current: {
    temp_c: number;
    condition: {
      icon: string;
    }
  }
}