import React from "react";
import tracksData from "../../public/assets/data/tracks.json";
import Card from "./Card";
const Feed = () => {
  const { genres, trending } = tracksData.tracks;
  return (
    <div className="w-full flex justify-center">
      <div className="w-full justify-center">
        <h1 className="text-3xl font-bold text-white">Trending</h1>
        <div className="flex w-full justify-center">
          {trending.map((track) => (
            <Card key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
