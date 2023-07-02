import { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { getPageCount, getPagesArray } from "../utils/pages";
import PostService from "../API/PostService";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";

import MyModal from "../UI/modal/MyModal";
import MyButton from "../UI/button/MyButton";
import Loader from "../UI/loader/Loader";
import MySelect from "../UI/select/MySelect";

import "../styles/App.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  let pagesArray = getPagesArray(totalPages);

  let lastElement = useRef();

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts();
  };

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)} style={{ marginTop: "15px" }}>
        Create post
      </MyButton>
      <hr style={{ margin: "15px 0" }} />
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <div>
        <PostFilter filter={filter} setFilter={setFilter} />
        <MySelect
          value={limit}
          onChange={(value) => setLimit(value)}
          defaultValue="Number of elements"
          options={[
            { value: 5, name: "5" },
            { value: 10, name: "10" },
            { value: 25, name: "25" },
            { value: -1, name: "Show all" },
          ]}
        />
      </div>

      {postError && <h1>Error ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts about Javascript"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Loader />
        </div>
      )}
      <div className="page__wrapper">
        {pagesArray.map((p) => (
          <span
            key={p}
            className={page === p ? "page page__current" : "page"}
            onClick={() => changePage(p)}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Posts;
