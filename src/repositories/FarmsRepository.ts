import Farm from '../models/Farm';

interface CreateFarmDTO {
  name: string;
  city: string;
  state: string;
  owner: string;
}

class FarmsRepository {
  private farms: Farm[];

  constructor() {
    this.farms = [];
  }

  public all(): Farm[] {
    return this.farms;
  }

  public create({ name, city, state, owner }: CreateFarmDTO): Farm {
    const farm = new Farm({
      name,
      city,
      state,
      owner,
    });

    this.farms.push(farm);

    return farm;
  }
}

export default FarmsRepository;
