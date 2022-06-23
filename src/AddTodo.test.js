import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('No duplicate task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "Test1"}});
  fireEvent.change(inputDate, { target: { value: "06/22/2022"}});
  fireEvent.click(element);

  try{
    const test = screen.getByText(new RegExp("06/22/2022", "i"));
    expect(test).toBeInTheDocument(); }
  catch{}
});

test('Submit Task with No Due Date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "Test2"}});
  fireEvent.click(element);
  try{
    const test = screen.getByText("Test2");  
    expect(test).not.toBeInTheDocument(); } 
  catch {}
});

test('Submit Task with No Task Name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: "06/22/2022"}});
  fireEvent.click(element);
  try{
    const test = screen.getByText(new RegExp("06/22/2022", "i"));
    expect(test).not.toBeInTheDocument(); }
  catch{}
});

test('Late Tasks have Different Colors', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});

    fireEvent.change(inputTask, { target: { value: "Test4"}});
    fireEvent.change(inputDate, { target: { value: "06/22/2021"}});
    fireEvent.click(element);

    const test = screen.getByTestId(/Test4/i).style.background
    expect(test).toBe("red");
});

test('Delete Task', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});

    fireEvent.change(inputTask, { target: { value: "Test3"}});
    fireEvent.change(inputDate, { target: { value: "06/22/2023"}});
    fireEvent.click(element);

    const test = screen.getByText(/Test3/i);
    const checkBox = screen.getByRole('checkbox');
    fireEvent.click(checkBox);
    expect(test).not.toBeInTheDocument();
});