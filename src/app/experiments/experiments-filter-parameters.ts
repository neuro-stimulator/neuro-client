export interface FilterParameters {
  groupBy: string;
  sortBy: string;
  orderBy: string;
}

export class GroupByPosibilities {
  static readonly KEY = 'groupBy';

  static readonly NONE = new GroupByPosibilities('Neseskupovat', 'none', '');
  static readonly TYPE = new GroupByPosibilities('Typ experimentu', 'type', '');

  static readonly VALUES: GroupByPosibilities[] = [
    GroupByPosibilities.NONE,
    GroupByPosibilities.TYPE,
  ];

  private constructor(private readonly _name: string, private readonly _value: string, private readonly _icon) {}

  get name(): string {
    return this._name;
  }

  get value(): string {
    return this._value;
  }

  get icon(): string {
    return this._icon;
  }
}

export class SortByPosibilities {
  static readonly KEY = 'sortBy';

  static readonly ALPHABET = new SortByPosibilities('Abecedně', 'alphabeticaly', {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'});
  static readonly CREATION_DATE = new SortByPosibilities('Datum vytvoření', 'date_of_creation', {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'});

  static readonly VALUES: SortByPosibilities[] = [
    SortByPosibilities.ALPHABET,
    SortByPosibilities.CREATION_DATE,
  ];

  private constructor(private readonly _name: string, private readonly _value: string, private readonly _icon: {ascending: string, descending: string}) {}

  get name(): string {
    return this._name;
  }

  get value(): string {
    return this._value;
  }

  get icon(): {ascending: string, descending: string} {
    return this._icon;
  }

  static byValue(value: string): SortByPosibilities {
    switch (value) {
      case 'alphabeticaly':
        return SortByPosibilities.ALPHABET;
      case 'date_of_creation':
        return SortByPosibilities.CREATION_DATE;
    }
  }
}

export class OrderByPosibilities {
  static readonly KEY = 'orderBy';

  static readonly ASCENDING = new OrderByPosibilities('Vzestupně', 'ascending', 'fa-sort-amount-up');
  static readonly DESCENDING = new OrderByPosibilities('Sestupně', 'descending', 'fa-sort-amount-down-alt');

  static readonly VALUES: OrderByPosibilities[] = [
    OrderByPosibilities.ASCENDING,
    OrderByPosibilities.DESCENDING
  ];

  private constructor(private readonly _name: string, private readonly _value: string, private readonly _icon) {}

  get name(): string {
    return this._name;
  }

  get value(): string {
    return this._value;
  }

  get icon(): string {
    return this._icon;
  }
}
