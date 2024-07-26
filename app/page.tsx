import { Haedline } from "@/components/Headline";
import { Links } from "@/components/Links";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Haedline title="index Page" />
      <Links />
    </main>
  );
}
