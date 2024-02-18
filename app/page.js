import Feed from "@/components/shared/Feed";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import { connectToDatabase } from "@/lib/database/dbUtils";
import { File } from "@/lib/database/models/File";

export default async function Home() {
  await connectToDatabase();
  const tracksData = await File.find().exec();
  // console.log(JSON.parse(JSON.stringify(tracksData[7])));
  const JsonParsedTrackData = tracksData.map((track) =>
    JSON.parse(JSON.stringify(track))
  );
  return (
    <div className="w-[100vw] min-h-screen ">
      <Navbar />
      <div className="w-full flex justify-center items-center flex-col">
        <Hero />
        <Feed tracksData={JsonParsedTrackData} />
      </div>
    </div>
  );
}
