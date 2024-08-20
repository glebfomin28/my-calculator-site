import { OperatorsEnum } from '../enums/operators.enum';
import { ActionsEnum } from '../enums/actions.enum';
import { NumbersEnum } from '../enums/numbers.enum';

export type TokenType = ActionsEnum | OperatorsEnum | NumbersEnum;
