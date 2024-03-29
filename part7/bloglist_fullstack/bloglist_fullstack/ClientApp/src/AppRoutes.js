import BlogList from "./components/BlogList";
import { Counter } from "./components/Counter";
import CreateBlog from "./components/CreateBlog";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import Users from "./components/Users";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/blogs',
    element: <BlogList />
  },
  {
    path: '/create',
    element: <CreateBlog />
  },
  ,
  {
    path: '/users',
    element: <Users />
  }
];

export default AppRoutes;
