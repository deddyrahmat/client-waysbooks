import '@testing-library/jest-dom';
import Buttons from './index';
import {render} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";

test('should text loading', () => { 
    const {container, getByText} = render(<Buttons isLoading></Buttons>)

    expect(getByText(/loading/i));
    expect(container.querySelector("span")).toBeInTheDocument();
 })


 test('should redirect to external page', () => { 
    const {container} = render(<Buttons type='link' isExternal href=''></Buttons>)

    expect(container.querySelector("a")).toBeInTheDocument();
  })

 test('should redirect to internal page', () => { 
    const {container} = render(<Router> <Buttons type='link' href=''></Buttons></Router>)

    expect(container.querySelector("a")).toBeInTheDocument();
  })