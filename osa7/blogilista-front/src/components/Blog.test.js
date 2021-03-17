import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

let component;
const blog = {
    author: 'Serious Writer',
    title: 'My newest Blog',
    url:'still.localhost.it',
    likes: 9,
    user: {
        username: 'tester',
        name: 'Test User',
        id: '604947a59f2ec646fb2be622'
    },
    id: '604a9c815caf0b1648a08a5b'
};

beforeEach(() => {
    component = render(
        <Blog blog={blog} user={blog.user}/>
      );
});

test('Render author and title only', () => {

  expect(component.container.querySelector('.blogDefaults')).toBeDefined();
  expect(component.container.querySelector('.togglableContent')).toHaveStyle('display: none');
});

test('Render all info when view clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container.querySelector('.togglableContent')).not.toHaveStyle('display: none');
});

test('Like button calls eventhandler', () => {
    const mockHandler = jest.fn();
    component = render(<Blog blog={blog} user={blog.user} updateBlog={mockHandler}/>);
    const button = component.container.querySelector('.likeButton');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
});