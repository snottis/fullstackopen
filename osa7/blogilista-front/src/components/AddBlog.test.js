import AddBlog from './AddBlog';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';


test('Adding blog', () => {
    const mockF = jest.fn();
    const data = {
        author: 'testauthor',
        title: 'testtitle',
        url: 'testurl'
    };
    const component = render(
        <AddBlog createBlog={mockF}></AddBlog>
    );

    const author = component.container.querySelector('#author');
    fireEvent.change(author, {target: {value: data.author}});
    const title = component.container.querySelector('#title');
    fireEvent.change(title, {target: {value: data.title}});
    const url = component.container.querySelector('#url');
    fireEvent.change(url, {target: {value: data.url}});

    const button = component.getByText('create');
    fireEvent.click(button);

    expect(mockF.mock.calls[0][0]).toEqual(data);



});
