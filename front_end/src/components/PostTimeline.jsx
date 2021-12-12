import React, { useEffect, useState } from "react";
import { Post } from ".";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getProfilePosts } from "../redux/slices";
import { Loading } from ".";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";

const PostTimeline = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    posts,
    count,
    profilePosts,
    profileCount,
    profileId,
    isPostFetching,
  } = useSelector((state) => state.post);
  const [nextPage, setNextPage] = useState(2);

  useEffect(() => {
    if (userId) {
      if (
        (profilePosts.length === 0 && profileCount === null) ||
        profileId !== userId
      ) {
        dispatch(getProfilePosts({ userId, page: 1 }));
      }
    } else {
      if (posts.length === 0 && count === null) {
        dispatch(getPosts(1));
      }
    }
  }, [count, dispatch, posts, profileCount, profileId, profilePosts, userId]);

  const handleLoadMore = () => {
    if (userId) {
      if (profilePosts.length < profileCount) {
        dispatch(getProfilePosts({ userId, page: nextPage }));
        setNextPage(nextPage + 1);
      }
    } else {
      if (posts.length < count) {
        dispatch(getPosts(nextPage));
        setNextPage(nextPage + 1);
      }
    }
  };

  return (
    <div
      id="scrollableDiv"
      className="w-full lg:w-2/3 hide-scroll-bar h-screen overflow-x-auto pl-8"
    >
      <InfiniteScroll
        dataLength={userId ? profilePosts.length : posts.length}
        next={() => handleLoadMore(nextPage)}
        hasMore={
          userId
            ? profilePosts.length < profileCount
              ? true
              : false
            : posts.length < count
            ? true
            : false
        }
        scrollableTarget="scrollableDiv"
      >
        {userId
          ? profilePosts.length > 0 &&
            profilePosts.map(
              (p) =>
                p.posted_by._id === userId && (
                  <Post key={`profile${p._id}`} post={p} />
                )
            )
          : posts.length > 0 && posts.map((p) => <Post key={p._id} post={p} />)}
        {isPostFetching && <Loading height="300px" />}
      </InfiniteScroll>
    </div>
  );
};

export default PostTimeline;
