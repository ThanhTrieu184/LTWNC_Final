import React, { useEffect, useState } from "react";
import { Post } from ".";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/slices";
import { Loading } from ".";
import InfiniteScroll from "react-infinite-scroll-component";

const PostTimeline = () => {
  const dispatch = useDispatch();
  const { posts, count } = useSelector((state) => state.post);
  const [nextPage, setNextPage] = useState(2);

  useEffect(() => {
    if (posts.length === 0 && count === null) {
      dispatch(getPosts(1));
    }
  }, [count, dispatch, posts]);

  const handleLoadMore = () => {
    if (posts.length < count) {
      dispatch(getPosts(nextPage));
      setNextPage(nextPage + 1);
    }
  };

  return (
    <div
      id="scrollableDiv"
      className="w-2/3 hide-scroll-bar h-screen overflow-x-auto pl-8"
    >
      <InfiniteScroll
        dataLength={posts.length}
        next={() => handleLoadMore(nextPage)}
        hasMore={posts.length < count ? true : false}
        loader={<Loading height="150px" />}
        scrollableTarget="scrollableDiv"
      >
        {posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <Loading height="300px" />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default PostTimeline;
