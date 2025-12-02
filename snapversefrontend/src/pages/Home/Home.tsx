import AvatarRow from "../../components/Post/AvtarRow";
import Post from "../../components/Post/Post";
const Home = () => {
  return <div>
    x<h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <AvatarRow />
          <div className="space-y-6 mt-4">
        {[1, 2, 3].map((item) => (
          <Post key={item} />
        ))}
      </div>
  </div>;
};

export default Home;