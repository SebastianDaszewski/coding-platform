import directus from "../../lib/directus";

interface IGlobal {
  title: string;
  description: string;
}

async function getGlobals(): Promise<IGlobal> {
  const { data } = await directus.items("global").readByQuery();
  console.log("data", data);

  // @ts-expect-error
  return data;
}

export default async function HomePage() {
  const global = await getGlobals();
  return (
    <div className="w-16 h-16 bg-slate-100">
      <h1>{global.title}</h1>
      <p>{global.description}</p>
    </div>
  );
}
