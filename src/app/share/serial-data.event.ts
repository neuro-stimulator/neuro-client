export interface SerialDataEvent {
  name: string;
}

export interface StimulatorStateEvent extends SerialDataEvent {
  state: number;
  timestamp: number;
}

export interface IOEvent extends SerialDataEvent {
  ioType: 'input' | 'output';
  state: 'on' | 'off';
  index: number;
  timestamp: number;
}

export interface StimulatorMemoryEvent extends SerialDataEvent {
  data: string[];
}

export interface StimulatorSequencePartRequestEvent extends SerialDataEvent   {
  name: string;
  offset: number;
  index: number;
  timestamp: number;
}
