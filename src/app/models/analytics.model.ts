export interface Analytics {
  headers?: any;
  rows?: any;
  data?: any;
}

export interface FilterSelection {
  dx: DX[];
  pe: PE[];
  ou: OU[];
}

export interface DX {
  id: string;
  name: string;
  programid?: string;
  programStageid?: string;
}

export interface PE {
  id: string;
  name: string;
  type: string;
}

export interface OU {
  id: string;
  name: string;
  level?: string;
}
