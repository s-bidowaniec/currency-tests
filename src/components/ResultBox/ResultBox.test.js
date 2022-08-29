import '@testing-library/jest-dom/extend-expect';
import {cleanup} from "@testing-library/react";
import ResultBox from './ResultBox';
import {render, screen} from "@testing-library/react";
describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from={'PLN'} to={'USD'} amount={100} />);
    });
    const PLNtoUSDtestCases = [
        {amount: 100, result: 'PLN 100.00 = $28.57'},
        {amount: 50.671, result: 'PLN 50.67 = $14.48'},
        {amount: 50.676, result: 'PLN 50.68 = $14.48'},
        {amount: 0.0, result: 'PLN 0.00 = $0.00'}
    ]
    for (const testObj of PLNtoUSDtestCases){
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from={'PLN'} to={'USD'} amount={testObj.amount} />);
        const output = screen.getByTestId('resultBox');
        expect(output).toHaveTextContent(testObj.result);
        cleanup()
    });}
    const USDtoPLNtestCases = [
        {amount: 100, result: '$100.00 = PLN 350.00'},
        {amount: 1.0001, result: '$1.00 = PLN 3.50'},
        {amount: 37.86451, result: '$37.86 = PLN 132.53'},
    ]
    for (const testObj of USDtoPLNtestCases){
        it('should render proper info about conversion when USD -> PLN', () => {
            render(<ResultBox from={'USD'} to={'PLN'} amount={testObj.amount} />);
            const output = screen.getByTestId('resultBox');
            expect(output).toHaveTextContent(testObj.result);
            cleanup()
        });}
    it('should render proper info about conversion when PLN -> PLN', () => {
        render(<ResultBox from={'PLN'} to={'PLN'} amount={123.00} />);
        const output = screen.getByTestId('resultBox');
        expect(output).toHaveTextContent("PLN 123.00 = PLN 123.00");
    });
    it('should render proper info about conversion when USD -> USD', () => {
        render(<ResultBox from={'USD'} to={'USD'} amount={123.00} />);
        const output = screen.getByTestId('resultBox');
        expect(output).toHaveTextContent("$123.00 = $123.00");
    });
    const errorCases = [
        {amount: -3.00, from: 'PLN', to: 'USD'},
        {amount: -3.00, from: 'USD', to: 'PLN'},
        {amount: -3.00, from: 'PLN', to: 'PLN'}
    ]
    for (const testObj of errorCases){
    it('should render error info with negative values', () => {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
        const output = screen.getByTestId('resultBox');
        expect(output).toHaveTextContent("Wrong value…");
        cleanup()
    });}
});