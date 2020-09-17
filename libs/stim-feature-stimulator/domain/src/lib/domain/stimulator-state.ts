import { CommandToStimulator } from '@stechy1/diplomka-share';

export enum StimulatorStateType {
  UNKNOWN = -1,
  READY = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_READY,
  UPLOAD = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_UPLOAD,
  SETUP = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_SETUP,
  RUN = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_RUN,
  PAUSE = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_PAUSE,
  FINISH = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_FINISH,
  CLEAR = CommandToStimulator.COMMAND_MANAGE_EXPERIMENT_CLEAR,
}
