import getDate from 'date-fns/getDate';

class Sort {
  ASC<Ta = Date, Tb = Date>(a: Ta, b: Tb) {
    if (getDate((a as unknown) as Date) > getDate((b as unknown) as Date)) {
      return -1;
    } else if (
      getDate((a as unknown) as Date) < getDate((b as unknown) as Date)
    ) {
      return 1;
    } else {
      return 0;
    }
  }

  DES<Ta = Date, Tb = Date>(a: Ta, b: Tb) {
    if (getDate((a as unknown) as Date) > getDate((b as unknown) as Date)) {
      return 1;
    } else if (
      getDate((a as unknown) as Date) < getDate((b as unknown) as Date)
    ) {
      return 1;
    } else {
      return 0;
    }
  }
}

export default new Sort();
