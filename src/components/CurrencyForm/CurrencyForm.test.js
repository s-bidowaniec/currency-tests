import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import {cleanup} from "@testing-library/react";
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
    });
    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
    ];
    for(const testObj of testCases) {
    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();
        // render component
        render(<CurrencyForm action={action} />);
        // find fields elems
        const amountField = screen.getByTestId('amount');
        const fromField = screen.getByTestId('fromField');
        const toField = screen.getByTestId('toField');
        // find “convert” button
        const submitButton = screen.getByText('Convert');

        // set test values to fields
        userEvent.type(amountField, '100');
        userEvent.selectOptions(fromField, 'PLN');
        userEvent.selectOptions(toField, 'USD');

        // simulate user click on "convert" button
        userEvent.click(submitButton);

        // check if action callback was called once
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
        // unmount component
        cleanup()
    })};
});
