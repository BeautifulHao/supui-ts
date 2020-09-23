import { FC } from 'react'
import Select,{SelectProps} from './Select';
import Option,{OptionProps} from './Option';

export type ISelectComponent = FC<SelectProps> & {
    Option: FC<OptionProps>,
}
const TransSelect = Select as ISelectComponent

TransSelect.Option = Option

export default TransSelect