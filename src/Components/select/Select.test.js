import Select from "./Select";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Select', () => {
  it('deve verificar a alteração do valor quando selecionar uma nova mesa', () => {
    const props = {
      defaultValue: 'Cova',
      optionValues: ['001', '002', '003', '004']
    }
    render(<Select {...props}/>);
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(props.defaultValue);

    userEvent.selectOptions(select, props.optionValues[0]);
    expect(select).toHaveValue(props.optionValues[0]);
  })
})