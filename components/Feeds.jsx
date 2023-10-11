"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feeds = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPost()

  }, []);

  return (
    <section>
      <form className="relative w-full flex-center" action="">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          requiredc
          className="search_input peer my-7"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feeds;
